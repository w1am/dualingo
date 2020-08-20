import { User } from './User';
import { Merchant } from './Merchant';
import { Page } from './Page';
import { Media } from './Media';
import { Product } from './Product';
import { Cart } from './Cart';
import { Ship } from './Ship';
import { Order } from './Order';
import { Pin } from './Pin';

export const Tags = {
  User: {
    Mutations: {
      register: User.REGISTER_USER_MUTATION,
      login: User.LOGIN_USER_MUTATION,
      findUser: User.FIND_USER_MUTATION,
      refreshToken: User.REFRESH_USER_TOKEN_MUTATION,
      resetPassword: User.RESET_PASSWORD_MUTATION,
      updateName: User.UPDATE_NAME_MUTATION
    }
  },
  Pin: {
    Mutations: {
      createPin: Pin.CREATE_PIN,
      sendEmail: Pin.SEND_EMAIL
    },
    Queries: {
      getForgot: Pin.GET_FORGOT,
      getPin: Pin.GET_PIN
    }
  },
  Order: {
    Mutations: {
      setOrder: Order.SET_ORDER
    },
    Queries: {
      getOrders: Order.GET_ORDERS
    }
  },
  Ship: {
    Mutations: {
      ship: Ship.SHIP_MUTATION,
      setShipInfo: Ship.SET_SHIP_INFO,
      setShipPaid: Ship.SET_SHIP_PAID,
      deleteShip: Ship.DELETE_SHIP,
      updateRating: Ship.UPDATE_RATING,
      cancelOrder: Ship.CANCEL_ORDER,
    },
    Queries: {
      getCurrentShip: Ship.GET_CURRENT_SHIP,
      getUserShips: Ship.GET_USER_SHIPS,
      getStoreShips: Ship.GET_STORE_SHIPS,
      getShips: Ship.GET_SHIPS,
      getShip: Ship.GET_SHIP
    }
  },
  Merchant: {
    Mutations: {
      register: Merchant.REGISTER_MERCHANT_MUTATION,
      saveSettings: Merchant.SAVE_SETTINGS_MUTATION,
      saveLocations: Merchant.SAVE_LOCATIONS
    },
    Queries: {
      findCurrentMerchant: Merchant.FIND_CURRENT_MERCHANT_QUERY,
      getSettings: Merchant.GET_STORE_SETTINGS,
      getMerchants: Merchant.GET_MERCHANTS,
      getLocations: Merchant.GET_LOCATIONS,
      getAccounts: Merchant.GET_ACCOUNTS
    }
  },
  Page: {
    Queries: {
      getPages: Page.GET_PAGES
    },
    Mutations: {
      updatePage: Page.UPDATE_PAGE,
      createPage: Page.CREATE_PAGE
    }
  },
  Product: {
    Mutations: {
      createProduct: Product.CREATE_PRODUCT_MUTATION,
      checkStock: Product.CHECK_STOCK,
      generateTrends: Product.GENERATE_TRENDS,
      updateDescription: Product.UPDATE_DESCRIPTION_MUTATION,
      incViews: Product.INC_VIEWS,
      deleteProduct: Product.DELETE_PRODUCT_MUTATION,
      updateStock: Product.UPDATE_STOCK_MUTATION
    },
    Queries: {
      storeProducts: Product.STORE_PRODUCTS,
      getProduct: Product.CURRENT_PRODUCT,
      getProductByCategory: Product.GET_PRODUCT_BY_CATEGORY,
      filterProduct: Product.FILTER_PRODUCT
    }
  },
  Media: {
    Mutations: {
      checkDir: Media.CHECK_DIR,
      uploadFile: Media.UPLOAD_FILE_MUTATION,
      upload: Media.UPLOAD
    }
  },
  Cart: {
    Mutations: {
      set: Cart.SET_ITEMS,
      increment: Cart.INC_ITEM,
      decrement: Cart.DEC_ITEM,
      reset: Cart.RESET,
      setSubTotal: Cart.SET_SUBTOTAL,
      delItem: Cart.DEL_ITEM,
      clearRedisItems: Cart.REDIS_CLEAR_ITEM,
    },
    Queries: {
      getItems: Cart.GET_ITEMS,
      getCount: Cart.GET_COUNT,
      getSubTotal: Cart.GET_SUBTOTAL,
      flush: Cart.REDIS_FLUSH,
    }
  }
}
