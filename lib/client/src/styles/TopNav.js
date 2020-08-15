import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Responsives } from './Responsives';

export const TopNav = {
  Logo: Assets.TOP_NAV_LOGO,
  Container: Containers.TOP_NAV_CONTAINER,
  Icon: Icons.TOP_NAV_ICON,
  Menu: {
    Responsive: {
      Layout: Responsives.TOP_NAV_RES_MENU_LAYOUT,
    },
    Layout: Layouts.TOP_NAV_MENU_LAYOUT,
    Item: {
      Wrapper: Wrappers.TOP_NAV_MENU_ITEM_WRAPPER,
      Name: Menus.TOP_NAV_MENU
    },
    Wrapper: Wrappers.TOP_NAV_MENU_WRAPPER,
    Dropdown: {
      Wrapper: Dropdowns.TOP_NAV_DROPDOWN_WRAPPER,
      Menu: {
        Layout: Dropdowns.TOP_NAV_DROPDOWN_MENU_LAYOUT,
      },
      Layout: Dropdowns.TOP_NAV_DROPDOWN_LAYOUT,
      Item: Dropdowns.TOP_NAV_DROPDOWN_ITEM
    }
  }
}
