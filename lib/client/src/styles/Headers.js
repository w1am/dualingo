import styled from 'styled-components';
import { Palette } from './Palette';
import { Link } from 'react-router-dom';
import { dates } from '../shared/date';

const getToday = () => new Date().getDate(); 
const getYear = () => new Date().getFullYear(); 
const getMonth = () => {
  const month = new Date().getMonth();
  return dates[month].month;
};

const COMMON_PAGE_HEADER = styled.h3`
  color: ${Palette.Header};
  margin: 12px 0px;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`
const COMMON_PAGE_SUB_HEADER = styled.p`
  color: ${Palette.SubHeader};
  margin: 0px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 15px;
`
const COMMON_PAGE_IDENTIFIER = styled.h5`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
  color: ${Palette.Header};
`
const COMMON_FORM_IDENTIFIER = styled.h5`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  cursor: default;
  color: ${Palette.Header};
`
const MODAL_TOOLBAR_HEADER = styled.h4`
  color: #333333;
  font-weight: 600;
  font-size: 14px;
  margin: auto 0;
`
const STORE_PAGE_INFO_HEADER = styled.h5`
  font-size: 13px;
  font-weight: 600;
  color: ${Palette.Label}
  margin: 0;
`
const PRODUCT_ITEM_PRICE = styled.h5`
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
`
const CURRENCY = styled.h5`
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
`
const CURRENT_PRODUCT_TITLE = styled.h4`
  font-size: 20px;
  @media (max-width: 530px) {
    margin-top: 10px;
    font-size: 16px;
  };
`
const CURRENT_PRODUCT_PRICE = styled.h2`
  white-space: nowrap;
  @media (max-width: 530px) {
    font-size: 16px;
  }
`
const CURRENT_PRODUCT_PREVIOUS_PRICE = styled.h4`
  display: block;
  margin-top: 20px;
  text-decoration: line-through;
  font-size: 15px;
  color: #b12704;
  white-space: nowrap;
  font-weight: 500;
`
const CURRENT_PRODUCT_OPTION_TITLE = styled.h5`
  font-size: 12px;
  color: rgba(51, 51, 51, 0.8);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 540px) {
    font-size: 11px;
  }
`
const CURRENT_PRODUCT_OPTION_PRICE = styled.h5`
  font-size: 12px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 540px) {
    font-size: 11px;
  }
`
const CART_PRODUCT_PRICE = styled.h3`
  font-weight: 500;
  @media (max-width: 612px) {
    font-size: 14px;
  }
`
const CART_PRODUCT_TITLE = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 8px 0px;
  @media (max-width: 612px) {
    font-size: 14px;
  };
`
const SETTINGS_PAGE_ITEM_HEADER = styled.h3`
  font-weight: 500;
  font-size: 14px;
  color: #727272;
  margin: auto 0;
`
const DATE_HEADER = styled.h3`
  font-size: 14px;
  flex: 1 17%;
  margin: 0.5%;
  max-width: 17%;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  padding: 1%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  background: ${props =>
    props.current == props.selected
    ? '#a1c5d1'
    : (props.today == `${getMonth()} ${getToday()} ${getYear()}` && (
      props.current == getToday()
    ))
    ? '#EBEBEB'
    : 'none'
  };
  &:hover {
    background: #a1c5d1;
  };
`
const HOME_BANNER_MAIN_HEADER = styled.h1`
  color: black;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  padding: 20px;
  font-weight: 600;
`

const CURRENT_PRODUCT_LABEL = styled.h1`
  font-size: 16px;
  margin: 0;
  color: #333333;
`

const CURRENT_PRODUCT_INFO = styled.p`
  font-size: 16px;
  margin: 0
`

export const Headers = {
  COMMON_PAGE_HEADER,
  COMMON_PAGE_IDENTIFIER,
  COMMON_FORM_IDENTIFIER,
  MODAL_TOOLBAR_HEADER,
  STORE_PAGE_INFO_HEADER,
  PRODUCT_ITEM_PRICE,
  CURRENCY,
  CURRENT_PRODUCT_TITLE,
  CURRENT_PRODUCT_PRICE,
  CURRENT_PRODUCT_PREVIOUS_PRICE,
  CURRENT_PRODUCT_OPTION_TITLE,
  CURRENT_PRODUCT_OPTION_PRICE,
  CART_PRODUCT_PRICE,
  CART_PRODUCT_TITLE,
  SETTINGS_PAGE_ITEM_HEADER,
  DATE_HEADER,
  COMMON_PAGE_SUB_HEADER,
  HOME_BANNER_MAIN_HEADER,
  CURRENT_PRODUCT_LABEL,
  CURRENT_PRODUCT_INFO
}
