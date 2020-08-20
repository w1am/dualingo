import React from 'react';
import { Styles } from '../styles';
import Banner from '../assets/sellbanner.png';
import styled from 'styled-components';

const { Common } = Styles;

const BannerWrapper = styled.div`
  background: url(${Banner});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 350px;
  text-align: center;
  position: relative;
`

const Button = styled.button`
  padding: 20px 10px;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.37);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.37);
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.37);
  border: 0px;
  color: white;
  cursor: pointer;
  width: 250px;
  transition: 0.3s;
  font-size: 20px;
  background: #FF416C;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FF4B2B, #FF416C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const Sell = ({}) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <BannerWrapper>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <p style={{ color: '#333F48' }} > Upscale your business today </p>
          <h1 style={{ color: '#333F48', fontWeight: '700' }} >Create, Sell, Evolve, Connect</h1>
          <p style={{ color: '#333F48' }} > Join our platform and launch your online store for free!  </p>
          <Common.Links.Normal to='/merchant/auth/register'><Button>Start Selling!</Button></Common.Links.Normal>
        </div>
      </BannerWrapper>
    </div>
  )
}

export default Sell;
