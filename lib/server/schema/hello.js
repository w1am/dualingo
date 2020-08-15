import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    test: Boolean
  }

  type Query {
    hello: String
  }
`
