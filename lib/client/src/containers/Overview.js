import React, { useState } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery } from '@apollo/react-hooks';
import { formatNumber } from '../utils/productItemFormatter';
import { loadImage } from '../utils/imageFormatter';
import OrderList from '../containers/ships/OrderList';
import UserSidebar from '../containers/navigations/UserSidebar'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PageLoader from '../components/loaders/PageLoader';
import Modal from '../containers/AppModal';
import { useMutation } from '@apollo/react-hooks';

const { Common, Tabs, Forms, Product, Badges } = Styles;
const { Assets } = Product;

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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`

const Overview = ({ match: { params } }) => {
  const [ activeTab, setActiveTab ] = useState('Items Ordered');
  const [ openModal, setOpenModal ] = useState(false);
  const [ cancelLoading, setCancelLoading ] = useState(false);

  const { loading, data } = useQuery(Tags.Ship.Queries.getCurrentShip, {
    variables: { id: params.overview }
  });
  const [ cancelOrder ] = useMutation(Tags.Ship.Mutations.cancelOrder)

  if (loading) {
    return <PageLoader />
  } else {
    const { getCurrentShip: ship } = data;
    return (
      <div>
        <Modal
          width="450px"
          header="Cancel Order"
          placeholder="Delete"
          isOpen={openModal}
          conditions={() => false}
          loading={cancelLoading}
          style="danger"
          buttonAction={async () => {
            setCancelLoading(true);
            let res = await cancelOrder({ variables: { id: params.overview } });
            if (res.data.cancelOrder) {
              location.assign('/cancel?status=success')
              setCancelLoading(false)
            }
          }}
          modalAction={setOpenModal}
          cancelAction={() => setOpenModal(false)}
          disableClick={true}
        >
          <Common.Description>Are you sure about cancelling this order?</Common.Description>
        </Modal>

        <Common.Wrappers.Content>
          <h2>Order # {ship.orderId}</h2>
          <p>Order Date: {ship.timeStamp}</p>
          <Badges.Status style={{ maxWidth: '80px', width: '80px' }} status={ship.paid}>{ ship.paid ? 'PAID' : 'PENDING' }</Badges.Status>

          <Common.Elements.Divider />

          <Tabs.Layout>
            {
              pages.map((page, index) => (
                <Tabs.Link
                  key={index}
                  active={activeTab}
                  current={page}
                  onClick={() => setActiveTab(page)}
                >
                  <Tabs.Label active={activeTab} current={page}>{page}</Tabs.Label>
                </Tabs.Link>
              ))
            }
          </Tabs.Layout>

          <Forms.Container>
            {
              (activeTab == 'Items Ordered') ? (
                <OrderList total={ship.grandTotal} delivery={ship.grandDelivery} purchases={ship.purchases} />
              ) : (activeTab == 'Shipping Address') ? (
                <Wrapper>
                  <Layout>
                    <Header>Shipping Address</Header>
                    <Item>{ship.address}</Item>
                    <Item>{ship.building}</Item>
                    <Item>{ship.phone}</Item>
                  </Layout>

                  <Layout>
                    <Header>Instructions</Header>
                    <Item>{ship.instructions ? ship.instructions : 'No instructions provided'}</Item>
                  </Layout>

                  <Layout>
                    <Header>Payment</Header>
                    <Item>{ship.paymentMethod.toUpperCase()}</Item>
                  </Layout>
                </Wrapper>
              ) : null
            }
          </Forms.Container>

          <br />

          <Container>
            <div>
              <div style={{ display: 'flex' }}>
                <h3 style={{ marginRight: 10, marginBottom: 0 }}>AMT: </h3>
                <h3 style={{ marginBottom: 0 }}>
                  Rs {formatNumber(ship.grandDelivery + ship.grandTotal)}
                </h3>
              </div>
              <p style={{ color: 'green', marginTop: 5 }}>
                Incl. Tax and Delivery
              </p>
            </div>

            <Common.Links.Normal
              onClick={() => setOpenModal(true)}
              style={{ fontSize: 14, textDecoration: 'underline', color: 'red' }}
            >{ cancelLoading ? 'Cancelling...' : 'Cancel Order' }</Common.Links.Normal>
          </Container>

        </Common.Wrappers.Content>
      </div>

    )
  }
}

export default withRouter(Overview);
