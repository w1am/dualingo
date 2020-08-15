import Merchant from '../models/Merchant';
import Purchase from '../models/Purchase';
import Ship from '../models/Ship';
import Order from '../models/Order';
import Product from '../models/Product';
import Rating from '../models/Rating';
import moment from 'moment';

export default {
  Query: {
    hello: () => "hello world",
    getShip: async (_, { id }) => {
      try {
        let ship = await Ship
          .findOne({ _id: id })
          .populate({ path: 'purchases', model: 'Purchase' });
        return ship;
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    },
    getShips: async (_, { paid, format }) => {
      try {
        let query = {};

        if (format) {
          if (paid) {
            query = { valid: true, paid, timeStamp: format }
          } else {
            query = { valid: true, timeStamp: format }
          }
        } else {
          if (paid !== null) {
            query = { valid: true, paid }
          } else {
            query = { valid: true }
          }
        }

        let ships = await Ship.find({ ...query }).populate({ path: 'purchases', model: 'Purchase' })
        return ships;
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    },
    getStoreShips: async (_, {
      storeName,
      shipId,
      received,
      format,
      limit,
      page
    }) => {
      try {
        let query = {};

        if (format) {
          query = {
            storeName,
            valid: true,
            received,
            timeStamp: format
          }
        } else {
          if (received) {
            query = { storeName, valid: true, received }
          } else {
            query = { storeName, valid: true }
          }
        }


        if (shipId) {
          let purchases = await Purchase
            .find({ ship: shipId, ...query })
            .populate({ path: 'ship', model: 'Ship' })

          return {
            purchases,
            len: 0
          };
        } else {
          let purchases = await Purchase
            .find({ ...query })
            .populate({ path: 'ship', model: 'Ship' })
            .limit(limit)
            .skip(parseInt(page - 1) * limit)

          let purs = await Purchase.find({ ...query });

          return {
            purchases,
            len: purs.length
          };
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return null;
        }
      }
    },
    getUserShips: async (_, { email, format, paid, limit, page, valid })  => {
      try {
        let query = {};
        if (format) {
          if (paid) {
            query = { email, timeStamp: format, paid, valid }
          } else {
            query = { email, timeStamp: format, valid }
          }
        } else {
          if (paid !== null) {
            query = { email, paid, valid }
          } else {
            query = { email, valid }
          }
        }

        const ships = await Ship
          .find(query)
          .populate({ path: 'purchases', model: 'Purchase' })
          .limit(limit)
          .skip(parseInt(page - 1) * limit)

        let userShips = await Ship
          .find(query)
          .populate({ path: 'purchases', model: 'Purchase' })

        return {
          ships,
          len: userShips.length
        };
      } catch(e) {
        if (e) {
          console.log(e);
          return null;
        }
      }
    },
    getCurrentShip: async (_, { id }) => {
      try {
        let ship = await Ship
          .findOne({ _id: id })
          .populate({ path: 'purchases', model: 'Purchase' });
        return ship;
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    }
  },
  Mutation: {
    updateRating: async (_, { purchaseId, itemId, rating, user }) => {
      try {
        const setProductRating = async () => {
          const products = await Rating.find({ product: itemId });
          if (products.length >= 1) {
            let total = 0;
            products.map(p => total += p.rating);
            const avg = total / products.length;
            await Product.findOneAndUpdate({ _id: itemId }, { rating: avg, ratingCount: products.length }, { new: true });
          }
        }

        let purchase = await Purchase.findOne({ _id: purchaseId });
        let items = purchase.items;
        for (let i=0; i<=items.length-1; i++) {
          if (items[i].itemId == itemId) {
            await Purchase.updateOne({ 'items.itemId': itemId }, { '$set': {
              'items.$.rating': rating
            }})
          }
        }

        const currentRating = await Rating.findOne({ product: itemId, user });
        if (currentRating) {
          await Rating.findOneAndUpdate({ product: itemId }, { rating }, { new: true });
          setProductRating();
          return true;
        } else {
          const newRating = await Rating.create({ product: itemId, rating, user });
          await newRating.save();
          setProductRating();
          return true
        };
        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    cancelOrder: async (_, { id }) => {
      try {
        const ship = await Ship.findOne({ _id: id });

        if (ship.paid) {
          return false;
        } else {
          await Ship.findOneAndUpdate({ _id: id }, { cancelled: true }, { new: true });

          const purchases = ship.purchases;
          purchases.map(async purchase => {
            await Purchase.findOneAndUpdate({ _id: purchase }, { cancelled: true }, { new: true });
          })

          return true;
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    deleteShip: async (_, { id }) => {
      try {
        let ship = await Ship.findOne({ _id: id });
        let purchases = ship.purchases;
        for (let i=0; i<=purchases.length - 1; i++) {
          await Purchase.findOneAndRemove({ _id: purchases[i] });
        };
        await Ship.findOneAndRemove({ _id: ship.id });
        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    setShipPaid: async (_, { id, paid, merchant, total }) => {
      try {
        let merchants = JSON.parse(merchant);
        await Ship.findOneAndUpdate({ _id: id }, { paid }, { new: true });

        const day = moment().format('D');
        const year = moment().format('YYYY');
        const month = moment().format('MMMM');

        if (paid) {
          for (let i=0; i<=merchants.length-1; i++) {
            await Merchant.findOneAndUpdate({ username: merchants[i].storeName }, { $inc: { sales: 1 } }, { new: true });

            let order = await Order.findOne({ store: merchants[i].storeName, day, year, month });
            if (order) {
              await Order.findOneAndUpdate(
                { store: merchants[i].storeName, day, year, month },
                { $inc: { orders: 1, sales: parseFloat(total) } },
                { new: true }
              );
            } else {
              const newOrder = await Order.create({ store: merchants[i].storeName, sales: parseFloat(total) });
              await newOrder.save()
            }
          }
        }

        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    updateStock: async (_, { id, count, option }) => {
      try {
        if (option) {
          let res = await Product.updateOne({ _id: id, 'options.name': option }, {
            $dec: { 'options.$.quantity': count }
          });
          if (res) {
            return true
          } else {
            return false
          }
        } else {
          let res = await Product.findOneAndUpdate({ _id: id }, { $dec: { quantity: count } }, { new: true });
          if (res) {
            return true
          } else {
            return false
          }
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    setShipInfo: async (_, { id, customer, email, address, number, building, instructions, paymentMethod }) => {
      try {
        const ship = await Ship.findOneAndUpdate({ _id: id }, {
          address,
          customer,
          email,
          phone: number,
          building,
          instructions,
          valid: true,
          paymentMethod
        }, { new: true });
        const purchase = await Purchase.findOneAndUpdate({ ship: id }, { valid: true }, { new: true });
        if (ship && purchase) {
          return true
        } else {
          return false
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    ship: async (_, { customer, purchases, grandTotal, grandDelivery }, context, info) => {
      try {
        let pur = JSON.parse(purchases);

        const newShip = await new Ship({
          email: customer,
          purchases: [],
          grandTotal,
          grandDelivery
        });
        await newShip.save();

        const findTotal = (pur) => {
          let total = 0;
          pur.map(p => {
            total += parseFloat(p.subTotal);
          })
          return total;
        }

        for (let i=0; i<=pur.length-1; i++) {
          const newPurchase = await Purchase.create({
            storeName: pur[i].storeName,
            name: pur[i].name,
            delivery: pur[i].delivery,
            deliveryFee: pur[i].deliveryFee,
            items: pur[i].purchases,
            ship: newShip._id
          });

          await newPurchase.save();
          newShip.purchases.push(newPurchase._id);
          await newShip.save();
        };

        return {
          ship: newShip._id,
          ok: true
        }

      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false
          };
        }
      }
    }
  }
}
