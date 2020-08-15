import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Responsives } from './Responsives';
import { Buttons } from './Buttons';

export const Order = {
  Layouts: {
    Order: Layouts.USER_ORDER_LAYOUT,
    Header: Layouts.USER_ORDER_HEADER_LAYOUT,
    Content: Layouts.USER_CONTENT_LAYOUT,
  },
  Buttons: {
    Delete: Buttons.USER_ORDER_DELETE_BUTTON,
    Continue: Buttons.USER_ORDER_CONTINUE_BUTTON
  },
  Responsives: {
    Containers: {
      Order: Containers.USER_RESPONSIVE_ORDER_CONTAINER
    }
  }
}
