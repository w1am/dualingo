import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    checkDir(
      storeName: String
      isLogo: Boolean
      isCover: Boolean
      session: String
    ): Boolean
    uploadFile(
      file: Upload
      storeName: String
      isLogo: Boolean
      isCover: Boolean
      session: String
      type: String
    ): String
  }
`
