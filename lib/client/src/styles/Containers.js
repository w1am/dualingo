import styled from 'styled-components';
import { Shared } from './Shared';
import { Link } from 'react-router-dom';

const TOP_NAV_CONTAINER = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px;
  background: white;
  -webkit-box-shadow: ${Shared.Shadows.Common};
  -moz-box-shadow: ${Shared.Shadows.Common};
  box-shadow: ${Shared.Shadows.Common};
  @media (max-width: 890px) {
    padding: 0px 0px;
  }
`
const TOP_NAV_SEARCH_CONTAINER = styled.div`
  position: relative;
  margin: auto 0;
`
const FORM_CONTAINER = styled.div`
  background: white;
  padding: 20px;
  border: 1px solid #DDDDDD;
`
const MERCHANT_REGISTER_CONTAINER = styled.div`
  flex: 1 33.33%;
  @media (max-width: 760px) {
    flex: 1 50%;
  };
  @media (max-width: 536px) {
    flex: 1 100%;
  };
`
const USER_REGISTER_CONTAINER = styled.div`
  flex: 1 50%;
  @media (max-width: 1090px) {
    flex: 1 100%;
  };
`
const DRAG_AND_DROP_CONTAINER = styled.div`
  border: 2px solid #D2D7DC;
  border-style: dashed;
  background: #f4f4f4;
  transition: 0.5s;
  padding: 20px 5px;
  height: 70px;
  width: 150px;
  position: relative;
  text-align: center;
  &:hover {
    cursor: pointer;
  };
`
const STORE_PAGE_SIDEBAR_CONTAINER = styled.div`
  min-height: 100vh;
  padding: 10px 0px;
  padding-right: 30px;
  flex: 0.15;
  background: #F4F6F7;
  @media (max-width: 890px) {
    display: none;
    flex: 0;
  }
`
const STORE_SELECTOR_CONTAINER = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const STORE_CONTENT_CONTAINER = styled.div`
  background: #F4F6F7;
  &.authed {
    flex: 0.85;
  };
  &.unauthed {
    flex: 1;
  };
  @media (max-width: 890px) {
    &.authed {
      flex: 1;
    };
    &.unauthed {
      flex: 1;
    };
  };
`
const COMMON_PRESENTATION_CONTAINER = styled.div`
  background: white;
  border-radius: 5px;
  border: 1px solid #DDDDDD;
  padding: 10px 20px;
  @media (max-width: 600px) {
    padding: 10px;
  }
`
const PRODUCT_SMALL_ITEM_CONTAINER = styled.div`
  flex: 1 19.6%;
  max-width: 19.6%;
  padding: 0.2%;
  background: white;
  box-shadow: inset 0px 0px 0px 0.5px #DDDDDD;
  @media (max-width: 1055px) {
    flex: 1 24.6%;
    max-width: 24.6%;
  };
  @media (max-width: 800px) {
    flex: 1 32.93%;
    max-width: 32.93%;
  };
  @media (max-width: 634px) {
    flex: 1 49.6%;
    max-width: 49.6%;
  };
  @media (max-width: 380px) {
    flex: 1 99.6%;
    max-width: 99.6%;
  };
`

const PRODUCT_ITEM_CONTAINER = styled.div`
  &.responsive {
    flex: 1 19.6%;
    max-width: 19.6%;
    padding: 0.2%;
    background: white;
    box-shadow: inset 0px 0px 0px 0.5px #DDDDDD;
    @media (max-width: 1055px) {
      flex: 1 24.6%;
      max-width: 24.6%;
    };
    @media (max-width: 800px) {
      flex: 1 32.93%;
      max-width: 32.93%;
    };
    @media (max-width: 634px) {
      flex: 1 49.6%;
      max-width: 49.6%;
    };
    @media (max-width: 380px) {
      flex: 1 99.6%;
      max-width: 99.6%;
    };
  };
  &.default {
    flex: 1 24.6%;
    max-width: 24.6%;
    padding: 0.2%;
    background: white;
    box-shadow: inset 0px 0px 0px 0.5px #DDDDDD;
    @media (max-width: 790px) {
      flex: 1 32.93%;
      max-width: 32.93%;
    };
    @media (max-width: 612px) {
      flex: 1 49.6%;
      max-width: 49.6%;
    };
    @media (max-width: 298px) {
      flex: 1 99.6%;
      max-width: 99.6%;
    };
  }
