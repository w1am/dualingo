import React from 'react';
import { Styles } from '../styles';
import styled from 'styled-components';
import Email from '../assets/emailSent.png';
const { Common, Animations } = Styles;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  height: 140px;
  margin-bottom: 15px;
  @media (max-width: 480px) {
    height: 100px;
  };
`
const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 50%;
  text-align: center;
  width: 100%;
`
const Header = styled.h3`
  margin: 0 auto;
  margin-bottom: 10px;
  @media (max-width: 370px) {
    font-size: 16px;
  };
`
const Text = styled.p`
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 370px) {
    font-size: 14px;
  };
`

const MerchantSuccess = ({}) => {
  return (
    <Animations.Fade>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <Container>
          <Image src={Email} />
          <Header>A verification link has been sent to your email account.</Header>
          <Text>
            Please click on the link that has just been sent to your email account to verify your email.
          </Text>
        </Container>
      </div>
    </Animations.Fade>
  )
}

export default MerchantSuccess;
