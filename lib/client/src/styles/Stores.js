import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Responsives } from './Responsives';
import { Links } from './Links';
import { Labels } from './Labels';

export const Stores = {
  Content: {
    Wrappers: {
      Content: Wrappers.STORE_CONTENT_WRAPPER,
      Page: Wrappers.STORE_PAGE_WRAPPER,
    },
    Containers: {
      Content: Containers.STORE_CONTENT_CONTAINER,
    },
    Info: {
      Layout: Layouts.STORE_PAGE_INFO_TOOLBAR_LAYOUT
    }
  },
  Selector: {
    Container: Containers.STORE_SELECTOR_CONTAINER,
    Layout: Layouts.STORE_SELECTOR_LAYOUT,
    Logo: Assets.STORE_SELECTOR_LOGO,
    Label: Labels.STORE_SELECTOR_LABEL
  },
  Links: {
    New: Links.NEW_STORE_LINK
  }
}
