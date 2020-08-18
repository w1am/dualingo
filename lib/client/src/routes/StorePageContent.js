import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import ProductItem from '../components/ProductItem';
import Settings from '../routes/Settings';
import Pages from '../routes/Pages';
import StoreProducts from '../routes/StoreProducts';
import StoreOrders from '../routes/StoreOrders';
// import StoreCoupons from '../routes/StoreCoupons';
import StoreFeatures from '../routes/StoreFeatures';
import PageLoader from '../components/loaders/PageLoader';
import { Query } from 'react-apollo';
import { Tags } from '../tags';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import StoreNav from '../containers/navigations/StoreNav';
import { isAuthenticated } from '../utils/verifyUser';

const { Common, Product, Stores, Animations } = Styles;

const StorePageContent = ({ props: { match: { params: { tab, name }} }, setActiveTab, data, loading }) => {
  const [ page, setPage ] = useState(1);

  const checkOwner = (stores) => {
    return stores.map(s => s.username).indexOf(name)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {
        tab == 'settings' ? (
          <Stores.Content.Wrappers.Page>
            <Common.Headers.Page>Settings</Common.Headers.Page>
            <Common.Presentation>
              <Settings />
            </Common.Presentation>
          </Stores.Content.Wrappers.Page>
        ) : tab == 'pages' ? (
          <Stores.Content.Wrappers.Page>
            <Pages />
          </Stores.Content.Wrappers.Page>
        ) : tab == 'products' ? (
          <Stores.Content.Wrappers.Page>
            <Common.Headers.Page>Store Products</Common.Headers.Page>
            <Common.Presentation>
              <StoreProducts />
            </Common.Presentation>
          </Stores.Content.Wrappers.Page>
        ) : tab == 'orders' ? (
          <Stores.Content.Wrappers.Page>
            <StoreOrders />
          </Stores.Content.Wrappers.Page>
        ) : tab == 'features' ? (
          <Stores.Content.Wrappers.Page>
            <StoreFeatures />
          </Stores.Content.Wrappers.Page>
        // ) : tab == 'coupons' ? (
        //   <Stores.Content.Wrappers.Page>
        //     <StoreCoupons />
        //   </Stores.Content.Wrappers.Page>
        ) : (
          <div>
            <StoreNav
              setActiveTab={setActiveTab}
              loading={loading}
              data={data}
            />
            <Animations.FadeIn>
              <Query
                query={Tags.Product.Queries.storeProducts}
                variables={{ storeName: name, page: tab == 'All' ? null : tab, filter: null, limit: 12, tab: page }}
              >
                {
                  ({ loading, data }) => {
                    if (loading) return <PageLoader />
                    const { storeProducts } = data;
                    if (storeProducts == null) {
                      return (
                        <div style={{ padding: '0px 25px' }}>
                          <Common.Description>This page does not exist</Common.Description>
                        </div>
                      )
                    } else {
                      if (!storeProducts.products || storeProducts.products.length <= 0) {
                        return <p style={{ padding: '20px', margin: 0 }}>No products</p>
                      } else {
                        return (
                          <div>
                            <Product.Wrapper>
                              {
                                storeProducts.products.map(product => (
                                  <ProductItem
                                    conditions={
                                      (isAuthenticated().ok && (checkOwner(isAuthenticated().stores) > -1))
                                        ? 'default'
                                        : 'responsive'
                                    }
                                    key={product.id}
                                    product={product}
                                  />
                                ))
                              }
                            </Product.Wrapper>


                            <p style={{ fontSize: 14, color: '#333333', padding: '0px 20px', textAlign: 'center' }}>
                              Showing {storeProducts.products.length} out of {storeProducts.len} results
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
                              <Common.Buttons.Default
                                style={{ marginRight: 10 }}
                                to='#'
                                onClick={() => setPage(page - 1)}
                                disabled={page <= 1}
                              >
                                Prev
                              </Common.Buttons.Default>

                              <Common.Buttons.Default
                                style={{ marginLeft: 10 }}
                                to='#'
                                onClick={() => setPage(page + 1)}
                                disabled={storeProducts.products.length <= storeProducts.len}
                              >
                                Next
                              </Common.Buttons.Default>
                            </div>
                          </div>
                        )
                      }
                    }
                  }
                }
              </Query>
            </Animations.FadeIn>
          </div>
        )
      }
    </div>
  )
}

export default StorePageContent;
