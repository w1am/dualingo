import styled from 'styled-components';
import { Shared } from './Shared';
import { Palette } from './Palette';
import { Link } from 'react-router-dom';
import HomeBanner from '../assets/header.jpg';

const TOP_NAV_MENU_LAYOUT = styled.div`
 display: flex;
 flex-direction: row-reverse;
 @media (max-width: 890px) {
  display: none;
 }
`
const TABBED_PAGE_LAYOUT = styled.div`
  display: flex;
`
const MERCHANT_REGISTER_LAYOUT = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const USER_REGISTER_LAYOUT = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const NOTIFICATION_CONTENT_LAYOUT = styled.div`
  position: fixed;
  background: ${props =>
    props.type == 'error' ? 'rgba(255, 0, 8, 0.90)' : 'rgba(0, 0, 0, 0.95)'
  };
  transform: translate(-50%, -50%);
  bottom: 0;
  left: 50%;
  width: ${props => props.width ? props.width : '250px'};
  z-index: 999999999999999999999;
  border-radius: 5px;
  padding: 15px 20px;
  -webkit-box-shadow: ${Shared.Shadows.Expand};
  -moz-box-shadow: ${Shared.Shadows.Expand};
  box-shadow: ${Shared.Shadows.Expand};
  &.open {
    bottom: 0;
    opacity: 1;
    transition: bottom 0.4s, opacity 0.2s 0.2s;
    z-index: 999999999999999999999;
  };
  &.close {
    bottom: -100%;
    opacity: 0;
    transition: bottom 0.4s, opacity 0.2s 0.2s;
  }
`

const MODAL_CONTENT_LAYOUT = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  margin: auto;
  z-index: 2;
  width: ${props => props.width ? props.width : '70%'};
  -webkit-box-shadow: ${Shared.Shadows.Expand};
  -moz-box-shadow: ${Shared.Shadows.Expand};
  box-shadow: ${Shared.Shadows.Expand};
  border-radius: 8px;
  &.fadeOut{
    z-index: -1;
    width: 0;
    top: -100%;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    @media (max-width: 610px) {
      width: 90%;
    };
    @media (max-width: 490px) {
      width: 95%;
    };
  };
  &.fadeIn{
    z-index: 99999999999999999999999999999999999;
    top: 50%;
    width: ${props => props.width ? props.width : '70%'};
    visibility: visible;
    opacity: 1;
    @media (max-width: 610px) {
      width: 90%;
    };
    @media (max-width: 490px) {
      width: 95%;
    };
  };
  @media (max-width: 610px) {
    width: 90%;
  };
  @media (max-width: 490px) {
    width: 95%;
  };
`

const MODAL_TOOLBAR_LAYOUT = styled.div`
  background: #EEF6F9;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 8px 8px 0px 0px;
`
const DRAG_AND_DROP_LAYOUT = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const STORE_SELECTOR_LAYOUT = styled(Link)`
  background: white;
  flex: 1 10%;
  margin-right: 1%;
  max-width: 10%;
  border: 1px solid #EBEBEB;
  cursor: pointer;
  text-decoration: none;
  color: ${Palette.Label};
  border-radius: 5px;
  &:hover {
    -webkit-box-shadow: ${Shared.Shadows.Hover};
    -moz-box-shadow: ${Shared.Shadows.Hover};
    box-shadow: ${Shared.Shadows.Hover};
    transition: 0.3s linear;
  };
  @media (max-width: 1047px) {
    flex: 1 13.78%;
    max-width: 13.78%;
  };
  @media (max-width: 770px) {
    flex: 1 16.67%;
    max-width: 16.67%;
  };
  @media (max-width: 663px) {
    flex: 1 18%;
    max-width: 18%;
  };
  @media (max-width: 630px) {
    flex: 1 30%;
    max-width: 30%;
  };
  @media (max-width: 492px) {
    flex: 1 47%;
    max-width: 47%;
  };
  @media (max-width: 267px) {
    flex: 1 100%;
    max-width: 100%;
  };
`
const STORE_PAGE_INFO_TOOLBAR_LAYOUT = styled.div`
  background: white;
  border-bottom: 1px solid #DDDDDD;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 890px) {
    padding: 8px 20px;
  }
`
const CURRENT_PRODUCT_OPTION_LAYOUT = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: inset 0px 0px 0px 0.8px ${
    props => (props.selected == props.currOption)
    ? "#F05A3A"
      : "rgba(51, 51, 51, 0.2)"
  };
  -webkit-box-shadow: inset 0px 0px 0px 0.8px ${
    props => (props.selected == props.currOption)
    ? "#F05A3A"
      : "rgba(51, 51, 51, 0.2)"
  };
  -moz-box-shadow: inset 0px 0px 0px 0.8px ${
    props => (props.selected == props.currOption)
    ? "#F05A3A"
      : "rgba(51, 51, 51, 0.2)"
  };
  border-color: ${props =>
    (props.selected == props.currOption)
      ? '#F05A3A'
      : 'rgba(51, 51, 51, 0.2)'
  };
  border: ${props =>
    (props.selected == props.currOption)
      ? '1px solid #F05A3A'
      : '1px solid rgba(51, 51, 51, 0.2)'
  };
  transition: 0.1s linear;
  flex: 1 17.5%;
  margin: 0.7%;
  max-width: 17.5%;
  padding: 0.55%;
  cursor: pointer;
  border-radius: 5px;
  @media (max-width: 1200px) {
    flex: 1 22%;
    max-width: 22%;
  };
  @media (max-width: 1070px) {
    flex: 1 30.33%;
    max-width: 30.33%;
  };
  @media (max-width: 948px) {
    flex: 1 47%;
    max-width: 47%;
  };
  @media (max-width: 830px) {
    flex: 1 22%;
    max-width: 22%;
  };
  @media (max-width: 620px) {
    flex: 1 30.33%;
    max-width: 30.33%;
  };
  @media (max-width: 480px) {
    flex: 1 47%;
    max-width: 47%;
  };
  @media (max-width: 350px) {
    flex: 1 97%;
    max-width: 97%;
  };
`
const IMAGE_CONTROLLER_LAYOUT = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`
const CART_ITEM_LAYOUT = styled.div`
  border-bottom: 1px solid #EBEBEB;
  display: flex;
  justify-content: space-between;
  background: white;
  width: 100%;
  margin: auto 0;
  &:last-child {
    border-bottom: 0px;
    padding: 14px 0px;
  }
