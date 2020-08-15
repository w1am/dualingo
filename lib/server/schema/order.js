import { gql } from 'apollo-server-express';

export default gql`
  type Order {
    id: String
    store: String
    month: String
    day: String
    year: String
    orders: Int
    sales: Float
  }

  type Query {
    getOrders(store: String, year: String, month: String): [Order]
  }
  
  type Mutation {
    setOrder: Boolean
  }
`
