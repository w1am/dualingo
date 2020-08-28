import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
const { Common, Tabs, Forms, Animations } = Styles;
import { Route } from 'react-router-dom';
import MerchantRegister from '../forms/MerchantRegister';

const MerchantLogin = ({}) => {
  return (
    <Common.Wrappers.Page style={{ minHeight: '100vh' }}>
      <Animations.FadeIn>
        <Common.Headers.Page>Sell on Flex</Common.Headers.Page>
        <Forms.Container>
          <MerchantRegister />
        </Forms.Container>
      </Animations.FadeIn>
    </Common.Wrappers.Page>
  )
}

export default MerchantLogin; 
