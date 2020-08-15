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
import { Paragraphs } from './Paragraphs';

export const Cart = {
  Assets: {
    Product: Assets.CART_PRODUCT_IMAGE
  },
  Headers: {
    Title: Headers.CART_PRODUCT_TITLE,
    Price: Headers.CART_PRODUCT_PRICE
  },
  Paragraphs: {
    Count: Paragraphs.CART_PRODUCT_COUNT,
    Option: Paragraphs.CART_PRODUCT_OPTION,
    Control: Paragraphs.CART_PRODUCT_CONTROL
  },
  Wrappers: {
    Item: Wrappers.CART_ITEM_WRAPPER
  },
  Layouts: {
    Item: Layouts.CART_ITEM_LAYOUT
  },
  Buttons: {
    Control: Buttons.CART_CONTROL_BUTTON
  }
}
