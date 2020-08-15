import gql from 'graphql-tag';

export const GET_MERCHANTS = gql`
  query($limit: Int) {
    getMerchants(limit: $limit) {
      id
      companyName
      username
      address
      maintainer
      vatRegistered
      sales
    }
  }
`

export const GET_STORE_SETTINGS = gql`
  query($storeName: String) {
    getSettings(storeName: $storeName) {
      delivery
      deliveryFee
      methods {
        type
        status
        account
      }
    }
  }
`

export const SAVE_SETTINGS_MUTATION = gql`
  mutation($storeName: String, $delivery: Boolean, $deliveryFee: Float, $methods: String) {
    saveSettings(storeName: $storeName, delivery: $delivery, deliveryFee: $deliveryFee, methods: $methods)
  }
`

export const FIND_CURRENT_MERCHANT_QUERY = gql`
  query($username: String) {
    findCurrentMerchant(username: $username) {
      id
      companyName
      username
      address
      maintainer
      vatRegistered
    }
  }
`

export const REGISTER_MERCHANT_MUTATION = gql`
  mutation(
    $companyName: String
    $username: String
    $address: String
    $logo: Upload
    $maintainer: String
    $vatRegistered: Boolean
    $category: String 
  ) {
    registerMerchant(
      companyName: $companyName
      username: $username
      address: $address
      logo: $logo
      maintainer: $maintainer
      vatRegistered: $vatRegistered
      category: $category
    ) {
      ok
      error {
        message
      }
    }
  }
`

export const SAVE_LOCATIONS = gql`
  mutation($storeName: String, $locations: String) {
    saveLocations(storeName: $storeName, locations: $locations)
  }
`

export const GET_LOCATIONS = gql`
  query($storeName: String) {
    getLocations(storeName: $storeName) {
      lat
      lng
    }
  }
`

export const GET_ACCOUNTS = gql`
  query($orderId: String) {
    getAccounts(orderId: $orderId) {
      storeName
      subTotal
      account {
        type
        status
        account
      }
    }
  }
`

export const Merchant = {
  REGISTER_MERCHANT_MUTATION,
  FIND_CURRENT_MERCHANT_QUERY,
  SAVE_SETTINGS_MUTATION,
  GET_STORE_SETTINGS,
  GET_MERCHANTS,
  SAVE_LOCATIONS,
  GET_LOCATIONS,
  GET_ACCOUNTS
}

