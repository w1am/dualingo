import React from 'react';
import StoreOverview from '../containers/StoreOverview';
import ScrollToTopRoute from '../ScrollToTopRoute';
import { Styles } from '../styles';
const { Common } = Styles;

const StoreOrderPage = () => {
  return (
    <Common.Wrappers.Page style={{ minHeight: '100vh' }}>
      <ScrollToTopRoute />
      <StoreOverview />
    </Common.Wrappers.Page>
  )
}

export default StoreOrderPage;
