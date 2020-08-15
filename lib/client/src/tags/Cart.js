import gql from 'graphql-tag';

const GET_SUBTOTAL = gql`
  query {
    loadSubTotal
  }
`
const GET_COUNT = gql`
  query {
    getCount
  }
`
const GET_ITEMS = gql`
  query {
    getItems {
      storeName
      name
      delivery
      deliveryFee
      purchases {
        identifier
        itemId
        title
        option
        addOption
        count
        price
        subTotal
        session
        fileUrl
        quantity
      }
    }
  }
`
const SET_ITEMS = gql`
  mutation($storeName: String, $name: String, $product: String) {
    set(storeName: $storeName, name: $name, product: $product)
  }
`
const INC_ITEM = gql`
  mutation($storeName: String, $name: String, $identifier: String, $delivery: Boolean, $deliveryFee: Float) {
    increment(storeName: $storeName, name: $name, identifier: $identifier, delivery: $delivery, deliveryFee: $deliveryFee)
  }
`
const DEL_ITEM = gql`
  mutation($storeName: String, $name: String, $identifier: String) {
    delItem(storeName: $storeName, name: $name, identifier: $identifier)
  }
`
const DEC_ITEM = gql`
  mutation($storeName: String, $name: String, $identifier: String, $delivery: Boolean, $deliveryFee: Float) {
    decrement(storeName: $storeName, name: $name, identifier: $identifier, delivery: $delivery, deliveryFee: $deliveryFee)
  }
`
const SET_SUBTOTAL = gql`
  mutation {
    setSubTotal
  }
`
const RESET = gql`
  mutation {
    reset
  }
`
const REDIS_CLEAR_ITEM = gql`
  mutation {
    clearRedisItems
  }
`

const REDIS_FLUSH = gql`
  query {
    flush
  }
`

export const Cart = {
  SET_ITEMS,
  INC_ITEM,
  DEC_ITEM,
  RESET,
  GET_COUNT,
  GET_ITEMS,
  SET_SUBTOTAL,
  GET_SUBTOTAL,
  DEL_ITEM,
  REDIS_CLEAR_ITEM,
  REDIS_FLUSH
}
