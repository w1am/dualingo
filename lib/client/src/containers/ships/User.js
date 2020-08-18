import React from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';

const { Common, Ship, Product, Table, Badges } = Styles;
const { Assets } = Product;

const User = ({ ship }) => {
  return (
    <Table.Wrapper>
      <Table.Item>
        <Common.Links.Normal to={{ pathname: `/user/${ship.email}/orders/${ship.id}` }}>{ship.orderId}</Common.Links.Normal>
      </Table.Item>
      <Table.Item>
        {ship.address}<br />
        {ship.building}
      </Table.Item>
      <Table.Item>{ship.timeStamp}</Table.Item>
      <Table.Item>Rs {formatNumber(ship.grandTotal)}</Table.Item>
      <Table.Item>
        <Badges.Status
          status={ship.cancelled ? null : ship.paid}
        >
          { ship.cancelled ? 'CANCELLED' : ship.paid ? 'PAID' : 'PENDING' }
        </Badges.Status>
      </Table.Item>
    </Table.Wrapper>
  )
}

export default User;
