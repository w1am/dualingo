import React from 'react';
import { Styles } from '../styles';
import CategorySidebar from '../containers/navigations/CategorySidebar';
import ProductList from '../components/product/ProductList';
import ScrollToTopRoute from '../ScrollToTopRoute';
const { Common, Stores } = Styles;

const ProductView = ({}) => {
  return (
    <div>
      <ScrollToTopRoute />
      <Stores.Content.Wrappers.Content
        className="authed"
        style={{ maxWidth: '100%', overflow: 'none' }}
      >
        <CategorySidebar />
        <Stores.Content.Containers.Content className="authed" style={{ width: '100%' }}>
          <ProductList />
        </Stores.Content.Containers.Content>
      </Stores.Content.Wrappers.Content>
    </div>
  )
}

export default ProductView;
