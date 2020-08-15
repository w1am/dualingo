import gql from 'graphql-tag';

export const GET_SHIP = gql`
  query($id: String) {
    getShip(id: $id) {
      id
      address
      phone
      building
      instructions
      orderId
      email
      customer
      timeStamp
      paid
      grandTotal
      grandDelivery
      paymentMethod
      purchases {
        storeName
        name
        delivery
        deliveryFee
        items {
          itemId
          title
          option
          addOption
          count
          price
          deleted
          subTotal
          session
          fileUrl
          quantity
        }
      }
    }
  }
`

export const DELETE_SHIP = gql`
  mutation($id: String) {
    deleteShip(id: $id)
  }
`

export const SET_SHIP_PAID = gql`
  mutation($id: String, $paid: Boolean, $merchant: String, $total: Float) {
    setShipPaid(id: $id, paid: $paid, merchant: $merchant, total: $total)
  }
`

export const GET_SHIPS = gql`
  query(
    $paid: Boolean
    $format: String
  ) {
    getShips(
      paid: $paid
      format: $format
    ) {
      id
      address
      phone
      building
      instructions
      orderId
      email
      customer
      timeStamp
      paid
      grandTotal
      grandDelivery
      paymentMethod
      purchases {
        storeName
      }
    }
  }
`

export const GET_STORE_SHIPS = gql`
  query(
    $storeName: String
    $shipId: String
    $received: Boolean
    $format: String
    $limit: Int
    $page: Int
  ) {
    getStoreShips(
      storeName: $storeName
      shipId: $shipId
      received: $received
      format: $format
      limit: $limit
      page: $page
    ) {
      len
      purchases {
        storeName
        name
        delivery
        deliveryFee
        cancelled
        ship {
          id
          orderId
          grandTotal
          grandDelivery
          paid
          paymentMethod
          address
          cancelled
          customer
          phone
          instructions
          building
          timeStamp
        }
        items {
          itemId
          title
          option
          addOption
          count
          price
          deleted
          subTotal
          session
          fileUrl
          quantity
        }
      }
    }
  }
`

export const GET_USER_SHIPS = gql`
  query(
    $email: String
    $paid: Boolean
    $format: String
    $limit: Int
    $page: Int
    $valid: Boolean
  ) {
    getUserShips(
      email: $email
      paid: $paid
      format: $format
      limit: $limit
      page: $page
      valid: $valid
    ) {
      ships {
        id
        address
        phone
        building
        instructions
        orderId
        email
        customer
        timeStamp
        paid
        cancelled
        grandTotal
        grandDelivery
        paymentMethod
        purchases {
          storeName
          name
          delivery
          deliveryFee
          items {
            itemId
            title
            option
            addOption
            count
            deleted
            price
            subTotal
            session
            fileUrl
            quantity
          }
        }
      }
      len
    }
  }
`

export const GET_CURRENT_SHIP = gql`
  query($id: String) {
    getCurrentShip(id: $id) {
      id
      address
      phone
      building
      instructions
      timeStamp
      grandTotal
      grandDelivery
      orderId
      paid
      paymentMethod
      purchases {
        id
        storeName
        name
        delivery
        deliveryFee
        items {
          itemId
          title
          option
          addOption
          count
          price
          subTotal
          deleted
          session
          fileUrl
          quantity
          rating
        }
      }
    }
  }
`

export const SET_SHIP_INFO = gql`
  mutation(
    $id: String
    $customer: String
    $email: String
    $address: String
    $number: String
    $building: String
    $instructions: String
    $paymentMethod: String
  ) {
    setShipInfo(
      id: $id
      customer: $customer
      email: $email
      address: $address
      number: $number
      building: $building
      instructions: $instructions
      paymentMethod: $paymentMethod
    )
  }
`

export const SHIP_MUTATION = gql`
  mutation(
    $customer: String
    $purchases: String
    $grandTotal: Float
    $grandDelivery: Float
  ) {
    ship(
      customer: $customer
      purchases: $purchases
      grandTotal: $grandTotal
      grandDelivery: $grandDelivery
    ) {
      ship
      ok
    }
  }
`

export const UPDATE_RATING = gql`
  mutation($purchaseId: String, $itemId: String, $rating: Float, $user: String) {
    updateRating(purchaseId: $purchaseId, itemId: $itemId, rating: $rating, user: $user)
  }
`

export const CANCEL_ORDER = gql`
  mutation($id: String) {
    cancelOrder(id: $id)
  }
`

export const Ship = {
  SHIP_MUTATION,
  SET_SHIP_INFO,
  GET_CURRENT_SHIP,
  GET_USER_SHIPS,
  GET_STORE_SHIPS,
  GET_SHIPS,
  SET_SHIP_PAID,
  DELETE_SHIP,
  GET_SHIP,
  UPDATE_RATING,
  CANCEL_ORDER
}
