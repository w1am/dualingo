import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Paragraphs } from './Paragraphs';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Headers } from './Headers';
import { Responsives } from './Responsives';
import { Links } from './Links';

export const Sidebars = {
  Store: {
    Logo: Assets.STORE_PAGE_SIDEBAR_LOGO,
    Container: Containers.STORE_PAGE_SIDEBAR_CONTAINER,
    Info: {
      Header: Headers.STORE_PAGE_INFO_HEADER,
      Desc: Paragraphs.STORE_PAGE_INFO_DESC
    },
    Links: {
      Sidebar: Links.SIDEBAR_LINK
    }
  },
  Responsives: {
    Store: {
      Container: Responsives.STORE_PAGE_SIDEBAR_CONTAINER,
    }
  },
  Search: {
    Container: Containers.SEARCH_BAR_CONTAINER,
    Link: Links.SEARCH_BAR_LINK
  },
  Category: {
    Container: Containers.CATEGORY_SIDE_BAR_CONTAINER,
    Links: {
      Sidebar: Links.SIDEBAR_CATEGORY_LINK
    }
  },
  App: {
    Links: {
      App: Links.APP_LINK,
      Sub: Links.APP_SUB_LINK
    },
    Containers: {
      App: Containers.APP_SIDEBAR,
      Link: Containers.APP_LINK_CONTAINER
    },
    Wrappers: {
      Link: Wrappers.APP_LINK_WRAPPER
    }
  },
  User: {
    Container: Containers.USER_SIDE_BAR_CONTAINER,
    Links: {
      Sidebar: Links.SIDEBAR_LINK
    }
  }
}
