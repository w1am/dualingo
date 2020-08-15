import React from 'react';
import { Styles } from '../../styles';
import Loading from 'react-loading';
import styled from 'styled-components'

const Layout = styled.div`
  min-height: 100vh;
  width: 100%;
  background: none;
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%,-190%);
`

const PageLoader = ({}) => {
  return (
    <Layout>
      <Wrapper>
        <Loading
          type="spinningBubbles"
          color='#4f4f4f'
          height='40px'
          width='40px'
        />
      </Wrapper>
    </Layout>
  )
}

export default PageLoader;
