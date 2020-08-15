import styled from 'styled-components';
import { Palette } from './Palette';
import { Link } from 'react-router-dom';

const TOGGLE_SWITCH = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
`
const TOGGLE_CHECKBOX = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  &:focus {
    box-shadow: 0 0 1px #2196F3;
  };
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
`
const TOGGLE_SLIDER = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? '#4AA344' : '#ccc'};
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 28px;
  &:before {
    -webkit-transform: ${props =>
      props.checked ? 'translateX(23px)' : 'null'
    };
    -ms-transform: ${props =>
      props.checked ? 'translateX(23px)' : 'null'
    };
    transform: ${props =>
      props.checked ? 'translateX(23px)' : 'null'
    };

    position: absolute;
    content: "";
    height: 21px;
    width: 21px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  -webkit-user-select: none;      
  -moz-user-select: none;
  -ms-user-select: none;
`

export const Toggle = {
  TOGGLE_SWITCH,
  TOGGLE_CHECKBOX,
  TOGGLE_SLIDER
}
