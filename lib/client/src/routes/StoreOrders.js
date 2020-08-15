import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { Tags } from '../tags';
import { Styles } from '../styles';
import StoreOrderList from '../containers/ships/StoreOrderList';
import DatePicker from '../containers/DatePicker';
import { dates } from '../shared/date';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Skeleton from 'react-loading-skeleton';
import Orders from '../containers/numbers/Orders';
import { storeInfo } from '../utils/verifyUser';
import Modal from '../containers/AppModal';
import { isAuthenticated } from '../utils/verifyUser';
import { loadImage } from '../utils/imageFormatter';
import styled from 'styled-components';

const { Common, Table } = Styles;

const Wrapper = styled.div`
  display: flex;
  margin: 2px 0px;
  padding: 8px 8px;
  cursor: pointer;
  &:first-child {
    margin-top: 0;
  };
  &:last-child {
    margin-bottom: 0;
  };
  &:hover {
    background: #F2F2F3;
    border-radius: 4px;
  };
`

const StoreOrders = ({ match: { params } }) => {
  const [ format, setFormat ] = useState(null);
  const [ received, setReceived ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ openModal, setOpenModal ] = useState(false);
  const [ limit, setLimit ] = useState(5);

  const { loading, data } = useQuery(Tags.Ship.Queries.getStoreShips, {
    variables: {
      storeName: params.name,
      shipId: null,
      received: received == 'true' ? true : false,
      format,
      limit,
      page
    }
  });

  const outsideClick = useRef();

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, []);

  const handleClickOutside = event => {
    if (outsideClick.current && !outsideClick.current.contains(event.target)) {
      setOpenModal(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Common.Headers.Page style={{ marginRight: 10 }}>{storeInfo(params.name).companyName}</Common.Headers.Page>
        {
          ((isAuthenticated().stores) && (isAuthenticated().stores.length > 1)) && (
            <div style={{ position: 'relative' }}>
              <Common.Paragraphs.Switch
                onClick={() => setOpenModal(!openModal)}
              >
                Switch Store
              </Common.Paragraphs.Switch>
              <Common.Containers.Dropdown ref={outsideClick} className={openModal ? 'fadeIn' : 'fadeOut'}>
                {
                  isAuthenticated().stores.map(store => {
                    if (store.username !== params.name) {
                      return (
                        <Wrapper onClick={() => (location.assign(`/store/${store.username}/orders`), setOpenModal(false))}>
                          <Common.Assets.LogoSM src={loadImage(store.username, 'logo', true, false)} />
                          <p style={{ margin: 'auto 0', fontSize: 13, whiteSpace: 'nowrap', marginLeft: 5, fontWeight: 600, color: "#333333" }}>
                            {store.companyName}
                          </p>
                        </Wrapper>
                      )
                    }
                  })
                }
              </Common.Containers.Dropdown>
            </div>
          )
        }
      </div>

      <Orders />
      <br />

      <Common.Presentation>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <span style={{ margin: 'auto 0', marginRight: 10, fontSize: 13 }}>Sort by: </span>
          <select value={received} onChange={e => setReceived(e.target.value)}>
            <option value={true}>Received</option>
            <option value={false}>Not Received</option>
          </select>
          <DatePicker format={format} setFormat={setFormat} />
        </div>

        <div style={{ overflow: 'auto' }}>
          <Table.Layout>
            <tbody>
              <Table.Wrapper>
                <Table.Header>Order Id</Table.Header>
                <Table.Header>Products</Table.Header>
                <Table.Header>Amount</Table.Header>
                <Table.Header>Payment</Table.Header>
                <Table.Header>Status</Table.Header>
              </Table.Wrapper>
              {
                loading ? (
                  <Table.Wrapper>
                    <Table.Item style={{ padding: 15 }}>Loading</Table.Item>
                    <Table.Item></Table.Item>
                    <Table.Item></Table.Item>
                    <Table.Item></Table.Item>
                    <Table.Item></Table.Item>
                  </Table.Wrapper>
                ) : data.getStoreShips.purchases.length == 0 ? (
                  <Common.Description style={{ padding: 10 }}>You don't have any orders yet</Common.Description>
                ) : data.getStoreShips.purchases.map(ship => (
                  <StoreOrderList ship={ship} />
                ))
              }
            </tbody>
          </Table.Layout>
        </div>

        {
          loading ? null : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', margin: 'auto 0' }}>
                <Common.Buttons.Default
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  style={{ padding: '0px 10px', height: '30px', marginRight: 8 }}
                >
                  <Common.Icons.Default style={{ padding: 0, paddingRight: 10 }} icon={faChevronLeft} />Prev
                </Common.Buttons.Default>

                <Common.Buttons.Default
                  disabled={data.getStoreShips.purchases.length < limit}
                  onClick={() => setPage(page + 1)}
                  style={{ padding: '0px 10px', height: '30px' }}
                >
                  Next<Common.Icons.Default style={{ padding: 0, paddingLeft: 10 }} icon={faChevronRight} />
                </Common.Buttons.Default>
              </div>
              <p style={{ float: 'right', fontSize: 14, color: '#333333' }}>
                Showing {data.getStoreShips.purchases.length} out of {data.getStoreShips.len} results
              </p>
            </div>
          )
        }
      </Common.Presentation>
    </div>
  )
}

export default withRouter(StoreOrders);
