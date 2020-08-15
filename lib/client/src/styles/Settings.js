import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Toggle } from './Toggle';
import { Headers } from './Headers';

export const Settings = {
  Item: {
    Layout: Layouts.SETTINGS_PAGE_ITEM_LAYOUT,
    Header: Headers.SETTINGS_PAGE_ITEM_HEADER
  },
  Toggle: {
    Switch: Toggle.TOGGLE_SWITCH,
    Check: Toggle.TOGGLE_CHECKBOX,
    Slider: Toggle.TOGGLE_SLIDER
  },
  Pays: {
    Container: Containers.SETTINGS_PAYMENT_CONTAINER,
    Layout: Layouts.SETTINGS_PAYMENT_LAYOUT,
    Icon: Assets.SETTINGS_PAYMENT_ICON
  }
}
