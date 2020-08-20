import React, { useState, useEffect, Fragment } from 'react';
import { Styles } from '../../styles';
import { isAuthenticated } from '../../utils/verifyUser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tags } from '../../tags';
import { loadImage } from '../../utils/imageFormatter';
import OrderItem from '../../containers/ships/OrderItem';
import { formatNumber } from '../../utils/productItemFormatter';
import styled from 'styled-components';
import { faTrashAlt, faCheck, faChevronRight, faChevronLeft  } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading'
import { withRouter } from 'react-router-dom';
import DatePicker from '../../containers/DatePicker';
import ScrollToTopRoute from '../../ScrollToTopRoute';

const { Common, Order } = Styles;
const { Layouts, Buttons } = Order;

const Layout = styled.div`
  background: #F5F5F8;
  padding: 10px 20px;
  border-top: 1px solid #DDDDDD;
`
const Wrapper = styled.div`
  @media (max-width: 530px) {
    display: none;
  }
`
const Res = styled.div`
  display: none;
  @media (max-width: 530px) {
    display: block;
    &:first-child {
      margin-right: 15px;
    }
  }
`
const ResLayout = styled.div`
  @media (max-width: 530px) {
    border-top: 1px solid #DDDDDD;
    padding-top: 15px;
    margin-top: 20px;
    display: flex;
  }
`

const Imcomplete = ({ history }) => {
  const [ format, setFormat ] = useState(null);
  const [ paid, setPaid ] = useState(null);
  const [ limit, setLimit ] = useState(5);
  const [ page, setPage ] = useState(1);
  const [ deleteLoading, setDeleteLoading ] = useState(false);

  const [ deleteShip ] = useMutation(Tags.Ship.Mutations.deleteShip);

  const { loading, data } = useQuery(Tags.Ship.Queries.getUserShips, {
    variables: {
      email: isAuthenticated().email,
      paid: false,
      format,
      limit,
      page,
      valid: false
    } 
  });

  useEffect(() => {
    if (!isAuthenticated().ok) {
      history.push('/user/auth/login');
      setTimeout(() => {
        alert('Please login first')
      })
    }
  }, [ data ])

  return (
    <div>
      <ScrollToTopRoute />

      <Common.Headers.Page>Incomplete Orders</Common.Headers.Page>
      <Common.Presentation>
        {
          !loading && (
            <Common.Description>
              You have {data.getUserShips.len} incomplete order(s) awaiting actions.
              Click on complete order to finish your shopping or delete if you do not
              want it anymore.
            </Common.Description>
          )
        }

        <div style={{ display: 'flex', marginBottom: 10 }}>
          <span style={{ margin: 'auto 0', marginRight: 0, fontSize: 13 }}>Select Date:</span>
          <DatePicker format={format} setFormat={setFormat} />
        </div>

        {
          loading
            ? (
              <p>Loading...</p>
            )
            : (data.getUserShips.ships == null || data.getUserShips.ships.length <= 0)
              ? (
                <Common.Description>
                  You do not have any incomplete orders yet.
                </Common.Description>
              )
              : data.getUserShips.ships.map((ship, i) => (
                <Layouts.Order key={i}>
                  <Layouts.Header>
                    <p style={{ margin: 0, fontSize: 14 }}>ID: {ship.orderId}</p>
                    <Common.Links.Normal style={{ margin: 'auto 0', fontSize: 14 }} to='/'>Complete Order</Common.Links.Normal>
                  </Layouts.Header>

                  <Layouts.Content>
                    {
                      ship.purchases.map((purchase, i) => (
                        <OrderItem key={i} ship={purchase} />
                      ))
                    }

                    <ResLayout>
                      <Res>
                        <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)', margin: 0 }}>Order Date</p>
                        <p style={{ fontSize: 14, margin: 0 }}>{ship.timeStamp}</p>
                      </Res>

                      <Res>
                        <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)', margin: 0 }}>Gross Total</p>
                        <p style={{ fontSize: 14, margin: 0 }}>Rs {formatNumber(ship.grandTotal + ship.grandDelivery)}</p>
                      </Res>
                    </ResLayout>

                    <Wrapper>
                      <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)', margin: 0 }}>Order Date</p>
                      <p style={{ fontSize: 14, margin: 0 }}>{ship.timeStamp}</p>
                    </Wrapper>

                    <Wrapper>
                      <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)', margin: 0 }}>Gross Total</p>
                      <p style={{ fontSize: 14, margin: 0 }}>Rs {formatNumber(ship.grandTotal + ship.grandDelivery)}</p>
                    </Wrapper>
                  </Layouts.Content>

                  <Layout>
                    <Buttons.Delete
                      onClick={async () => {
                        setDeleteLoading(true);
                        const res = await deleteShip({ variables: { id: ship.id } });
                        if (res.data.deleteShip) {
                          setDeleteLoading(false);
                          window.location.reload()
                        }
                      }}
                      style={{ marginRight: 15 }}
                    >
                      {
                        deleteLoading ? 'deleting...' : (
                          <Fragment><Common.Icons.Default icon={faTrashAlt} />Delete Order</Fragment>
                        )
                      }
                    </Buttons.Delete>
                    <Buttons.Continue onClick={() => location.assign(`/shipping?session=${ship.id}`)}>
                      <Common.Icons.Default icon={faCheck} />Complete Order
                    </Buttons.Continue>
                  </Layout>
                </Layouts.Order>
              ))
        }

        {
          loading ? null : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', margin: 'auto 0' }}>
                <Common.Buttons.Default
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  style={{ padding: '0px 10px', height: '30px', marginRight: 8 }}
                >
                  <Common.Icons.Default style={{ padding: 0 }} icon={faChevronLeft} />
                </Common.Buttons.Default>

                <Common.Buttons.Default
                  disabled={data.getUserShips.ships.length < limit}
                  onClick={() => setPage(page + 1)}
                  style={{ padding: '0px 10px', height: '30px' }}
                >
                  <Common.Icons.Default style={{ padding: 0 }} icon={faChevronRight} />
                </Common.Buttons.Default>
              </div>
              <p style={{ float: 'right', fontSize: 14, color: '#333333' }}>
                Showing {data.getUserShips.ships.length} out of {data.getUserShips.len} results
              </p>
            </div>
          )
        }
      </Common.Presentation>
    </div>
  )
}

export default withRouter(Imcomplete);