` 
const SETTINGS_PAGE_ITEM_LAYOUT = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  max-width: 300px;
`
const MONTH_LAYOUT = styled.div`
  display: flex;
  justify-content: space-between;
  background: #EEF6F9;
  padding: 5px 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`
const DATE_LAYOUT = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`
const USER_ORDER_LAYOUT = styled.div`
  border: 1px solid #DDDDDD;
  margin-bottom: 10px;
`
const USER_ORDER_HEADER_LAYOUT = styled.div`
  background: #F5F5F8;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #DDDDDD;
`
const USER_CONTENT_LAYOUT = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 530px) {
    display: block;
  }
`
const HOME_BANNER_LAYOUT = styled.div`
  background: url(${HomeBanner});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 350px;
`
const SETTINGS_PAYMENT_LAYOUT = styled.div`
  position: relative;
  box-shadow: inset 0px 0px 0px 1px ${props => props.checked ? '#64ce27' : '#EBEBEB'};
  padding: 0.5%;
  flex: 1 18%;
  margin-right: 1%;
  margin-bottom: 1%;
  max-width: 18%;
  cursor: pointer;
  border-radius: 4px;
  &:last-child {
    margin-right: 0%;
  };
  &:hover {
    box-shadow: inset 0px 0px 0px 1px ${props => props.checked ? '#7fe047' : 'rgba(0, 0, 0, 0.3)'};
    transition: 0.1s linear;
  };
  @media (max-width: 1110px) {
    flex: 1 23%;
    max-width: 23%;
  };
  @media (max-width: 715px) {
    flex: 1 31.33%;
    max-width: 31.33%;
  };
  @media (max-width: 560px) {
    flex: 1 48%;
    max-width: 48%;
  };
  @media (max-width: 470px) {
    flex: 1 100%;
    max-width: 100%;
    margin: 0%;
  };
`
const USER_LAYOUT = styled.div`
  flex: 1 24%;
  margin-right: 1%;
  margin-bottom: 1%;
  margin-top: 1%;
  max-width: 24%;
  &:last-child {
    margin-right: 0%;
  };
  @media (max-width: 725px) {
    flex: 1 32.33%;
    max-width: 32.33%;
  };
  @media (max-width: 492px) {
    flex: 1 49%;
    max-width: 49%;
  };
  @media (max-width: 480px) {
    flex: 1 99%;
    max-width: 99%;
  };
`
const FEATURE_LAYOUT = styled.div`
  flex: 1 30.33%;
  margin-right: 1%;
  margin-bottom: 10px;
  max-width: 30.33%;
  box-shadow: inset 0px 0px 0px 0.5px #DDDDDD;
  background: white;
  display: block;
  padding: 20px 1%;
  &:last-child {
    margin-right: 0%;
  };
  @media (max-width: 740px) {
    flex: 1 47%;
    max-width: 47%;
  };
  @media (max-width: 492px) {
    flex: 1 100%;
    max-width: 100%;
    margin: 0%;
    margin-bottom: 10px;
    padding: 20px;
  }
`

const COUPON_LAYOUT = styled.div`
  padding: 12px 10px;
  background: white;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Layouts = {
  TOP_NAV_MENU_LAYOUT,
  STORE_SELECTOR_LAYOUT,
  TABBED_PAGE_LAYOUT,
  MERCHANT_REGISTER_LAYOUT,
  MODAL_CONTENT_LAYOUT,
  MODAL_TOOLBAR_LAYOUT,
  USER_REGISTER_LAYOUT,
  DRAG_AND_DROP_LAYOUT,
  STORE_PAGE_INFO_TOOLBAR_LAYOUT,
  CURRENT_PRODUCT_OPTION_LAYOUT,
  IMAGE_CONTROLLER_LAYOUT,
  CART_ITEM_LAYOUT,
  NOTIFICATION_CONTENT_LAYOUT,
  SETTINGS_PAGE_ITEM_LAYOUT,
  MONTH_LAYOUT,
  DATE_LAYOUT,
  USER_ORDER_LAYOUT,
  USER_ORDER_HEADER_LAYOUT,
  USER_CONTENT_LAYOUT,
  HOME_BANNER_LAYOUT,
  SETTINGS_PAYMENT_LAYOUT,
  USER_LAYOUT,
  FEATURE_LAYOUT,
  COUPON_LAYOUT
}