`
const IMAGE_CONTAINER = styled.div`
  position: relative;
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
  text-align: center;
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`
const CURRENT_PRODUCT_CONTAINER = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  width: 100%;
  @media (max-width: 830px) {
    flex-direction: column;
  };
`
const CURRENT_PRODUCT_INFORMATION_CONTAINER = styled.div`
  background: white;
  flex: 1;
  padding: 5px;
  @media (max-width: 600px) {
    padding: 0px;
  }
`
const CATEGORY_SIDE_BAR_CONTAINER = styled.div`
  min-height: 100vh;
  padding: 10px 0px;
  flex: 0.15;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  align-self: flex-start;
  background: white;
  border-top: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  @media (max-width: 890px) {
    display: none;
    flex: 0;
  }
`
const USER_SIDE_BAR_CONTAINER = styled.div`
  min-height: 100vh;
  padding: 10px 0px;
  flex: 0.15;
  position: -webkit-sticky;
  position: sticky;
  padding-right: 30px;
  top: 0;
  align-self: flex-start;
  background: #F4F6F7;
  @media (max-width: 890px) {
    display: none;
    flex: 0;
  }
`
const PAGE_CONTAINER = styled.div`
  display: flex;
  background: white;
  // border: 1px solid #DDDDDD;
  margin: 15px 0px;
`
const DATE_CONTAINER = styled.div`
  background: white;
  border: 1px solid #DDDDDD;
  position: absolute;
  z-index: 1;
  left: 0;
  min-width: 200px;
  -webkit-box-shadow: ${Shared.Shadows.Expand};
  -moz-box-shadow: ${Shared.Shadows.Expand};
  box-shadow: ${Shared.Shadows.Expand};
  &.fadeOut{
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.1s, visible 0.1s;
  };
  &.fadeIn{
    opacity: 1;
    visibility: visible;
    transition: opacity 0.1s 0.1s, visible 0.1s 0.1s;
  };
`
const USER_RESPONSIVE_ORDER_CONTAINER = styled(Link)`
  background: white;
  border: 1px solid #DDDDDD;
  flex: 1 48%;
  max-width: 48%;
  margin: 0.5%;
  text-decoration: none;
  &:hover {
    background: #F8F8F8;
    transition: 0.3s linear;
  };
  @media (max-width: 640px) {
    flex: 1 98%;
    max-width: 98%;
  };
`
const FILTER_BAR_CONTAINER = styled.div`
  display: flex;
  border: 1px solid #EBEBEB;
  background: white;
  padding: 0px 5px;
`

const STORE_NAV_CONTAINER = styled.div`
  padding-top: 15px;
  overflow-x: scroll;
`

const FOOTER_CONTAINER = styled.div`
  background: #DDDDDD;
  margin-top: 20px;
`
const FOOTER_MENU_CONTAINER = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const SEARCH_CONTAINER = styled.div`
  background: white;
  padding: 5px;
  box-shadow: inset 0px 0px 0px 0.5px #DDDDDD;
  display: flex;
  text-decoration: none;
  justify-content: space-between;
`
const SEARCH_BAR_CONTAINER = styled.div`
  min-height: 100vh;
  padding: 10px 0px;
  padding-right: 30px;
  flex: 0.15;
  background: #F5F5F5;
  @media (max-width: 890px) {
    display: none;
    flex: 0;
  }
`
const APP_SIDEBAR = styled.div`
  z-index: 5;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: ${props =>
    props.isOpen ? '200px' : '0px'
  };
  transition: width 0.4s;
  border-right: 1px solid #DDDDDD;
  text-align: left;
  -webkit-box-shadow: 8px 0px 16px 0px rgba(0,0,0,0.084);
  -moz-box-shadow: 8px 0px 16px 0px rgba(0,0,0,0.084);
  box-shadow: 8px 0px 16px 0px rgba(0,0,0,0.084);
`
const APP_LINK_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  overflow: scroll;
  border-bottom: 1px solid #DDDDDD;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &.open {
    display: block;
  };
  &.close {
    display: none;
  }
`
const RES_SEARCH_CONTAINER = styled.div`
  display: block;
  background: #EBEBEB;
  padding: 5px 10px;
  border-bottom: 1px solid #DDDDDD;
  @media (min-width: 890px) {
    display: none;
  }
`
const SETTINGS_PAYMENT_CONTAINER = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const USER_CONTAINER = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const FEATURE_CONTAINER = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Containers = {
  TOP_NAV_CONTAINER,
  TOP_NAV_SEARCH_CONTAINER,
  FORM_CONTAINER,
  MERCHANT_REGISTER_CONTAINER,
  USER_REGISTER_CONTAINER,
  DRAG_AND_DROP_CONTAINER,
  STORE_PAGE_SIDEBAR_CONTAINER,
  STORE_SELECTOR_CONTAINER,
  STORE_CONTENT_CONTAINER,
  COMMON_PRESENTATION_CONTAINER,
  PRODUCT_ITEM_CONTAINER,
  IMAGE_CONTAINER,
  CURRENT_PRODUCT_CONTAINER,
  CURRENT_PRODUCT_INFORMATION_CONTAINER,
  USER_SIDE_BAR_CONTAINER,
  PAGE_CONTAINER,
  DATE_CONTAINER,
  PRODUCT_SMALL_ITEM_CONTAINER,
  USER_RESPONSIVE_ORDER_CONTAINER,
  CATEGORY_SIDE_BAR_CONTAINER,
  FILTER_BAR_CONTAINER,
  STORE_NAV_CONTAINER,
  FOOTER_CONTAINER,
  FOOTER_MENU_CONTAINER,
  SEARCH_CONTAINER,
  SEARCH_BAR_CONTAINER,
  APP_SIDEBAR,
  APP_LINK_CONTAINER,
  RES_SEARCH_CONTAINER,
  SETTINGS_PAYMENT_CONTAINER,
  USER_CONTAINER,
  FEATURE_CONTAINER
}
