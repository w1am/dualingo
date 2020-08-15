import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Headers } from './Headers';
import { Responsives } from './Responsives';

export const DatePick = {
  Container: Containers.DATE_CONTAINER,
  Month: {
    Layout: Layouts.MONTH_LAYOUT
  },
  Day: {
    Layout: Layouts.DATE_LAYOUT,
    Header: Headers.DATE_HEADER
  }
}
