import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Responsives } from './Responsives';

export const Forms = {
  Container: Containers.FORM_CONTAINER,
  Merchant: {
    Register: {
      Layout: Layouts.MERCHANT_REGISTER_LAYOUT,
      Container: Containers.MERCHANT_REGISTER_CONTAINER,
    }
  },
  User: {
    Register: {
      Layout: Layouts.USER_REGISTER_LAYOUT,
      Container: Containers.USER_REGISTER_CONTAINER,
    }
  }
}
