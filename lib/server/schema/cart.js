import { gql } from 'apollo-server-express';

export default gql`
  type Item {
    name: String
    storeName: String
    delivery: Boolean
    deliveryFee: Float
    purchases: [RedisPurchase]
  }

  type RedisPurchase {
    identifier: String
    itemId: String
    title: String
    option: String
    addOption: String
    count: Int
    price: Float
    subTotal: Float
    session: String
    fileUrl: String
    quantity: Int
  }

  type Query {
    getItems: [Item]
    getCount: Int 
    loadSubTotal: Float 
    flush: String
  }

  type Mutation {
    clearRedisItems: Boolean
    set(storeName: String, name: String, product: String): Boolean
    increment(storeName: String, name: String, identifier: String, delivery: Boolean, deliveryFee: Float): Boolean
    decrement(storeName: String, name: String, identifier: String, delivery: Boolean, deliveryFee: Float): Boolean
    delItem(storeName: String, name: String, identifier: String): Boolean
    reset: Boolean
    setSubTotal: Boolean
  }
`
