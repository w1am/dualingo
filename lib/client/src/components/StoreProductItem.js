import React from 'react';
import { Styles } from '../styles';
import { loadImage } from '../utils/imageFormatter';
import styled from 'styled-components';

const { Common, Table, Product, Animations } = Styles;
const { Assets } = Product;

const Date = styled.span`
  display: block;
  white-space: nowrap;
`

const StoreProductItem = ({ product, selectedObj, updateCheck, name }) => {
  const getStock = (options) => {
    let total = 0;
    options.map(option => {
      total += option.quantity
    });
    return total;
  }

  return (
    <Table.Order.Wrapper checked={selectedObj[product.id]}>
      <Table.Item
        style={{ width: 20, paddingRight: 0 }}
        onClick={() => {
          updateCheck(product);
        }}
      >
        <Animations.FadeIn>
          <Common.Form.Check.Input checked={selectedObj[product.id]} />
        </Animations.FadeIn>
      </Table.Item>
      <Table.Item style={{ width: 20 }}>
        <Assets.Display src={loadImage(product.store.username, '600-main-0', false, false, product.session)} />
      </Table.Item>
      <Table.Item>
        {
          (product.options && product.options.length >= 1) ? (
            <div style={{ padding: '8px 0px' }}>
              <p style={{ margin: 0 }}>
                {getStock(product.options)} left
              </p>
              <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.5)' }}>
                {product.options.length} options
              </p>
            </div>
          ) : (
            <div style={{ padding: '8px 0px' }}>
              {product.quantity} left
            </div>
          ) 
        }
      </Table.Item>
      <Table.Item>
        {
          product.categories.map((cat, index) => (
            <p key={index} style={{ display: 'block', fontSize: 13, margin: 0 }}>{cat}</p>
          ))
        }
      </Table.Item>
      <Table.Item><Date>{product.timeStamp}</Date></Table.Item>
      {/* <Table.Item> */}
      {/*   <Common.Buttons.Default */}
      {/*     style={{ margin: 10 }} */}
      {/*     onClick={() => location.assign(`/merchant/dashboard/upload/${name}?id=${product.id}&session=${product.session}&editState=true`)} */}
      {/*   > */}
      {/*     Edit */}
      {/*   </Common.Buttons.Default> */}
      {/* </Table.Item> */}
    </Table.Order.Wrapper>
  )
}

export default StoreProductItem;
