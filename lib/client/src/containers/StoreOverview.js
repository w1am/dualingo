import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery } from '@apollo/react-hooks';
import { formatNumber } from '../utils/productItemFormatter';
import OrderList from '../containers/ships/OrderList';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const { Common, Tabs, Forms, Badges } = Styles;

const pages = [
  'Items Ordered',
  'Shipping Address'
]

const Item = styled.p`
  margin: 4px 0px;
`
const Header = styled.h3`
  margin-bottom: 15px;
`
const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  @media (max-width: 700px) {
    display: block;
  }
`
const Layout = styled.div`
  margin-right: 80px;
  @media (max-width: 700px) {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #EBEBEB;
  }
`

const StoreOverview = ({ match: { params } }) => {
  const [ activeTab, setActiveTab ] = useState('Items Ordered');

  const { loading, data } = useQuery(Tags.Ship.Queries.getStoreShips, {
    variables: {
      storeName: params.storeName,
      shipId: params.shipId,
      limit: 5,
      page: 1
    }
  });

  const getTotal = (items) => {
    let total = 0;
    items.map(item => {
      total += item.subTotal
    });
    return total;
  }

  if (loading) {
    return (
      <div>
        <Common.Headers.Page>
          <SkeletonTheme color="#e2e2e2" highlightColor="#e8e8e8">
            <Skeleton width={100} />
          </SkeletonTheme>
        </Common.Headers.Page>
        <h2>
          <SkeletonTheme color="#e2e2e2" highlightColor="#e8e8e8">
            <Skeleton width={200} />
          </SkeletonTheme>
        </h2>
        <p>
          <SkeletonTheme color="#e2e2e2" highlightColor="#e8e8e8">
            <Skeleton width={130} />
          </SkeletonTheme>
        </p>
        <SkeletonTheme color="#e2e2e2" highlightColor="#e8e8e8">
          <Skeleton height={30} width={100} />
        </SkeletonTheme>

        <br />

        <Tabs.Layout>
          {
            pages.map((page, index) => (
              <Tabs.Link
                key={index}
                active={activeTab}
                current={page}
                to='#'
                onClick={() => setActiveTab(page)}
              >
                <Tabs.Label active={activeTab} current={page}>{page}</Tabs.Label>
              </Tabs.Link>
            ))
          }
        </Tabs.Layout>

        <Forms.Container style={{ maxWidth: '100%' }}>
          {
            (activeTab == 'Items Ordered') ? (
              <Skeleton height={50} />
            ) : (activeTab == 'Shipping Address') ? (
              <Skeleton height={50} />
            ) : null
          }
        </Forms.Container>
      </div>
    )
  } else {
    const { getStoreShips } = data;
    if (getStoreShips.purchases.length <= 0) {
      return null
    } else {
      let ship = getStoreShips.purchases[0];
      return (
        <div>
          <Common.Wrappers.Content>
            <Common.Headers.Page>Overview</Common.Headers.Page>
            <h2>Order # {ship.ship.orderId}</h2>
            <p>Order Date: {ship.ship.timeStamp}</p>
            <Badges.Status
              style={{ maxWidth: '80px', width: '80px' }}
              status={ship.ship.cancelled ? null : ship.ship.paid}
            >{ ship.ship.cancelled ? 'CANCELLED' : ship.ship.paid ? 'PAID' : 'PENDING' }</Badges.Status>

            <br />

            <Tabs.Layout>
              {
                pages.map((page, index) => (
                  <Tabs.Link
                    key={index}
                    active={activeTab}
                    current={page}
                    to='#'
                    onClick={() => setActiveTab(page)}
                  >
                    <Tabs.Label active={activeTab} current={page}>{page}</Tabs.Label>
                  </Tabs.Link>
                ))
              }
            </Tabs.Layout>

            <Forms.Container style={{ maxWidth: '100%' }}>
              {
                (activeTab == 'Items Ordered') ? (
                  <ProductList edit={false} ship={ship} />
                ) : (activeTab == 'Shipping Address') ? (
                  <Wrapper>
                    <Layout>
                      <Header>Shipping Address</Header>
                      <Item>{ship.ship.address}</Item>
                      <Item>{ship.ship.building}</Item>
                      <Item>{ship.ship.phone}</Item>
                    </Layout>

                    <Layout>
                      <Header>Instructions</Header>
                      <Item>{ship.ship.instructions ? ship.ship.instructions : 'No instructions provided'}</Item>
                    </Layout>

                    <Layout>
                      <Header>Payment</Header>
                      <Item>{ship.ship.paymentMethod.toUpperCase()}</Item>
                    </Layout>
                  </Wrapper>
                ) : null
              }
            </Forms.Container>

            <br />
            <div style={{ float: 'right' }}>
              <div style={{ display: 'flex' }}>
                <h3 style={{ marginRight: 10, marginBottom: 0 }}>AMT: </h3>
                <h3 style={{ marginBottom: 0 }}>
                  Rs {formatNumber(getTotal(ship.items) + (ship.delivery ? ship.deliveryFee : 0))}
                </h3>
              </div>
              <p style={{ color: 'green', marginTop: 5, float: 'right' }}>
                { ship.ship.delivery ? 'Incl. Tax and Delivery' : 'Incl. Tax' } 
              </p>
            </div>
          </Common.Wrappers.Content>
        </div>
      )
    }
  }
}

export default withRouter(StoreOverview);

