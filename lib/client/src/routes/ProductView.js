import React, { useRef } from 'react';
import { Styles } from '../styles';
import CategorySidebar from '../containers/navigations/CategorySidebar';
import ProductList from '../components/product/ProductList';
import ScrollToTopRoute from '../ScrollToTopRoute';
const { Common, Stores } = Styles;

const ProductView = ({}) => {

  const sidebarRef = useRef(null)

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50)   

  return (
    <Common.Wrappers.Page>
      <ScrollToTopRoute />
      <Stores.Content.Wrappers.Content 
        className="authed"
        ref={sidebarRef}
        style={{ maxWidth: '100%', overflow: 'none' }}
      >
        <CategorySidebar type="category" scrollToRef={scrollToRef} sidebarRef={sidebarRef} />
        <Stores.Content.Containers.Content className="authed" style={{ width: '100%', border: 0 }}>
          <ProductList />
        </Stores.Content.Containers.Content>
      </Stores.Content.Wrappers.Content>
    </Common.Wrappers.Page>
  )
}

export default ProductView;
