import styled from 'styled-components';
import { Palette } from './Palette';
import { Shared } from './Shared';

const PAGE_WRAPPER = styled.div`
  padding: 0px 20px;
  max-width: 1316px;
  margin: 0 auto;
  @media (max-width: 890px) {
    padding: 10px 20px;
  }
`
const STORE_PAGE_WRAPPER = styled.div`
  background: #F4F6F7;
`
const TOP_NAV_MENU_WRAPPER = styled.div`
  position: relative;
`
const TOP_NAV_MENU_ITEM_WRAPPER = styled.div`
  display: flex;
  padding: 16px 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  background: ${props => props.openMenu ? 'white' : 'none'};
  border-top: ${props => props.openMenu ? `3px solid ${Palette.Theme}` : '3px solid transparent'};
  border-right: ${props => props.openMenu ? '1px solid #EBEBEB' : '1px solid transparent'};
  border-left: ${props => props.openMenu ? '1px solid #EBEBEB' : '1px solid transparent'};
  z-index: ${props => props.openMenu ? '999999' : '0'};
  position: relative;
`
const COMMON_FORM_WRAPPER = styled.div`
  padding-bottom: 13px;
  margin-bottom: 5px;
  display: block;
  cursor: pointer;
`
const COMMON_CHECK_WRAPPER = styled.div`
  display: block;
  padding: 13px 0px;
  margin: 5px 0px;
`
const CLICK_WRAPPER = styled.div`
  background: ${Palette.Click};
  width: 100%;
  height: 100%;
  overflow: none;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  &.fadeOut{
    opacity:0;
    width:0;
    height:0;
    transition: width 0.2s 0.2s, height 0.2s 0.2s, opacity 0.2s;
  };
  &.fadeIn{
    opacity:.5;
    width:100%;
    height:100%;
  };
`
const STORE_CONTENT_WRAPPER = styled.div`
  background: white;
  margin-top: 10px;
  display: flex;
  border-radius: 4px;
`
const LIST_WRAPPER = styled.div`
  border: 1px solid #e8e8e8;
  border-top: 0px;
  max-height: 200px;
  overflow-y: scroll;
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
`
const COMMON_INPUT_WRAPPER = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const PRODUCT_OPTION_IMAGE_WRAPPER = styled.label`
  display: block;
  text-align: center;
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border: 2px solid #93B0B3;
  transition: 0.6s;
  width: 80px;
  height: 40px;
  position: relative;
  border-style: dashed;
  &:hover {
    cursor: pointer;
    border: 2px solid #93B0B3;
    border-style: dashed;
    transition: 0.6s;
  }
`
const PRODUCT_WRAPPER = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const PRODUCT_VIEW_WRAPPER = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1060px;
  margin: 0 auto;
`
const PRODUCT_INFO_WRAPPER = styled.div`
  padding: 5px 10px;
`
const PRODUCT_CART_WRAPPER = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`
const CURRENT_PRODUCT_DISPLAY_WRAPPER = styled.div`
  max-width: 395px;
  min-width: 395px;
  margin: 0 auto;
  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
  }
`
const CURRENT_PRODUCT_OPTION_WRAPPER = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const CART_ITEM_WRAPPER = styled.div`
  padding: 5px 20px;
`
const BUTTON_LOADER = styled.div`
  text-align: center;
`
const NOTIFICATION_CLICK_WRAPPER = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  &.open {
    opacity:.5;
    width:100%;
    height:100%;
    transition: width 0.2s, height 0.2s, opacity 0.2s 0.2s;
  };
  &.close {
    opacity:0;
    width:0;
    height:0;
    transition: width 0.2s 0.2s, height 0.2s 0.2s, opacity 0.2s;
  }
`
const BUTTON_SELECTOR_WRAPPER = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  @media (max-width: 570px) {
    display: block;
  }
`
const COMMON_PAGE_CONTENT_WRAPPER = styled.div`
  flex: 0.85;
  background: #F4F6F7;
  // border: 1px solid #DDDDDD;
  @media (max-width: 890px) {
    flex: 1;
  }
`
const STORE_NAV_WRAPPER = styled.div`
  display: flex;
`
const SEARCH_ITEM_WRAPPER = styled.div`
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const APP_LINK_WRAPPER = styled.div`
`

export const Wrappers = {
  PAGE_WRAPPER,
  COMMON_CHECK_WRAPPER,
  TOP_NAV_MENU_WRAPPER,
  TOP_NAV_MENU_ITEM_WRAPPER,
  COMMON_FORM_WRAPPER,
  CLICK_WRAPPER,
  STORE_PAGE_WRAPPER,
  STORE_CONTENT_WRAPPER,
  LIST_WRAPPER,
  COMMON_INPUT_WRAPPER,
  PRODUCT_OPTION_IMAGE_WRAPPER,
  PRODUCT_WRAPPER,
  PRODUCT_INFO_WRAPPER,
  PRODUCT_CART_WRAPPER,
  CURRENT_PRODUCT_DISPLAY_WRAPPER,
  CURRENT_PRODUCT_OPTION_WRAPPER,
  CART_ITEM_WRAPPER,
  BUTTON_LOADER,
  NOTIFICATION_CLICK_WRAPPER,
  BUTTON_SELECTOR_WRAPPER,
  COMMON_PAGE_CONTENT_WRAPPER,
  PRODUCT_VIEW_WRAPPER,
  STORE_NAV_WRAPPER,
  SEARCH_ITEM_WRAPPER,
  APP_LINK_WRAPPER
}
