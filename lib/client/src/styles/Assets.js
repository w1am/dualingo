import styled from 'styled-components';
import ReactImg from 'react-image';

const TOP_NAV_LOGO = styled(ReactImg)`
  height: 23px;
  display: block;
  cursor: pointer;
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
`
const MODAL_CLOSE_BUTTON = styled(ReactImg)`
  height: 20px;
  cursor: pointer;
`
const UPLOAD_PREVIEW_IMAGE = styled(ReactImg)`
  overflow: hidden;
  height: 50px;
  width: 50px;
  object-fit: contain;
  border: 1px solid #DDDDDD;
`
const STORE_PAGE_SIDEBAR_LOGO = styled(ReactImg)`
  height: 100px;
  width: 100px;
  background: white;
  padding: 5px;
  border: 1px solid #DDDDDD;
  border-radius: 5px;
  @media (max-width: 890px) {
    height: 80px;
    width: 80px;
  }
`
const STORE_SELECTOR_LOGO = styled(ReactImg)`
  max-width: 100%;
  border-radius: 5px 5px 0px 0px;;
`
const PRODUCT_OPTION_PREVIEW_IMAGE = styled(ReactImg)`
  width: 80px;
  height: 40px;
  object-fit: cover;
`
const PRODUCT_ITEM_IMAGE = styled(ReactImg)`
  max-width: 100%;
  // height: 300px;
  // object-fit: contain;
`
const PRODUCT_OPTION_IMAGE = styled(ReactImg)`
  height: 100px;
  width: 100px;
  object-fit: contain;
`
const CURR_PRODUCT_IMAGE = styled(ReactImg)`
  max-width: 100%;
`
const CURRENT_PRODUCT_OPTION_IMAGE = styled(ReactImg)`
  flex: 0.2;
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin: auto 0;
`
const IMAGE_CONTROLLER_IMAGE = styled(ReactImg)`
  height: 40px;
  width: 40px;
  object-fit: cover;
  margin-top: 10px;
  margin-right: 10px;
  border: 2px solid ${props =>
    props.currentlySelected ? "#545454" : "#BFBFBF"
  };
  transition: 0.2s;
  &:hover {
    border-color: #545454;
    cursor: pointer;
    transition: 0.2s;
  };
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 530px) {
    height: 30px;
    width: 30px;
  }
`
const CART_PRODUCT_IMAGE = styled(ReactImg)`
  max-width: 120px;
  max-height: 120px;
  object-fit: contain;
  display: block;
  vertical-align: middle;
  @media (max-width: 612px) {
    width: 80px;
    height: 80px;
  };
  @media (max-width: 412px) {
    width: 50px;
    height: 80px;
  };
`
const COMMON_LOGO_SMALL = styled(ReactImg)`
  width: 30px;
  height: 30px;
  object-fit: contain;
`
const PRODUCT_DISPLAY_IMAGE = styled(ReactImg)`
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: block;
  margin: auto 0;
  border-radius: 50px;
  border: 1px solid #EBEBEB;
  margin: 5px;
`
const PRODUCT_ORDER_IMAGE = styled(ReactImg)`
  width: 60px;
  height: 60px;
  object-fit: contain;
  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
`
const PRODUCT_ORDER_ROUND_IMAGE = styled(ReactImg)`
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 30px;
`
const MORE_ORDER_ITEM = styled.div`
  min-width: 30px;
  height: 30px;
  object-fit: cover;
  position: relative;
  left: -20px;
  text-align: center;
  font-weight: 700;
  color: white;
  vertical-align: middle;
  background: #dbdbdb;
  color: #545454;
  opacity: 0.9;
  font-size: 18px;
  line-height: 30px;
  margin: auto 0;
  border-radius: 100%;
  border: 2px solid #919EAB;
`
const COMMON_ORDER_LOGO = styled(ReactImg)`
  width: 30px;
  height: 30px;
  object-fit: contain;
  background: white;
  margin: auto 0;
  border-radius: 30px;
  border: 2px solid #919EAB;
  margin-right: 5px;
  margin-left: -20px;
  &:first-child {
    margin-left: 0px;
  };
`
const SEARCH_LOGO = styled(ReactImg)`
  width: 100px;
  height: 100px;
  padding: 5px;
`
const SETTINGS_PAYMENT_ICON = styled(ReactImg)`
  max-width: 100%;
  height: 100px;
  margin: 0 auto;
  display: block;
  object-fit: contain;
`
const FEATURE_IMAGE = styled(ReactImg)`
  object-fit: cover;
  width: 100%;
`
const COMMON_STORE_LOGO = styled(ReactImg)`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 2px solid grey;
  margin: 20px;
  object-fit: contain;
`

export const Assets = {
  TOP_NAV_LOGO,
  STORE_SELECTOR_LOGO,
  MODAL_CLOSE_BUTTON,
  UPLOAD_PREVIEW_IMAGE,
  STORE_PAGE_SIDEBAR_LOGO,
  PRODUCT_OPTION_PREVIEW_IMAGE,
  PRODUCT_ITEM_IMAGE,
  PRODUCT_OPTION_IMAGE,
  CURR_PRODUCT_IMAGE,
  CURRENT_PRODUCT_OPTION_IMAGE,
  IMAGE_CONTROLLER_IMAGE,
  CART_PRODUCT_IMAGE,
  COMMON_LOGO_SMALL,
  PRODUCT_DISPLAY_IMAGE,
  PRODUCT_ORDER_IMAGE,
  PRODUCT_ORDER_ROUND_IMAGE,
  MORE_ORDER_ITEM,
  COMMON_ORDER_LOGO,
  SEARCH_LOGO,
  SETTINGS_PAYMENT_ICON,
  FEATURE_IMAGE,
  COMMON_STORE_LOGO
}
