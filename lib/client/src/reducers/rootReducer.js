const initState = {
  items: [],
  count: 0,
  subTotal: 0,
}

const rootReducer = (state = initState, action) => {
  const { type } = action;
  if (type == 'ADD_ITEM') {
    let items = state.items;
    const { storeName, name, product } = action;

    const position = items.map(item => item.storeName).indexOf(storeName);
    const format = `${product.id}-${product.option}-${product.addOption}`;

    const detail = {
      identifier: format,
      itemId: product.id,
      title: product.title,
      option: product.option,
      addOption: product.addOption,
      count: parseInt(product.count),
      price: product.price,
      subTotal: product.subTotal,
      session: product.session,
      fileUrl: product.fileUrl,
      quantity: product.quantity
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

      return {
        ...state,
        items
      }
    } else {
      return {
        ...state,
        items: [...items, {
          storeName,
          name,
          delivery: product.delivery,
          deliveryFee: product.deliveryFee,
          purchases: [{ ...detail }]
        }]
      }
    }
  } else if (type == 'RESET_COUNT') {
    let count = 0;
    let items = state.items;

    if (items && items.length >= 1) {
      items.map(item => {
        item.purchases.map(purchase => {
          count += parseInt(purchase.count);
        })
      });

      return { ...state, count: parseInt(count) }
    } else {
      return { ...state, count: 0 }
    }
  } else if (type == 'DELETE_ITEM') {
    let items = state.items;
    let { storeName, name, identifier } = action;
    const storePos = items.map(item => item.storeName).indexOf(storeName);
    const purchases = items[storePos].purchases;
    const newList = purchases.filter((purchase) => purchase.identifier !== identifier);
    items.splice(storePos, 1);
    if (newList.length <= 0) {
      return { ...state, items: [ ...items ] };
    } else {
      return { ...state, items: [ ...items, { storeName, name, purchases: newList } ] };
    }

  } else if (type == 'INC_COUNT') {
    let items = state.items;
    const {
      storeName,
      name,
      identifier,
      delivery,
      deliveryFee
    } = action;

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
        newArr.push({
          storeName,
          name,
          delivery,
          deliveryFee,
          purchases: [...newPurchases]
        })
      }
    });
    return { ...state, items: [...newArr] }
  } else if (type == 'DEC_COUNT') {
    let items = state.items;
    const {
      storeName,
      name,
      identifier,
      delivery,
      deliveryFee
    } = action;

    let newArr = []
    items.map((item, index) => {
      if (item.storeName !== storeName) {
        newArr.push(item);
      } else {
        let purchaseToEdit = {};
        let newPurchases = [];
        item.purchases.map(purchase => {
          if (purchase.identifier == identifier && purchase.count > 1) {
            purchaseToEdit = Object.assign({}, purchase);
            purchaseToEdit.count = purchaseToEdit.count - 1
            newPurchases.push(purchaseToEdit);
          } else {
            newPurchases.push(purchase)
          }
        });
        newArr.push({
          storeName,
          name,
          delivery,
          deliveryFee,
          purchases: [...newPurchases]
        })
      }
    });
    return { ...state, items: [...newArr] }
  } else if (type == 'GET_SUBTOTAL') {
    let subTotal = 0;
    let items = state.items;

    if (items && items.length >= 1) {
      items.map(item => {
        item.purchases.map(purchase => {
          subTotal += parseFloat(parseFloat(purchase.price) * parseInt(purchase.count));
        })
      });
      return { ...state, subTotal: parseFloat(subTotal) }
    } else {
      return { ...state, subTotal: 0 }
    }
  } else if (type == 'LOAD_ITEM') {
    return { ...state, items: action.items }
  } else if (type == 'LOAD_COUNT') {
    return { ...state, count: action.count }
  } else if (type == 'LOAD_SUBTOTAL') {
    return { ...state, subTotal: action.subTotal }
  } else if (type == 'CLEAR_ITEMS') {
    return { ...state, count: 0, items: [], subTotal: 0 }
  } else {
    return state;
  }
}

export default rootReducer;
