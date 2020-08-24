import styled from 'styled-components';

const TOP_NAV_SEARCH_INPUT = styled.input`
  border: 1px solid #DDDDDD;
  padding: 10px 10px;
  padding-left: 15px;
  font-size: 16px;
  border-radius: 5px 0px 0px 5px;
  border-right: 0px;
  &:focus {
    outline: none !important;
    transition: 0.2s linear;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.08);
  }
`
const COMMON_FORM_INPUT = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  box-sizing: border-box;
  padding: 0px 10px;
  height: 40px;
  border-radius: 5px;
  font-size: 14px;
  border: ${props =>
    props.error ? '1px solid red' : '1px solid #DDDDDD'
  };
  &:focus {
    outline: none !important;
    border-color: rgba(0, 0, 0, 0.5);
  };
  transition: border 0.2s linear;
  @media (max-width: 530px) {
    width: 100%;
  }
`
const COMMON_CHECKBOX_INPUT = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  vertical-align: bottom;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
`
const COMMON_RADIO_INPUT = styled.input.attrs({ type: 'radio' })`
  width: 12px;
  height: 18px;
  vertical-align: bottom;
  position: relative;
  overflow: hidden;
  background: red;
  margin-right: 0px;
  cursor: pointer;
`
const NEW_ITEM_TABLE_INPUT = styled.input`
  height: 40px;
  width: 150px;
  padding-left: 10px;
  margin: auto 0;
  border: 1px solid #E1E4E8;
  border-radius: 5px;
`
const PRODUCT_ITEM_CART_INPUT = styled.input`
  height: 38px;
  width: 45%;
  padding-left: 10px;
  margin: auto 0;
  font-size: 13px;
  border: 1px solid #7f7f7f;
  color: #7f7f7f;
  border-radius: 4px;
  background: white;
  margin-right: 3px;
  &:focus {
    border: 1px solid #7f7f7f;
  };
  &:disabled {
    border: 1px solid #C9C9C9;
    color: #C6D4DD;
  };
` 
const RES_SEARCH_INPUT = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  font-size: 14px;
  border: 1px solid #DDDDDD;
`
const USER_INPUT = styled.input`
  display: inline-block;
  box-sizing: border-box;
  padding: 0px 10px;
  height: 40px;
  border-radius: 5px;
  font-size: 14px;
  border: ${props =>
    props.error ? '1px solid red' : '1px solid #DDDDDD'
  };
  transition: border 0.2s linear;
  &:focus {
    outline: none !important;
    border-color: rgba(0, 0, 0, 0.4);
  };
  @media (max-width: 1090px) {
    width: 100%;
  }
`

export const Inputs = {
  TOP_NAV_SEARCH_INPUT,
  COMMON_FORM_INPUT,
  COMMON_CHECKBOX_INPUT,
  NEW_ITEM_TABLE_INPUT,
  PRODUCT_ITEM_CART_INPUT,
  COMMON_RADIO_INPUT,
  RES_SEARCH_INPUT,
  USER_INPUT
}
