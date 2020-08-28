import React, { useEffect, useState, Fragment } from 'react';
import StorePageSideBar from '../containers/StorePageSideBar';
import { isAuthenticated } from '../utils/verifyUser';
import { useQuery } from '@apollo/react-hooks';
import { Tags } from '../tags';
import InfoToolbar from '../components/store/InfoToolbar';
import ProductItem from '../components/ProductItem';
import StorePageContent from './StorePageContent';
import ResponsiveStorePageSidebar from '../containers/ResponsiveStorePageSidebar';
import StoreNav from '../containers/navigations/StoreNav';
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Route, withRouter } from 'react-router-dom';
import { Styles } from '../styles';
import { Query } from 'react-apollo';
import PageLoader from '../components/loaders/PageLoader';
import ScrollToTopRoute from '../ScrollToTopRoute';

const { Common, Stores, Animations, Product: Prod } = Styles;
const { Merchant, Product } = Tags;

const otherPages = [ 'pages', 'settings', 'products' ]

const StorePage = ({ match: { params: { name, tab }, url, path }, history }) => {
  const [ page, setPage ] = useState(1);

  const { loading, data } = useQuery(Merchant.Queries.findCurrentMerchant, {
    variables: { username: name }
  });

  const [ activeTab, setActiveTab ] = useState(null);

  // useEffect(() => {
  //   if (isAuthenticated().ok && (isAuthenticated().stores[0].username == name)) {
  //     history.push(`${url}/orders`)
  //   } else {
  //     history.push(`${url}/Latest`)
  //     setActiveTab('Latest')
  //   }
  // }, [ data ])

  useEffect(() => {
    if (isAuthenticated().ok && (isAuthenticated().stores[0].username == name)) {
      history.push(`${url}/orders`)
    }
  }, [ data ])

  const checkOwner = (stores) => {
    return stores.map(s => s.username).indexOf(name)
  }
  
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollToTopRoute />
      {
        isAuthenticated().ok ? (
          <Common.Wrappers.Page>
            <Stores.Content.Wrappers.Content style={{ maxWidth: '100%', overflow: 'none' }}>
              {
                (isAuthenticated().ok && (isAuthenticated().stores[0].username == name)) && (
                  <StorePageSideBar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                )
              }

              <Stores.Content.Containers.Content
                className={ isAuthenticated().ok && (isAuthenticated().stores[0].username == name) ? 'authed' : 'unauthed' }
                style={{ width: '100%', border: 0 }}
              >
                <Animations.FadeIn>
                  <Route
                    path={`${path}/:tab`}
                    render={props => <StorePageContent data={data} loading={loading} props={props} setActiveTab={setActiveTab} />}
                  />
                </Animations.FadeIn>
              </Stores.Content.Containers.Content>
            </Stores.Content.Wrappers.Content>
          </Common.Wrappers.Page>
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
                variables={{
                  storeName: name,
                  page: tab == 'All' ? null : tab,
                  filter: null,
                  limit: 12,
                  tab: page
                }}
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
                            <Prod.Wrapper>
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
                            </Prod.Wrapper>


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

export default withRouter(StorePage);
