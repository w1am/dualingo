import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query($store: String, $year: String, $month: String) {
    getOrders(store: $store, year: $year, month: $month) {
      id
      store
      month
      day
      year
      orders
      sales
    }
  }
`
export const SET_ORDER = gql`
  mutation($store: String) {
    setOrder(store: $store)
  }
`

export const Order = {
  SET_ORDER,
  GET_ORDERS
}


