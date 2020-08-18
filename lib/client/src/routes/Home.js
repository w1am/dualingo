import React, { useState } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import ProductItem from '../components/ProductItem';
import { loadImage } from '../utils/imageFormatter';
import CategorySidebar from '../containers/navigations/CategorySidebar';
import Trends from '../containers/product/Trends';
import DisplayStores from '../containers/store/Stores';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FilterBar from '../containers/navigations/FilterBar';
import ProductList from '../components/product/ProductList';
const { Common, Product, Animations, Stores, Banners } = Styles;

const Home = ({ match: { params } }) => {
  const [ limit, setLimit ] = useState(12);
  const [ page, setPage ] = useState(1);
  return (
    <div style={{ minHeight: '100vh' }}>
      <Trends />
      <DisplayStores />

      <Stores.Content.Wrappers.Content
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

export default Home; 
