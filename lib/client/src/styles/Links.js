import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { Palette } from './Palette'
import { Shared } from './Shared';

const NEW_STORE_LINK = styled(Link)`
  background: white;
  border: 1px solid #EBEBEB;
  flex: 1 10%;
  margin-right: 1%;
  max-width: 10%;
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

const COMMON_BACK_LINK = styled(Link)`
  color: #3F6AD4;
  padding: 5px 0px;
  border-radius: 100px;
  text-decoration: none;
  display: inline-block;
  margin: 10px 0px;
  transition: 0.3s linear;
  &:hover {
    color: #234593;
  }
`

const COMMON_LINK = styled(Link)`
  display: inline-block;
  color: ${props => 
    props.type == 'error' ? 'white' : '#0166FF'
  };
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
`
const SIDEBAR_CATEGORY_LINK = styled(NavLink)`
  color: ${Palette.Menu};
  font-size: 14px;
  text-decoration: none;
  display: flex;
  padding: 7px 10px;
  border: 1px solid transparent;
  &:hover {
    color: black;
    border: 1px solid #EBEBEB;
  };
  &.onActive {
    background: #EBEBEB;
    color: #37363E;
    font-weight: 600;
    border: 1px solid #DDDDDD;
  }
`
const SIDEBAR_LINK = styled(NavLink)`
  color: ${Palette.Menu};
  font-size: 14px;
  text-decoration: none;
  display: flex;
  padding: 7px 10px;
  margin: 10px 0px;
  border-left: 3px solid transparent;
  &:hover {
    color: black;
  };
  &.onActive {
    background: #FFFFFF;
    color: #37363E;
    font-weight: 600;
  }
`
const COMMON_LINK_SMALL = styled(Link)`
  display: block;
  font-size: 14px;
  color: #0166FF;
  text-decoration: none;
`

const TAB_LINK = styled(Link)`
  font-size: 13px;
  white-space: nowrap;
  color: #000000;
  text-decoration: none;
  border: 1px solid #DDDDDD;
  border-bottom: ${props =>
    (props.active == props.current) ? "white" : "1px solid #DDDDDD"
  };
  border-radius: 4px 4px 0px 0px;
  line-height: 150px
  display: block;
  &::before {
    border-top: 2px solid ${Palette.Theme};
    display: block;
    content: '';
    height: 1px;
    transform: ${props =>
      (props.active == props.current) ? "scaleX(1)" : "scaleX(0)"
    };
    transition: transform 150ms ease-in-out;
  };
  position: relative;
  bottom: -1px;
  background: ${props =>
    (props.active == props.current)
      ? "white"
      : "#F8F8F8"
  };
  &:nth-child(odd) {
    border-right: 0px;
  };
  &:last-child {
    border-right: 1px solid #DDDDDD;
  }
`
const PRODUCT_ITEM_TITLE = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  display: block;
`
const PRODUCT_ITEM_STORENAME = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #333333;
`
const STORE_NAV_LINK = styled(NavLink)`
  text-decoration: none;
  margin-right: 20px;
  color: ${Palette.Menu};
  font-size: 14px;
  min-width: 70px;
  text-align: center;
  &::after {
    border-bottom: 2px solid ${Palette.Theme};
    display: block;
    content: '';
    height: 1px;
    padding-top: 14px;
    transform: scaleX(0);
  };
  &.onActive {
    &::after {
      border-bottom: 2px solid ${Palette.Theme};
      display: block;
      content: '';
      height: 1px;
      padding-top: 14px;
      transform: scaleX(1);
      transition: transform 200ms ease-in-out;
    };
  }
`
const FOOTER_LINK = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  transition: 0.1s linear;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: black;
  };
`

const SEARCH_BAR_LINK = styled.label`
  margin: auto 0;
  font-size: 14px;
  margin-left: 10px;
  color: #727272;
  cursor: pointer;
`

const APP_LINK = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid ${props => props.active ? '#DDDDDD' : 'transparent'};
  color: #333333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    background: rgba(0, 0, 0, 0.056);
  }
`

const APP_SUB_LINK = styled(Link)`
  cursor: pointer;
  padding: 10px;
  display: block;
  padding-left: 20px;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    background: rgba(0, 0, 0, 0.056);
  };
`

const USER_LINK = styled(Link)`
  display: block;
  color: #0166FF;
  font-size: 14px;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  margin: 10px 0px;
`

export const Links = {
  COMMON_LINK,
  COMMON_LINK_SMALL,
  TAB_LINK,
  PRODUCT_ITEM_TITLE,
  PRODUCT_ITEM_STORENAME,
  SIDEBAR_LINK,
  COMMON_BACK_LINK,
  NEW_STORE_LINK,
  SIDEBAR_CATEGORY_LINK,
  STORE_NAV_LINK,
  FOOTER_LINK,
  SEARCH_BAR_LINK,
  APP_LINK,
  APP_SUB_LINK,
  USER_LINK
}
