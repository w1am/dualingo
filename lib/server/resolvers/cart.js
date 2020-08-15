import User from '../models/User';
import Merchant from '../models/Merchant';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export default {
  Query: {
    hello: () => "hello world",
    flush: async (parent, args, { client }) => {
      await client.flushall();
      return true
    },
    getCount: async (parent, args, { client }) => {
      const redisCount = await client.getAsync('count');
      const count = JSON.parse(redisCount);
      if (count == null || count == 'null') {
        return 0
      } else {
        return count
      }
    },
    loadSubTotal: async (parent, args, { client }) => {
      const redisSubTotal = await client.getAsync('subTotal');
      const subTotal = JSON.parse(redisSubTotal);
      if (subTotal == null || subTotal == 'null') {
        return 0;
      } else {
        return redisSubTotal;
      }
    },
    getItems: async (parent, args, { client }) => {
      const redisItems = await client.getAsync('items');
      return JSON.parse(redisItems);
    }
  },
  Mutation: {
    clearRedisItems:  async (parent, args, { client }) => {
      try {
        await client.set('items', JSON.stringify([]));
        await client.set('count', JSON.stringify(0));
        await client.set('subTotal', JSON.stringify(0));
        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    delItem: async (parent, { storeName, name, identifier }, { client }) => {
      try {
        const redisItems = await client.getAsync('items');

        let items = JSON.parse(redisItems);
        const storePos = items.map(item => item.storeName).indexOf(storeName);
        const purchases = items[storePos].purchases;
        const newList = purchases.filter((purchase) => purchase.identifier !== identifier);
        items.splice(storePos, 1);
        if (newList.length <= 0) {
          await client.set('items', JSON.stringify([ ...items ]));
        } else {
          await client.set('items', JSON.stringify([ ...items, { storeName, name, purchases: newList }  ]));
        }

        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    setSubTotal: async (parent, args, { client }) => {
      try {
        let subTotal = 0;
        const redisItems = await client.getAsync('items');
        let items = JSON.parse(redisItems) || [];

        if (items !== null && items.length >= 1) {
          items.map(item => {
            item.purchases.map(purchase => {
              subTotal += parseFloat(parseFloat(purchase.price) * parseInt(purchase.count));
            })
          });
          await client.set('subTotal', JSON.stringify(subTotal));
        } else {
          await client.set('subTotal', JSON.stringify(0));
        }
        return true
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    reset: async (parent, args, { client }) => {
      try {
        let count = 0;
        const redisItems = await client.getAsync('items');
        let items = JSON.parse(redisItems) || [];

        if (items !== null && items.length >= 1) {
          items.map(item => {
            item.purchases.map(purchase => {
              count += purchase.count;
            })
          });
          await client.set('count', JSON.stringify(count));
        } else {
          await client.set('count', JSON.stringify(0));
        }
        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    decrement: async (parent, { storeName, name, identifier, delivery, deliveryFee }, { client }) => {
      try {
        const redisItems = await client.getAsync('items');
        let items = JSON.parse(redisItems);

        let newArr = []
        items.map((item, index) => {
          if (item.storeName !== storeName) {
            newArr.push(item);
          } else {
            let purchaseToEdit = {};
            let newPurchases = [];
            item.purchases.map(purchase => {
              if (purchase.identifier == identifier && (purchase.count > 1)) {
                purchaseToEdit = Object.assign({}, purchase);
                purchaseToEdit.count = purchaseToEdit.count - 1
                newPurchases.push(purchaseToEdit);
              } else {
                newPurchases.push(purchase)
              }
            });
            newArr.push({ storeName, name, delivery, deliveryFee, purchases: [...newPurchases] })
          }
        });

        const res = await client.set('items', JSON.stringify([ ...newArr ]));

        if (res) {
          return true;
        } else {
          return false
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    increment: async (parent, { storeName, name, identifier, delivery, deliveryFee }, { client }) => {
      try {
        const redisItems = await client.getAsync('items');
        let items = JSON.parse(redisItems);

        let newArr = []
        items.map((item, index) => {
          if (item.storeName !== storeName) {
            newArr.push(item);
          } else {
            let purchaseToEdit = {};
            let newPurchases = [];
            item.purchases.map(purchase => {
              if (purchase.identifier == identifier && (purchase.count < purchase.quantity)) {
                purchaseToEdit = Object.assign({}, purchase);
                purchaseToEdit.count = purchaseToEdit.count + 1
                newPurchases.push(purchaseToEdit);
              } else {
                newPurchases.push(purchase)
              }
            });
            newArr.push({ storeName, name, delivery, deliveryFee, purchases: [...newPurchases] })
          }
        });

        const res = await client.set('items', JSON.stringify([ ...newArr ]));
        if (res) {
          return true;
        } else {
          return false
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    set: async (parent, { storeName, name, product }, { client }) => {
      try {
        const redisItems = await client.getAsync('items');
        const p = JSON.parse(product);
        let items = JSON.parse(redisItems) || [];

        const position = items.map(item => item.storeName).indexOf(storeName);
        const format = `${p.id}-${p.option}-${p.addOption}`;

        const detail = {
          identifier: format,
          itemId: p.id,
          title: p.title,
          option: p.option,
          addOption: p.addOption,
          count: p.count,
          price: p.price,
          subTotal: p.subTotal,
          session: p.session,
          fileUrl: p.fileUrl,
          quantity: p.quantity
        }

        if (position > -1) {
          const prev = items[position];
          const pos = prev.purchases.map(p => p.identifier).indexOf(format);

          if (pos > -1) {
            prev.purchases[format] = { ...detail};
            prev.purchases.splice(pos, 0, prev.purchases[format]);
            prev.purchases.splice(pos + 1, 1);
          } else {
            prev.purchases.push({ ...detail })
          }

          await client.set('items', JSON.stringify([...items]));

          return true;
        } else {
          await client.set('items', JSON.stringify(
            [ ...items, { storeName, name, delivery: p.delivery, deliveryFee: p.deliveryFee, purchases: [{ ...detail }] } ]
          ));
          return true
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
  }
}
