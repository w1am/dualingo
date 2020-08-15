import { gql } from 'apollo-server-express';

export default gql`
  type Pin {
    id: String
    email: String
    password: String
  }

  type Query {
    getPin(email: String, password: String): Boolean
    getForgot(email: String, password: String): Boolean
  }
  
  type Mutation {
    sendEmail(email: String, password: String): Boolean
    createPin(email: String, password: String): Boolean
  }
`
