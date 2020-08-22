import { gql } from 'apollo-server-express';

export default gql`
  type S3Payload {
    signedRequest: String!
    url: String!
  }

  type Mutation {
    checkDir(
      storeName: String
      isLogo: Boolean
      isCover: Boolean
      session: String
    ): Boolean
    getSignature(filename: String, filetype: String): S3Payload!
    upload(
      file: Upload
      storeName: String
      isLogo: Boolean
      isCover: Boolean
      session: String
      type: String
    ): String
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
