import React from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import { faLocationArrow, faBuilding } from "@fortawesome/free-solid-svg-icons";

const { Common, Ship, Product, Table, Badges, Order } = Styles;
const { Assets } = Product;
const { Responsives } = Order;
const { Containers } = Responsives;

const ResUser = ({ ship }) => {
  return (
    <Containers.Order style={{ marginBottom: 10 }} to={{ pathname: `/user/${ship.email}/orders/${ship.id}` }}>
      <div 
        style={{
          background: '#F8F8F8',
          padding: 10,
          borderBottom: '1px solid #DDDDDD',
          color: '#333333',
          fontWeight: 600,
          fontSize: 14
        }}
      >
        to: {ship.customer}
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <Common.Icons.Default style={{ fontSize: 14, color: '#5e5e5e' }} icon={faLocationArrow} />
          <p style={{ color: '#5e5e5e', margin: 0, fontSize: 14 }}>{ship.address}</p>
        </div>
        <div style={{ display: 'flex' }}>
          <Common.Icons.Default style={{ fontSize: 14, color: '#5e5e5e' }} icon={faBuilding} />
          <p style={{ color: '#5e5e5e', margin: 0, fontSize: 14 }}>{ship.building}</p>
        </div>
        <br />

        <h3>Rs {formatNumber(ship.grandTotal)}</h3>
        <p style={{ color: ship.paid ? '#6565FF' : '#F1702E', fontWeight: 600, margin: 0, marginTop: 10 }}>
          {ship.paid ? 'PAID' : 'PENDING'}
        </p>
        <p style={{ margin: 0, fontSize: 13, marginTop: 15 }}>{ship.timeStamp}</p>
      </div>
    </Containers.Order>
  )
}

export default ResUser;
