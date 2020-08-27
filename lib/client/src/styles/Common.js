import { Headers } from './Headers'
import { Wrappers } from './Wrappers'
import { Icons } from './Icons';
import { Inputs } from './Inputs';
import { Paragraphs } from './Paragraphs';
import { Buttons } from './Buttons';
import { Links } from './Links';
import { Elements } from './Elements';
import { Messages } from './Messages';
import { Labels } from './Labels';
import { Containers } from './Containers';
import { Responsives } from './Responsives';
import { Assets } from './Assets';
import { Dropdowns } from './Dropdowns';

export const Common = {
  Headers: {
    Page: Headers.COMMON_PAGE_HEADER,
    Identifier: Headers.COMMON_PAGE_IDENTIFIER,
    Sub: Headers.COMMON_PAGE_SUB_HEADER
  },
  Containers: {
    Image: Containers.IMAGE_CONTAINER,
    Page: Containers.PAGE_CONTAINER,
    Dropdown: Dropdowns.DROPDOWN
  },
  Icons: {
    Default: Icons.COMMON_ICON,
    Trash: Icons.COMMON_TRASH_ICON
  },
  Paragraphs: {
    Switch: Paragraphs.COMMON_SWITCH
  },
  Assets: {
    LogoSM: Assets.COMMON_LOGO_SMALL,
    More: Assets.MORE_ORDER_ITEM,
    Order: Assets.COMMON_ORDER_LOGO,
    Store: Assets.COMMON_STORE_LOGO
  },
  Categories: {
    Item: Paragraphs.COMMON_CATEGORY_ITEM
  },
  Presentation: Containers.COMMON_PRESENTATION_CONTAINER,
  Wrappers: {
    Page: Wrappers.PAGE_WRAPPER,
    Loader: Wrappers.BUTTON_LOADER,
    Content: Wrappers.COMMON_PAGE_CONTENT_WRAPPER
  },
  Elements: {
    Divider: Elements.COMMON_DIVIDER
  },
  Description: Paragraphs.COMMON_DESC,
  Links: {
    Normal: Links.COMMON_LINK,
    Small: Links.COMMON_LINK_SMALL,
    Back: Links.COMMON_BACK_LINK
  },
  Messages: {
    Error: Messages.Paragraphs.Error,
  },
  Buttons: {
    Auth: Buttons.COMMON_AUTHENTICATION_BUTTON,
    Default: Buttons.COMMON_DEFAULT_BUTTON,
    Cancel: Buttons.COMMON_CANCEL_BUTTON,
    Delete: Buttons.COMMON_DELETE_BUTTON,
    Eco: Buttons.COMMON_ECO_BUTTON,
    Toolbar: Buttons.COMMON_TOOLBAR_BUTTON
  },
  Currency: Headers.CURRENCY,
  Form: {
    ResWrapper: Responsives.COMMON_RES_FORM_WRAPPER,
    InputWrapper: Wrappers.COMMON_INPUT_WRAPPER,
    Wrapper: Wrappers.COMMON_FORM_WRAPPER,
    Identifier: Headers.COMMON_FORM_IDENTIFIER,
    Input: Inputs.COMMON_FORM_INPUT,
    Check: {
      Wrapper: Wrappers.COMMON_CHECK_WRAPPER,
      Input: Inputs.COMMON_CHECKBOX_INPUT,
      Label: Labels.COMMON_CHECK_LABEL
    },
    Radio: {
      Input: Inputs.COMMON_RADIO_INPUT,
    }
  },
  Trackers: {
    Count: Icons.TRACKER_COUNT,
  }
}
