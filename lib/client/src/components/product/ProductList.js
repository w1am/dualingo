import React, { useEffect, useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Styles } from '../../styles';
import { Tags } from '../../tags';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ProductItem from '../../components/ProductItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom'
const { Common, Animations, Product } = Styles;

const ProductList = ({ match: { params } }) => {
  const [ products, setProducts ] = useState([]);
  const [ limit, setLimit ] = useState(12);
  const [ page, setPage ] = useState(1);
  const [ len, setLen ] = useState(0);

  const { loading, data } = useQuery(Tags.Product.Queries.getProductByCategory, {
    variables: {
      category: params.cat ? params.cat == 'Popular' ? null : params.cat : null,
      limit,
      page
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

  if (!products || (products && products.length <= 0)) {
    return <Common.Description style={{ padding: '0px 20px' }}>No products in this category</Common.Description>
  } else {
    return(
      <Fragment>
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

export default withRouter(ProductList);
