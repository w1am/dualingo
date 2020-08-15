import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Responsives } from './Responsives';
import { Inputs } from './Inputs';

export const Search = {
  Containers: {
    Search: Containers.SEARCH_CONTAINER,
    Responsive: Containers.RES_SEARCH_CONTAINER
  },
  Assets: {
    Product: Assets.SEARCH_LOGO
  },
  Wrappers: {
    Product: Wrappers.SEARCH_ITEM_WRAPPER
  },
  Inputs: {
    Res: Inputs.RES_SEARCH_INPUT
  }
}
