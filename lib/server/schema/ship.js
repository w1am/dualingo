import { gql } from 'apollo-server-express';

export default gql`
  type Ship {
    id: String
    grandTotal: Float
    grandDelivery: Float
    paymentMethod: String
    address: String
    customer: String
    email: String
    orderId: String
    phone: String
    building: String
    instructions: String
    purchases: [Purchase]
    paid: Boolean
    cancelled: Boolean
    timeStamp: String
  }

  type Purchase {
    id: String
    storeName: String
    name: String
    delivery: Boolean
    deleted: Boolean
    cancelled: Boolean
    deliveryFee: Float
    items: [Item]
    ship: Ship
  }

  type Item {
    itemId: String
    title: String
    option: String
    addOption: String
    count: Int
    price: Float
    subTotal: Float
    session: String
    fileUrl: String
    rating: Float
    quantity: Int
    deleted: Boolean
  }

  type ShipResponse {
    ship: String
    ok: Boolean
    type: String
  }

  type PurchasesResponse {
    purchases: [Purchase]
    len: Int
  }

  type UserShipsResponse {
    ships: [Ship]
    len: Int
  }

  type Query {
    getCurrentShip(id: String): Ship
    getUserShips(
      email: String
      paid: Boolean
      format: String
      limit: Int
      page: Int
      valid: Boolean
    ): UserShipsResponse
    getStoreShips(
      storeName: String
      shipId: String
      received: Boolean
      format: String
      limit: Int
      page: Int
    ): PurchasesResponse
    getShips(paid: Boolean, format: String): [Ship]
    getShip(id: String): Ship
  }
  
  type Mutation {
    setShipPaid(
      id: String
      paid: Boolean
      merchant: String
      total: Float
    ): Boolean
    deleteShip(id: String): Boolean
    cancelOrder(id: String): Boolean
    updateRating(purchaseId: String, itemId: String, rating: Float, user: String): Boolean
    setShipInfo(
      id: String
      customer: String
      email: String,
      address: String
      number: String
      building: String
      instructions: String
      paymentMethod: String
    ): Boolean
    ship(
      customer: String
      purchases: String
      grandTotal: Float
      grandDelivery: Float
    ): ShipResponse
  }
`
