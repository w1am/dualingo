import gql from 'graphql-tag';

export const GENERATE_TRENDS = gql`
  mutation($keywords: String) {
    generateTrends(keywords: $keywords) {
      products {
        id
        title
        price
        views
        page
        previousPrice
        discount
        quantity
        addedVAT
        description
        fileUrl
        session
        rating
        published
        options {
          name
          price
          previousPrice
          discount
          addedVAT
          quantity
          fileUrl
        }
        addOptions  {
          name
          price
        }
        addOptionTitle
        store {
          id
          username
          companyName
          vatRegistered
          verified
          delivery
          deliveryFee
        }
        purchaseLimit
        categories
        timeStamp
      }
    }
  }
`

export const GET_PRODUCT_BY_CATEGORY = gql`
  query($category: String, $limit: Int, $page: Int) {
    getProductByCategory(category: $category, limit: $limit, page: $page) {
      products {
        id
        title
        price
        views
        page
        previousPrice
        discount
        quantity
        addedVAT
        description
        fileUrl
        session
        rating
        published
        options {
          name
          price
          previousPrice
          discount
          addedVAT
          quantity
          fileUrl
        }
        addOptions  {
          name
          price
        }
        addOptionTitle
        store {
          id
          username
          companyName
          vatRegistered
          verified
          delivery
          deliveryFee
        }
        purchaseLimit
        categories
        timeStamp
      }
      len
    }
  }
`

export const CHECK_STOCK = gql`
  mutation(
    $productId: String
    $selectedOption: String
    $selectedCount: Int
  ) {
    checkStock(
      productId: $productId
      selectedOption: $selectedOption
      selectedCount: $selectedCount
    )
  }
`

export const FILTER_PRODUCT = gql`
  query($search: String, $page: Int, $limit: Int, $option: Int, $rating: Int) {
    filterProduct(search: $search, page: $page, limit: $limit, option: $option, rating: $rating) {
      id
      title
      price
      views
      page
      previousPrice
      discount
      quantity
      addedVAT
      description
      fileUrl
      session
      rating
      published
      description
      storeName
      store {
        id
        username
        companyName
        vatRegistered
        verified
        delivery
        deliveryFee
      }
      options {
        name
        price
        previousPrice
        discount
        addedVAT
        quantity
        fileUrl
      }
      addOptions  {
        name
        price
      }
      addOptionTitle
      purchaseLimit
      categories
      timeStamp
    }
  }
`

export const CURRENT_PRODUCT = gql`
  query($id: String) {
    getProduct(id: $id) {
      id
      title
      price
      views
      page
      previousPrice
      discount
      quantity
      addedVAT
      description
      fileUrl
      session
      rating
      ratingCount
      published
      description
      storeName
      options {
        name
        price
        previousPrice
        discount
        addedVAT
        quantity
        fileUrl
      }
      addOptions  {
        name
        price
      }
      addOptionTitle
      store {
        id
        username
        companyName
        vatRegistered
        verified
        delivery
        deliveryFee
      }
      purchaseLimit
      categories
      timeStamp
    }
  }
`

export const STORE_PRODUCTS = gql`
  query(
    $storeName: String
    $page: String
    $filter: String
    $tab: Int
    $limit: Int
  ) {
    storeProducts(
      storeName: $storeName
      page: $page
      filter: $filter
      tab: $tab
      limit: $limit
    ) {
      products {
        id
        title
        price
        views
        page
        previousPrice
        discount
        quantity
        addedVAT
        description
        fileUrl
        session
        rating
        published
        options {
          name
          price
          previousPrice
          discount
          addedVAT
          quantity
          fileUrl
        }
        addOptions  {
          name
          price
        }
        addOptionTitle
        store {
          id
          username
          companyName
          vatRegistered
          verified
          delivery
          deliveryFee
        }
        purchaseLimit
        categories
        timeStamp
      }
      len
    }
  }
`

export const CREATE_PRODUCT_MUTATION = gql`
  mutation(
    $title: String,
    $price: Float,
    $previousPrice: Float,
    $discount: Float,
    $quantity: Int,
    $addedVAT: Float,
    $fileUrl: [String],
    $options: String,
    $addOptionTitle: String,
    $addOptions: String,
    $storeName: String,
    $purchaseLimit: Int,
    $category: String,
    $hasEdit: Boolean
    $productId: String,
    $page: String,
    $session: String
  ) {
    createProduct(
      title: $title,
      price: $price,
      previousPrice: $previousPrice,
      discount: $discount,
      quantity: $quantity,
      addedVAT: $addedVAT,
      fileUrl: $fileUrl,
      options: $options,
      addOptionTitle: $addOptionTitle
      addOptions: $addOptions,
      storeName: $storeName,
      purchaseLimit: $purchaseLimit,
      category: $category,
      hasEdit: $hasEdit,
      productId: $productId,
      page: $page,
      session: $session
    ) {
      ok
      id
    }
  }
`;

export const UPDATE_DESCRIPTION_MUTATION = gql`
  mutation($id: String, $description: String) {
    updateDescription(id: $id, description: $description)
  }
`

export const INC_VIEWS = gql`
  mutation($id: String) {
    incViews(id: $id)
  }
`

export const DELETE_PRODUCT_MUTATION = gql`
  mutation($id: String) {
    deleteProduct(id: $id)
  }
`

export const UPDATE_STOCK_MUTATION = gql`
  mutation($id: String, $count: Int, $option: String) {
    updateStock(id: $id, count: $count, option: $option)
  }
`

export const GENERATE_KEYWORD = gql`
  mutation($keyword: String) {
    generateKeyword(keyword: $keyword)
  }
`

export const GET_KEYWORDS = gql`
  query {
    getKeywords
  }
`

export const Product = {
  CREATE_PRODUCT_MUTATION,
  STORE_PRODUCTS,
  CURRENT_PRODUCT,
  CHECK_STOCK,
  GET_PRODUCT_BY_CATEGORY,
  GENERATE_TRENDS,
  UPDATE_DESCRIPTION_MUTATION,
  FILTER_PRODUCT,
  INC_VIEWS,
  DELETE_PRODUCT_MUTATION,
  UPDATE_STOCK_MUTATION,
  GENERATE_KEYWORD,
  GET_KEYWORDS
}
