import React from 'react';
import { Styles } from '../../styles';
import Loading from 'react-loading';
import styled from 'styled-components'
const { Animations } = Styles;

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const AppLoader = ({}) => {
  return (
    <Layout>
      <Wrapper>
        <Animations.Fade>
          <Loading
            type="spin"
            color='#4f4f4f'
            height='60px'
            width='60px'
          />
          <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>loading...</p>
        </Animations.Fade>
      </Wrapper>
    </Layout>
  )
}

export default AppLoader;
