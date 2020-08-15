import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Palette } from './Palette';
import { Shared } from './Shared';

const TOP_NAV_DROPDOWN_LAYOUT = styled.div`
  background: white;
  position: absolute;
  border-right: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  border-top: 1px solid #EBEBEB;
  -webkit-box-shadow: ${Shared.Shadows.Expand};
  -moz-box-shadow: ${Shared.Shadows.Expand};
  box-shadow: ${Shared.Shadows.Expand};
  padding: 10px 0px;
  right: 0;
  top: 52px;
  z-index: 2;
`
const TOP_NAV_DROPDOWN_WRAPPER = styled.div`
  margin: 20px;
`
const TOP_NAV_DROPDOWN_MENU_LAYOUT = styled.div`
  display: flex;
`
const TOP_NAV_DROPDOWN_ITEM = styled(Link)`
  font-size: 14px;
  white-space: nowrap;
  padding: 0;
  margin: 8px 0px;
  display: block;
  text-decoration: none;
  color: ${Palette.Menu};
  &:hover {
    text-decoration: underline;
  }
`
const DROPDOWN = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #DDDDDD;
  right: 0;
  bottom: -55px;
  min-width: 100px;
  -webkit-box-shadow: ${Shared.Shadows.Expand};
  -moz-box-shadow: ${Shared.Shadows.Expand};
  box-shadow: ${Shared.Shadows.Expand};
  border-radius: 4px;
  padding: 6px;
  border-radius: 10px;
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
  &:after {
    position: absolute;
    left: 67%;
    top: -10px;
    width: 0;
    height: 0;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  };
  &:before {
    position: absolute;
    left: 65.7%;
    top: -12px;
    width: 0;
    height: 0;
    content: '';
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #e2e2e2;
  };
`

export const Dropdowns = {
  TOP_NAV_DROPDOWN_LAYOUT,
  TOP_NAV_DROPDOWN_WRAPPER,
  TOP_NAV_DROPDOWN_MENU_LAYOUT,
  TOP_NAV_DROPDOWN_ITEM,
  DROPDOWN
}
