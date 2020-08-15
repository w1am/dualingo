import { Common } from './Common';
import { TopNav } from './TopNav';
import { TopNavSearch } from './TopNavSearch';
import { Tabs } from './Tabs';
import { Forms } from './Forms';
import { Modal } from './Modal';
import { Animations } from './Animations';
import { Labels } from './Labels';
import { DropImage } from './DropImage';
import { Sidebars } from './Sidebars';
import { Stores } from './Stores';
import { Identifier } from './Identifier';
import { Table } from './Table';
import { Inputs } from './Inputs';
import { Icons } from './Icons';
import { Assets } from './Assets';
import { Wrappers } from './Wrappers';
import { Product } from './Product';
import { Badges } from './Badges';
import { Cart } from './Cart';
import { Messages } from './Messages';
import { Settings } from './Settings';
import { ButtonSelector } from './ButtonSelector';
import { Ship } from './Ship';
import { DatePick } from './DatePick';
import { Order } from './Order';
import { Layouts } from './Layouts';
import { Headers } from './Headers';
import { Filter } from './Filter';
import { Numbers } from './Numbers';
import { StoreNav } from './StoreNav';
import { Footer } from './Footer';
import { Search } from './Search';
import { User } from './User';
import { Features } from './Features';
import { Coupon } from './Coupon';

export const Styles = {
  Common,
  Tabs,
  Features,
  Forms,
  Modal,
  DropImage,
  ButtonSelector,
  Coupon,
  Sidebars,
  Identifier,
  User,
  Filter,
  Cart,
  Messages,
  Settings,
  Numbers,
  Order,
  StoreNav,
  DatePick,
  Ship,
  Banners: {
    Home: {
      Layout: Layouts.HOME_BANNER_LAYOUT,
      Headers: {
        Main: Headers.HOME_BANNER_MAIN_HEADER
      }
    }
  },
  Table: {
    Layout: Table.TABLE_LAYOUT,
    Wrapper: Table.TABLE_WRAPPER,
    Item: Table.TABLE_ITEM,
    Header: Table.TABLE_HEADER,
    Browser: Table.TABLE_BROWSER_TAG,
    Order: {
      Wrapper: Table.TABLE_ORDER_WRAPPER
    },
    Input: Inputs.NEW_ITEM_TABLE_INPUT,
    Image: {
      Icon: Icons.PRODUCT_OPTION_PREVIEW_ICON,
      Preview: Assets.PRODUCT_OPTION_PREVIEW_IMAGE,
      Wrapper: Wrappers.PRODUCT_OPTION_IMAGE_WRAPPER
    }
  },
  Product,
  Stores,
  Badges,
  Footer,
  Search,
  Animations: {
    FadeIn: Animations.FADE_IN,
    Fade: Animations.FADE
  },
  Navigation: {
    TopNav,
    Search: TopNavSearch
  },
}
