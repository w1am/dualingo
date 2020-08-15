import gql from 'graphql-tag';

export const CHECK_DIR = gql`
  mutation(
    $storeName: String
    $isLogo: Boolean
    $isCover: Boolean
    $session: String
  ) {
    checkDir(
      storeName: $storeName
      isLogo: $isLogo
      isCover: $isCover
      session: $session
    )
  }
`

export const UPLOAD_FILE_MUTATION = gql`
  mutation(
    $file: Upload
    $storeName: String
    $isLogo: Boolean
    $isCover: Boolean
    $session: String
    $type: String
  ) {
    uploadFile(
      file: $file
      storeName: $storeName
      isLogo: $isLogo
      isCover: $isCover
      session: $session
      type: $type
    )
  }
`;

export const Media = {
  CHECK_DIR,
  UPLOAD_FILE_MUTATION
}

