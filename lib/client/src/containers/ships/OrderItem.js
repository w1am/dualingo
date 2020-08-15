import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import styled from 'styled-components';
const { Common, Table, Product } = Styles;
const { Assets } = Product;

const OrderItem = ({ ship }) => {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    let x = [...ship.items];
    setItems(x.splice(0, 2));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {
        ship.items.length >= 3 ? (
          <span style={{display: 'flex', width: '80px'}}>
            {
              items.map(item => <Common.Assets.Order src={
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
          ship.items.map(item => <Common.Assets.Order src={
            loadImage(ship.storeName, item.fileUrl, false, false, item.session)
            } /> )
        )
      }
    </div>
  )
}

export default OrderItem;
