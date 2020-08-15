import React from 'react';
import StoreOverview from '../containers/StoreOverview';
import ScrollToTopRoute from '../ScrollToTopRoute';

const StoreOrderPage = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollToTopRoute />
      <StoreOverview />
    </div>
  )
}

export default StoreOrderPage;
