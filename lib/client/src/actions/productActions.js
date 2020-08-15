export const loadItems = (items)  => {
  return { type: 'LOAD_ITEM', items }
}

export const loadCount = (count)  => {
  return { type: 'LOAD_COUNT', count }
}

export const loadSubTotal = (subTotal)  => {
  return { type: 'LOAD_SUBTOTAL', subTotal }
}

export const addItem = (storeName, name, product)  => {
  return {
    type: 'ADD_ITEM',
    storeName,
    name,
    product
  }
}

export const deleteItem = (storeName, name, identifier) => {
  return { type: 'DELETE_ITEM', storeName, name, identifier }
}

export const resetCount = () => {
  return { type: 'RESET_COUNT' }
}

export const getSubTotal = () => {
  return { type: 'GET_SUBTOTAL' }
}

export const inc = (storeName, name, identifier, delivery, deliveryFee) => {
  return { type: 'INC_COUNT', storeName, name, identifier, delivery, deliveryFee }
}

export const dec = (storeName, name, identifier, delivery, deliveryFee) => {
  return { type: 'DEC_COUNT', storeName, name, identifier, delivery, deliveryFee }
}

export const clearItems = () => {
  return {
    type: 'CLEAR_ITEMS'
  }
}
