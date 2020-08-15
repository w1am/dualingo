import styled from 'styled-components';
import ReactImg from 'react-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PRODUCT_OPTION_PREVIEW_ICON = styled(FontAwesomeIcon)`
  color: #93B0B3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    cursor: pointer;
  }
`

const COMMON_ICON = styled(FontAwesomeIcon)`
  padding-right: 10px;
`
const TOP_NAV_ICON = styled(ReactImg)`
  height: 18px;
  margin: auto 0;
  padding-right: 6px;
  cursor: pointer;
`
const TRACKER_COUNT = styled.p`
  background: #ce3b48;
  color: white;
  width: 20px;
  height: 20px;
  display: block;
  line-height: 20px;
  border-radius: 20px;
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  margin: auto 0;
  position: absolute;
  top: -12px;
  right: -5px
`
const TOP_NAV_SEARCH_ICON = styled(ReactImg)`
  position: absolute;
  height: 16px;
  top: 11px;
  left: 10px;
`
const DRAG_AND_DROP_ICON = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: #94A0A8;
`
const COMMON_TRASH_ICON = styled(FontAwesomeIcon)`
  color: #EA5332;
  padding: 10px;
  background: transparent;
  border-radius: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  transition: 0.3s;
  &:hover {
    color: #6D707A;
    cursor: pointer;
    transition: 0.3s;
    background: #e3edf7;
  }
`

export const Icons = {
  TOP_NAV_ICON,
  TRACKER_COUNT,
  TOP_NAV_SEARCH_ICON,
  DRAG_AND_DROP_ICON,
  COMMON_ICON,
  PRODUCT_OPTION_PREVIEW_ICON,
  COMMON_TRASH_ICON
}
