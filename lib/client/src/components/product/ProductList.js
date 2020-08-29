import React, { useEffect, useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Styles } from '../../styles';
import { Tags } from '../../tags';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ProductItem from '../../components/ProductItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom'
import PageLoader from '../../components/loaders/PageLoader';
import { categories } from '../../shared/categories';
import styled from 'styled-components';
const { Common, Animations, Product } = Styles;

const Container = styled.div`
  display: block;
  @media (min-width: 890px) {
    display: none;
  }
`

const ProductList = ({ match: { params } }) => {
  const [ products, setProducts ] = useState([]);
  const [ limit, setLimit ] = useState(12);
  const [ page, setPage ] = useState(1);
  const [ len, setLen ] = useState(0);
  const [ filter, setFilter ] = useState(1);

  const { loading, data } = useQuery(Tags.Product.Queries.getProductByCategory, {
    variables: {
      category: params.cat ? params.cat == 'Popular' ? null : params.cat : null,
      limit,
      page,
      filter: parseInt(filter)
    }
  });

  const fetchProducts = async () => {
    setLimit(limit + 2);
  };

  useEffect(() => {
    if (!loading) {
      const { products, len } = data.getProductByCategory;
      setProducts(products)
      setLen(len)
    }
  }, [ data ]);

  if (loading) {
    return <PageLoader />
  } else {
    if (!products || (products && products.length <= 0)) {
      return (
        <div>
          <Common.Description>No products in this category</Common.Description>
          <Common.Buttons.Default onClick={() => location.assign('/')}>Return Home</Common.Buttons.Default>
          <Container>
            <br />
            <br />
            <Common.Headers.Identifier style={{ display: 'block' }}>Other Categories</Common.Headers.Identifier>
            <ul style={{ margin: 0, padding: '0px 15px' }}>
              {
                categories.map((cat) => (
                  <li key={cat.id} style={{ marginBottom: 10 }}>
                    <Common.Links.Normal to={{ pathname: `/category/${cat.name}` }}>{cat.name}</Common.Links.Normal>
                  </li>
                ))
              }
            </ul>
          </Container>
        </div>
      )
    } else {
      return(
        <Fragment>
          <div style={{ display: 'flex', padding: 10 }}>
            <span style={{ margin: 'auto 0', marginRight: 10, fontSize: 13 }}>Sort by: </span>
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value={1}>Featured</option>
              <option value={2}>Price: Low-High</option>
              <option value={3}>Price: High-Low</option>
            </select>
          </div>

          <InfiniteScroll
            dataLength={products.length}
            next={fetchProducts}
            hasMore={!(products.length == len)}
            loader={
              <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
                <ReactLoading type="spinningBubbles" color="#474747" height="36px" width="36px" />
              </div>
            }
          >
            <Product.Wrapper>
              {products.map(product => (
                <ProductItem
                  key={product.id}
                  conditions={true ? 'default' : 'default'}
                  product={product}
                />
              ))}
            </Product.Wrapper>
          </InfiniteScroll>
        </Fragment>
      )
    }
  }
}

export default withRouter(ProductList);
