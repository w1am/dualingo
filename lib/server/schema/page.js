import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getPages(storeId: String): [String]
  }

  type Mutation {
    updatePage(productId: String, page: String): Boolean
    createPage(page: String, storeName: String): Boolean
  }
`
