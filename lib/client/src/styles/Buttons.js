import styled from 'styled-components';
import { Shared } from './Shared';
import { Palette } from './Palette';

const TOP_NAV_SEARCH_BUTTON = styled.button`
  border-radius: 0px 5px 5px 0px;
  border: 0px;
  background: ${Palette.Theme};
  color: white;
  margin-right: 20px;
  cursor: pointer;
  font-weight: 600;
  padding: 0px 15px;
  &:hover {
    background: #FD5D3D;
  }
`
const COMMON_AUTHENTICATION_BUTTON = styled.button`
  border-radius: 5px;
  border: 0px;
  background: #0166FF;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 15px;
  &:disabled {
    background: #A2A3A4;
    cursor: default;
    &:hover {
      background: #A2A3A4;
    };
  };
  &:hover {
    background: #0658d3;
  };
`
const COMMON_ECO_BUTTON = styled.button`
  border-radius: 5px;
  border: 0px;
  background: #4AA550;
  color: white;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    background: #44984C;
  };
  &:disabled {
    background: #a1e0a6;
    color: #eaeaea;
    cursor: default;
  }
`
const COMMON_TOOLBAR_BUTTON = styled.button`
  border-radius: 5px;
  background: #fafbfc;
  color: #333333;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid rgba(27,31,35,.15);
  &:hover {
    background: #F3F4F6;
  };
  &:disabled {
    background: rgba(255, 255, 255, 0.08);
    color: #999999;
    cursor: default;
  }
`
const COMMON_DEFAULT_BUTTON = styled.button`
  border-radius: 5px;
  background: #fafbfc;
  color: #333333;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid rgba(27,31,35,.15);
  &:hover {
    background: #F3F4F6;
  };
  &:disabled {
    background: rgba(255, 255, 255, 0.08);
    color: #999999;
    cursor: default;
  }
`
const COMMON_DELETE_BUTTON = styled.button`
  border-radius: 5px;
  border: 0px;
  background: #db1500;
  color: white;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    background: #ce1f12;
  };
  &:disabled {
    background: #e56b60;
  }
`
const COMMON_CANCEL_BUTTON = styled.button`
  border-radius: 5px;
  border: 0px;
  background: none;
  color: #48505b;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
`
const PRODUCT_ITEM_PURCHASE_BUTTON = styled.button`
  width: 100%;
  transition: 0.2s;
  height: 38px;
  cursor: pointer;
  text-align: center;
  &:disabled {
    background: #63b9ff;
    border-color: #63b9ff;
  };
  @media (max-width: 480px) {
    margin-left: 0px;
    width: 100%;
  }
`
const ADD_TO_CART_BUTTON = styled.button`
  background: #399DCF;
  transition: 0.2s;
  padding: 13px 29px;
  border: 2px solid #91d7f7;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  color: white;
  &:hover {
    background: #25769b;
    border-color: #25769b;
    transition: 0.2s;
    border-radius: 5px;
  };
  @media (max-width: 540px) {
    padding: 10px 20px;
    font-size: 12px;
  };
  @media (max-width: 370px) {
    margin: 0px !important;
    width: 100%;
  }
`
const BUY_BUTTON = styled.button`
  margin-left: 10px;
  background: #1569B1;
  transition: 0.2s;
  padding: 13px 29px;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  border: 2px solid #78b2e2;
  color: white;
  border-radius: 5px;
  &:hover {
    background: #0e548e;
    border-color: #0e548e;
    transition: 0.2s;
  };
  &:disabled {
    background: #63b9ff;
    border-color: #63b9ff;
  };
  @media (max-width: 540px) {
    padding: 10px 20px;
    font-size: 12px;
  };
  @media (max-width: 370px) {
    margin: 0px !important;
    margin-top: 5px !important;
    width: 100%;
  }
`
const CART_CONTROL_BUTTON = styled.button`
  font-size: 20px;
  font-weight: 600;
  height: 32px;
  width: 30px;
  border: 1px solid #333333;
  margin: auto 0;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #CECECE;
    transition: 0.1s linear;
  };
  &:first-child {
    border-radius: 4px 0px 0px 4px;
    &:disabled {
      color: #CECECE;
      cursor: default;
      border-top: 1px solid #CECECE;
      border-bottom: 1px solid #CECECE;
      border-left: 1px solid #CECECE;
      background: none;
      &:hover {
        background: none;
      }
    }
  };
  &:last-child {
    border-radius: 0px 4px 4px 0px;
    &:disabled {
      color: #CECECE;
      cursor: default;
      border-top: 1px solid #CECECE;
      border-right: 1px solid #CECECE;
      border-bottom: 1px solid #CECECE;
      background: none;
      &:hover {
        background: none;
      }
    }
  };
`
const USER_ORDER_DELETE_BUTTON = styled.button`
  border-radius: 5px;
  background: #fafbfc;
  color: #333333;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid rgba(27,31,35,.15);
  &:hover {
    background: #F3F4F6;
  };
  &:disabled {
    background: rgba(255, 255, 255, 0.08);
    color: #999999;
    cursor: default;
  };
  @media (max-width: 530px) {
    width: 100%;
  }
`
const USER_ORDER_CONTINUE_BUTTON = styled.button`
  border-radius: 5px;
  border: 0px;
  background: #4AA550;
  color: white;
  font-weight: 600;
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    background: #44984C;
  };
  &:disabled {
    background: #a1e0a6;
    color: #eaeaea;
    cursor: default;
  };
  @media (max-width: 530px) {
    width: 100%;
    margin-top: 10px;
  }
`

export const Buttons = {
  TOP_NAV_SEARCH_BUTTON,
  COMMON_AUTHENTICATION_BUTTON,
  COMMON_DEFAULT_BUTTON,
  COMMON_CANCEL_BUTTON,
  PRODUCT_ITEM_PURCHASE_BUTTON,
  ADD_TO_CART_BUTTON,
  BUY_BUTTON,
  CART_CONTROL_BUTTON,
  COMMON_DELETE_BUTTON,
  COMMON_ECO_BUTTON,
  COMMON_TOOLBAR_BUTTON,
  USER_ORDER_DELETE_BUTTON,
  USER_ORDER_CONTINUE_BUTTON
}
