import React from 'react';
import ReactLoading from 'react-loading';
import { Styles } from '../../styles';
const { Animations } = Styles;
import styled from 'styled-components';
 
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonLoader = ({ loading, placeholder, color }) => {
  return (
    <Wrapper>
      {
        loading ? (
          <ReactLoading
            type="spin"
            color={ color === 'primary' ? 'white' : '#333333' }
            height="16px"
            width="16px"
          />
        ) : (
          <span>{placeholder}</span>
        ) 
      }
    </Wrapper>
  )
}

export default ButtonLoader;
