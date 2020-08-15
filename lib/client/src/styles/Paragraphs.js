import styled from 'styled-components';
import { Palette } from './Palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Shared } from './Shared';

const COMMON_DESC = styled.p`
  color: ${Palette.Desc};
  font-size: 14px;
`
const DRAG_AND_DROP_LABEL = styled.p`
  color: #94A0A8;
  font-size: 12px;
  margin: 0px;
  margin-top: 10px;
  min-width: 130px;
`
const DRAG_AND_DROP_HOVER_LABEL = styled.p`
  color: #4177ad;
  font-size: 12px;
  margin: 0px;
  min-width: 130px;
  margin-top: 10px;
`
const STORE_PAGE_INFO_DESC = styled.p`
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  margin-top: 7px;
  color: ${Palette.Label}
`
const LIST_ITEM = styled.a`
  padding: 10px 18px;
  display: block;
  font-size: 14px;
  border-top: 1px solid #e8e8e8;
  background: white;
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    background: #CFE2F4;
    cursor: pointer;
    transition: 0.3s;
  }
`
const COMMON_CATEGORY_ITEM = styled.span`
  padding: 6px 12px;
  background: #CFE2F4;
  color: #637381;
  font-weight: 600;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 8px;
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
`
const WISHLIST_BADGE = styled(FontAwesomeIcon)`
  margin: 8px;
  padding: 10px;
  background: ${props =>
    props.checked ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.9)'
  };
  border: 1px solid ${props => props.checked ? '#CE4047' : 'rgba(0, 0, 0, 0.3)'};
  color: ${props => props.checked ? '#CE4047' : 'rgba(0, 0, 0, 0.3)'};
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  -webkit-box-shadow: ${Shared.Shadows.Common};
  -moz-box-shadow: ${Shared.Shadows.Common};
  box-shadow: ${Shared.Shadows.Common};
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 222px;
  z-index: 1;
  transition: 0.3s linear;
  &:hover {
    color: #CE4047;
    border: 1px solid #CE4047;
    background: rgba(255, 255, 255, 0.8);
  }
`

const COMMON_BADGE = styled.p`
  padding: 5px 10px;
  margin: 8px;
  background: red;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`
const CART_PRODUCT_COUNT = styled.p`
`
const CART_PRODUCT_OPTION = styled.p`
`
const CART_PRODUCT_CONTROL = styled.p`
  margin: auto 0;
  background: #EBEBEB;
  height: 30px;
  line-height: 30px;
  padding: 0px 14px;
  font-size: 14px;
  font-weight: 600;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  cursor: default;
`
const COMMON_ERROR_MESSAGE = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
  padding-top: 5px;
`
const STATUS_BADGE = styled.p`
  padding: 5px 10px;
  background: ${props =>
    props.status == true ? "#6565FF" : props.status == false ? "#F1702E" : "#94abb7"
  };
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  text-align: center;
`
const COMMON_SWITCH = styled.p`
  font-size: 14px;
  text-decoration: underline;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: 0.1s linear;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  };
  @media (max-width: 700px) {
    font-size: 12px;
  };
`

export const Paragraphs = {
  COMMON_DESC,
  DRAG_AND_DROP_LABEL,
  DRAG_AND_DROP_HOVER_LABEL,
  STORE_PAGE_INFO_DESC,
  LIST_ITEM,
  COMMON_CATEGORY_ITEM,
  COMMON_BADGE,
  CART_PRODUCT_COUNT,
  CART_PRODUCT_OPTION,
  CART_PRODUCT_CONTROL,
  COMMON_ERROR_MESSAGE,
  STATUS_BADGE,
  WISHLIST_BADGE,
  COMMON_SWITCH
}
