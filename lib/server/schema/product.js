import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    id: String
    title: String
    price: Float
    views: Int
    previousPrice: Float
    discount: Float
    quantity: Int,
    addedVAT: Float
    description: String
    styling: String
    fileUrl: [String]
    options: [Option]
    addOptionTitle: String
    addOptions: [AddOption]
    store: Store
    purchaseLimit: Int
    categories: [String]
    timeStamp: String
    page: String
    sales: Int
    session: String
    storeName: String
    name: String
    rating: Float
    ratingCount: Int
    published: Boolean
    deleted: Boolean
  }

  type Store {
    id: String
    username: String
    companyName: String
    logo: String
    cover: String
    description: String
    website: String
    category: String
    storeName: String
    products: [String]
    vatRegistered: Boolean
    sales: Int
    district: String
    latitude: String
    longitude: String
    verified: Boolean
    delivery: Boolean
    deliveryFee: Float
    outOfStockLimit: Int
    deliveryHours: String
    orderNotification: Boolean
    stockNotification: Boolean
    paymentMethods: String
  }

  type AddOption {
    name: String
    price: Float
  }

  type Option {
    name: String
    price: Float
    previousPrice: Float
    discount: Float
    addedVAT: Float
    quantity: Int
    fileUrl: String
  }

  type createProductResponse {
    ok: Boolean
    id: String
  }

  type StoreProductsResponse {
    products: [Product]
    len: Int
  }

  type Query {
    storeProducts(
      storeName: String
      page: String
      filter: String
      tab: Int
      limit: Int
    ): StoreProductsResponse
    getProduct(id: String): Product
    filterProduct(search: String, page: Int, limit: Int, option: Int, rating: Int): [Product]
    getProductByCategory(category: String, limit: Int, page: Int): StoreProductsResponse
  }

  type TrendsResponse {
    products: [ Product ]
  }

  type Mutation {
    generateTrends(keywords: String): TrendsResponse
    updateStock(id: String, count: Int, option: String): Boolean
    incViews(id: String): Boolean
    updateDescription(id: String, description: String): Boolean
    deleteProduct(id: String): Boolean
    checkStock(
      productId: String
      selectedOption: String
      selectedCount: Int
    ): Boolean
    createProduct(
      title: String
      price: Float
      previousPrice: Float
      discount: Float
      quantity: Int
      addedVAT: Float
      styling: String
      fileUrl: [String]
      options: String
      addOptionTitle: String
      addOptions: String
      storeName: String
      purchaseLimit: Int
      category: String
      hasEdit: Boolean
      productId: String
      page: String
      session: String
    ): createProductResponse
  }
`
