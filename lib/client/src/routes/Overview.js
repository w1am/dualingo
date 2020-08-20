import React, { useState } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery } from '@apollo/react-hooks';
import { formatNumber } from '../utils/productItemFormatter';
import { loadImage } from '../utils/imageFormatter';
import OrderList from '../containers/ships/OrderList';
import UserSidebar from '../containers/navigations/UserSidebar'
import styled from 'styled-components';
import OverviewPage from '../containers/Overview';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import ScrollToTopRoute from '../ScrollToTopRoute';

const { Common, Tabs, Forms, Product, Stores } = Styles;
const { Assets } = Product;

const Overview = ({ match: { params }, history }) => {
  return (
    <Common.Containers.Page>
      <ScrollToTopRoute />
      <UserSidebar />
      <Common.Wrappers.Content style={{ overflow: 'none', maxWidth: '100%' }}>
        <Stores.Content.Wrappers.Page>
          <Common.Links.Back to='/user/orders'>
            <Common.Icons.Default style={{ paddingRight: 4 }} icon={faChevronLeft} /> Go Back
          </Common.Links.Back>
          <OverviewPage />
        </Stores.Content.Wrappers.Page>
      </Common.Wrappers.Content>
    </Common.Containers.Page>
  )
}

export default withRouter(Overview);
