import { Assets } from './Assets'
import { Containers } from './Containers';
import { Dropdowns } from './Dropdowns';
import { Wrappers } from './Wrappers';
import { Menus } from './Menus';
import { Icons } from './Icons';
import { Layouts } from './Layouts';
import { Responsives } from './Responsives';
import { Headers } from './Headers';

export const Modal = {
  ClickWrapper: Wrappers.CLICK_WRAPPER,
  ModalContent: Layouts.MODAL_CONTENT_LAYOUT,
  Toolbar: {
    Layout: Layouts.MODAL_TOOLBAR_LAYOUT,
    Header: Headers.MODAL_TOOLBAR_HEADER
  },
  Icons: {
    Close: Assets.MODAL_CLOSE_BUTTON
  }
}
