import React from 'react';
import { Styles } from '../../styles';
import { formatNumber } from '../../utils/productItemFormatter';
import { loadImage } from '../../utils/imageFormatter';
import ProductList from '../../components/ProductList';
import styled from 'styled-components';

const { Common, Tabs, Forms, Product } = Styles;
const { Assets } = Product;

const Layout = styled.div`
  margin-top: 15px;
  &:first-child {
    margin-top: 0px;
  }
`

const OrderList = ({ purchases, edit }) => {
  const findGrossTotal = (items) => {
    let sum = 0;
    items.map(item => sum += item.subTotal);
    return sum
  }

  return (
    <div style={{ overflow: 'scroll', width: '100%' }}>
      {
        purchases.map((purchase, index) => (
          <Layout key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', margin: 'auto 20px' }}>
                <Common.Assets.LogoSM src={loadImage(purchase.storeName, 'logo', true, false)} />
                <p style={{ margin: 'auto 0', fontSize: 14, fontWeight: 700, marginLeft: 10 }}>{purchase.name}</p>
              </div>

              <p style={{ margin: 'auto 20px' }}>
                {
                  purchase.delivery ? 'Delivery' : <Common.Links.Normal to='/'>Pickup Location</Common.Links.Normal>
                }
              </p>
            </div>
            <Common.Elements.Divider />
            <ProductList
              edit={edit !== null ? edit : true}
              ship={purchase}
            />
          </Layout>
        ))
      }
    </div>
  )
}

export default OrderList;
