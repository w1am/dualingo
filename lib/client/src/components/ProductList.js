import React from 'react';
import { Styles } from '../styles';
import ProductListItem from '../components/product/ProductListItem';

const { Table } = Styles;

const ProductList = ({ ship, edit }) => {
  return (
    <div style={{ overflow: 'scroll' }}>
      <Table.Layout>
        <tbody>
          <Table.Wrapper>
            <Table.Header>Product</Table.Header>
            {
              edit && <Table.Header>Rating</Table.Header>
            } 
            <Table.Header>Price</Table.Header>
          </Table.Wrapper>
        </tbody>

        { ship.items.map(item => <ProductListItem edit={edit} ship={ship} item={item} />) }
      </Table.Layout>
    </div>
  )
}

export default ProductList;
