import styled from 'styled-components';
import { Shared } from './Shared';

const TABLE_BROWSER_TAG = styled.tbody`
`

const TABLE_LAYOUT = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: scroll;
`
const TABLE_ORDER_WRAPPER = styled.tr`
  margin: auto 0;
  transition: 0.1s linear;
  background: ${props =>
    props.checked ? '#EEF6F9' : 'white'
  };
  border-bottom: 1px solid #e0e0e0;
  &:first-child {
    background: none;
  };
  &:nth-child(odd) {
    background: ${props =>
      props.checked ? '#EEF6F9' : '#f7f7f7'
    };
  };
`
const TABLE_WRAPPER = styled.tr`
  margin: auto 0;
  &:nth-child(odd) {
    background: #FBFBFB;
  };
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: 0px;
  };
  &:first-child {
    background: none;
  };
`

const TABLE_ITEM = styled.td`
  padding: 0px 5px;
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 20px;
  color: #303030;
`

const TABLE_HEADER = styled.th`
  background: #FFFFFF;
  border-bottom: 1px solid #e0e0e0;
  color: #757575;
  font-weight: 500;
  text-align: left;
  padding: 10px;
  padding-left: 10px;
  padding-right: 20px;
  margin: auto 0;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`

export const Table = {
  TABLE_LAYOUT,
  TABLE_WRAPPER,
  TABLE_ITEM,
  TABLE_HEADER,
  TABLE_ORDER_WRAPPER,
  TABLE_BROWSER_TAG
}
