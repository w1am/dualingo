import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import styled from 'styled-components';
const { Common, Table, Product, Badges } = Styles;
const { Assets } = Product;

const Price = styled.span`
  display: block;
  white-space: nowrap;
`

const StoreOrderList = ({ ship }) => {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    let x = [...ship.items];
    setItems(x.splice(0, 2));
  }, []);

  return (
    <Table.Wrapper>
      <Table.Item>
        <Common.Links.Normal to={{ pathname: `/store/orders/${ship.storeName}/${ship.ship.id}` }}>{ship.ship.orderId}</Common.Links.Normal>
      </Table.Item>
      <Table.Item>
        <div style={{ display: 'flex', margin: 5 }}>
          {
            ship.items.length >= 3 ? (
              <span style={{display: 'flex', width: '80px'}}>
                {
                  items.map((item, i) => <Common.Assets.Order key={i} src={
                    loadImage(
                      ship.storeName,
                      item.fileUrl,
                      false,
                      false,
                      item.session
                    )
                    } /> )
                }
                <Common.Assets.More>+{ship.items.slice(2, ship.items.length).length}</Common.Assets.More>
              </span>
            ) : (
              ship.items.map((item, i) => <Common.Assets.Order key={i} src={
                loadImage(ship.storeName, item.fileUrl, false, false, item.session)
                } /> )
            )
          }
        </div>
      </Table.Item>
      <Table.Item><Price>Rs {formatNumber(ship.ship.grandTotal + ship.ship.grandDelivery)}</Price></Table.Item>
      <Table.Item>{ship.delivery ? 'DELIVERY' : 'PICKUP'}</Table.Item>
      <Table.Item style={{ width: '100px' }}>
        <Badges.Status
          status={ship.ship.cancelled ? null : ship.ship.paid}
        >
          { ship.ship.cancelled ? 'CANCELLED' : ship.ship.paid ? 'PAID' : 'PENDING' }
        </Badges.Status>
      </Table.Item>
    </Table.Wrapper>
  )
}

export default StoreOrderList;
