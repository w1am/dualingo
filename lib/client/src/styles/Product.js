import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Headers } from './Headers';
import { Responsives } from './Responsives';
import { Links } from './Links';
import { Inputs } from './Inputs';
import { Buttons } from './Buttons';

export const Product = {
  Wrapper: Wrappers.PRODUCT_WRAPPER,
  Container: Containers.PRODUCT_ITEM_CONTAINER,
  SmContainer: Containers.PRODUCT_SMALL_ITEM_CONTAINER,
  Title: Links.PRODUCT_ITEM_TITLE,
  Price: Headers.PRODUCT_ITEM_PRICE,
  StoreName: Links.PRODUCT_ITEM_STORENAME,
  Cart: Inputs.PRODUCT_ITEM_CART_INPUT,
  Buttons: {
    Purchase: Buttons.PRODUCT_ITEM_PURCHASE_BUTTON,
  },
  Wrappers: {
    Info: Wrappers.PRODUCT_INFO_WRAPPER,
    Button: Wrappers.PRODUCT_CART_WRAPPER,
    View: Wrappers.PRODUCT_VIEW_WRAPPER
  },
  Assets: {
    Product: Assets.PRODUCT_ITEM_IMAGE,
    Option: Assets.PRODUCT_OPTION_IMAGE,
    CurrentProduct: Assets.CURR_PRODUCT_IMAGE,
    Display: Assets.PRODUCT_DISPLAY_IMAGE,
    Order: Assets.PRODUCT_ORDER_IMAGE,
    OrderRound: Assets.PRODUCT_ORDER_ROUND_IMAGE
  },
  CurrProduct: {
    Price: Headers.CURRENT_PRODUCT_PRICE,
    PreviousPrice: Headers.CURRENT_PRODUCT_PREVIOUS_PRICE,
    Container: Containers.CURRENT_PRODUCT_CONTAINER,
    Headers: {
      Label: Headers.CURRENT_PRODUCT_LABEL,
      Info: Headers.CURRENT_PRODUCT_INFO
    },
    Display: {
      Wrapper: Wrappers.CURRENT_PRODUCT_DISPLAY_WRAPPER
    },
    Information: {
      Container: Containers.CURRENT_PRODUCT_INFORMATION_CONTAINER,
      Title: Headers.CURRENT_PRODUCT_TITLE
    },
    Option: {
      Layout: Layouts.CURRENT_PRODUCT_OPTION_LAYOUT,
      Wrapper: Wrappers.CURRENT_PRODUCT_OPTION_WRAPPER,
      Image: Assets.CURRENT_PRODUCT_OPTION_IMAGE,
      Title: Headers.CURRENT_PRODUCT_OPTION_TITLE,
      Price: Headers.CURRENT_PRODUCT_OPTION_PRICE,
    },
    ImgController: {
      Image: Assets.IMAGE_CONTROLLER_IMAGE,
      Layout: Layouts.IMAGE_CONTROLLER_LAYOUT
    },
    Purchase: {
      Cart: Buttons.ADD_TO_CART_BUTTON,
      Buy: Buttons.BUY_BUTTON
    }
  }
}
