import styled from 'styled-components';
import { Shared } from './Shared';

const TAB_LABEL = styled.span`
  padding: 10px 20px;
  line-height: 30px;
`
const COMMON_CHECK_LABEL = styled.label`
  font-size: 14px;
  margin: auto 6px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`
const STORE_SELECTOR_LABEL = styled.label`
  text-align: center;
  display: block;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
`

export const Labels = {
  COMMON_CHECK_LABEL,
  TAB_LABEL,
  STORE_SELECTOR_LABEL
}
