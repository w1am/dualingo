import React, { useState, useRef } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import ProductItem from '../components/ProductItem';
import { loadImage } from '../utils/imageFormatter';
import CategorySidebar from '../containers/navigations/CategorySidebar';
import Trends from '../containers/product/Trends';
import Views from '../containers/product/Views';
import DisplayStores from '../containers/store/Stores';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FilterBar from '../containers/navigations/FilterBar';
import ProductList from '../components/product/ProductList';
const { Common, Product, Animations, Stores, Banners } = Styles;

const Home = ({ match: { params } }) => {
  const [ limit, setLimit ] = useState(12);
  const [ page, setPage ] = useState(1);

  const sidebarRef = useRef(null)

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50)   

  return (
    <div style={{ minHeight: '100vh' }}>
      <Common.Wrappers.Page>
        <Trends />
        <Views />
        <DisplayStores />

        <Stores.Content.Wrappers.Content ref={sidebarRef} style={{ maxWidth: '100%', overflow: 'none' }}>
          <CategorySidebar type="feed" scrollToRef={scrollToRef} sidebarRef={sidebarRef} />
          <Stores.Content.Containers.Content
            className="authed"
            style={{ width: '100%', background: 'white', borderRadius: 5 }}
          >
            <ProductList />
          </Stores.Content.Containers.Content>
        </Stores.Content.Wrappers.Content>
      </Common.Wrappers.Page>
    </div>
  )
}

export default Home; 
