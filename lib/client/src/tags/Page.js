import gql from 'graphql-tag';

export const GET_PAGES = gql`
  query($storeId: String) {
    getPages(storeId: $storeId)
  }
`

export const UPDATE_PAGE = gql`
  mutation($productId: String, $page: String) {
    updatePage(productId: $productId, page: $page)
  }
`
export const CREATE_PAGE = gql`
  mutation($page: String, $storeName: String) {
    createPage(page: $page, storeName: $storeName)
  }
`

export const Page = {
  GET_PAGES,
  UPDATE_PAGE,
  CREATE_PAGE
}
