import { gql } from 'apollo-server-express';

export default gql`
  type Merchant {
    id: String
    companyName: String
    username: String
    address: String
    maintainer: String
    vatRegistered: Boolean
    sales: Int
    verified: Boolean
    methods: [Methods]
  }

  type Settings {
    delivery: Boolean
    deliveryFee: Float
    methods: [Methods]
  }

  type Methods {
    type: String
    status: Boolean
    account: String
  }

  type Locations {
    lat: String
    lng: String
  }

  type Account {
    storeName: String
    account: [Methods]
    subTotal: Float
  }

  type Query {
    hello: String
    findCurrentMerchant(username: String): Merchant
    getSettings(storeName: String): Settings
    getMerchants(limit: Int): [Merchant]
    getLocations(storeName: String): [Locations]
    getAccounts(orderId: String): [Account]
  }

  type registerMerchantResponse {
    ok: Boolean
    error: Error
  }

  type Mutation {
    saveSettings(
      storeName: String
      delivery: Boolean
      deliveryFee: Float
      methods: String
      logo: Upload
    ): Boolean
    saveLocations(storeName: String, locations: String): Boolean
    registerMerchant(
      companyName: String
      username: String
      address: String
      logo: Upload
      maintainer: String
      vatRegistered: Boolean
      category: String
    ) : registerMerchantResponse!
  }
`
