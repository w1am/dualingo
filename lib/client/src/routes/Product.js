import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Styles } from '../styles';
import { isAuthenticated } from '../utils/verifyUser';
import { Tags } from '../tags';
import { useQuery } from '@apollo/react-hooks';
import Main from '../containers/product/Main';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { getCookie, generateKeyword } from '../utils/cookies';
import { Query, useMutation } from 'react-apollo';
import Trends from '../containers/product/Trends';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OtherList from '../components/OtherList';
import cookie from 'react-cookies';
import WishList from '../containers/product/WishList';
import ReactHtmlParser from 'react-html-parser';
import ScrollToTopRoute from '../ScrollToTopRoute';
import { withRouter } from 'react-router-dom';

const { Common, Product: Prod, Animations, Tabs, Forms } = Styles;
const { Product: { Queries, Mutations } } = Tags;
const { CurrProduct: { Information, Price, PreviousPrice, Option, Headers } } = Prod;

const pages = [
  'Description',
  'Store Information'
]

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`

const Wrapper = styled.div`
  max-width: 395px;
  min-width: 395px;
  margin: 0 auto;
  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
  }
`

const Layout = styled.div`
  display: flex;
  max-width: 400px;
  @media (max-width: 370px) {
    display: block;
  }
`


const Product = ({ history, location: { search }, match: { params: { id, storeName } } }) => {
  const { loading, data } = useQuery(Queries.getProduct, {
    variables: { id }
  });
  const [ generateTrends ] = useMutation(Mutations.generateTrends);
  const [ incViews ] = useMutation(Mutations.incViews)
  const [ activeTab, setActiveTab ] = useState('Description');

  const [ items, setItems ] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (data.getProduct == null || data.getProduct == 'null') {
        history.goBack();
      } else {
        generateKeyword(data.getProduct.categories[Math.floor(Math.random() * data.getProduct.categories.length)]);
      }
    };
    incViews({ variables: { id } });

    const wishs = cookie.load('wish');
    if (wishs !== undefined) {
      let temp = [];
      Object.keys(wishs).forEach((item, index) => {
        if (wishs[item] == true) {
          temp.push(item)
        }
      });
      setItems(temp);
    }
  }, [ data ]);

  return (
    <div>
      <ScrollToTopRoute />
      <br />
      <Common.Presentation>
        {
          (loading) ? (
            <Prod.CurrProduct.Container>
              <Wrapper>
                <Skeleton height={395} width={395} />
                <Container>
                  {
                    [...Array(3)].map(p => (
                      <div style={{ marginRight: 10 }}>
                        <Skeleton height={50} width={50} />
                      </div>
                    ))
                  }
                </Container>
              </Wrapper>
              <Prod.CurrProduct.Information.Container>
                <Information.Title><Skeleton width={500} height={30} /></Information.Title>
                <div style={{ margin: '10px 0px' }}>
                  {
                    [...Array(3)].map(cat => (
                      <div style={{ marginRight: '10px', display: 'inline-block' }}>
                        <Skeleton width={80} height={25} />
                      </div>
                    ))
                  }
                </div>
                <PreviousPrice><Skeleton width={100} height={20} /></PreviousPrice>
                <Price style={{ marginTop: 10 }}><Skeleton width={100} height={30} /></Price>
                <br />
                <Skeleton width={100} height={10} />

                <Option.Wrapper>
                  {
                    [...Array(3)].map(x => (
                      <Option.Layout style={{ cursor: 'default', boxShadow: 'inset 0px 0px 0px 0.5px rgba(51, 51, 51, 0.2)' }}>
                        <Skeleton height={30} width={30} />
                        <div style={{ padding: 5, margin: 'auto 0', marginLeft: 5 }}>
                          <Option.Title><Skeleton width={60} /></Option.Title>
                          <Option.Price><Skeleton width={40}/></Option.Price>
                        </div>
                      </Option.Layout>
                    ))
                  }
                </Option.Wrapper>
                <Common.Elements.Divider style={{ marginBottom: 5, borderBottom: '1px solid #EBEBEB' }} />

                <Layout>
                  <div style={{ marginRight: 10, width: '50%', marginTop: 10 }}>
                    <Skeleton height={35} />
                  </div>
                  <div style={{ marginRight: 10, width: '50%', marginTop: 10 }}>
                    <Skeleton height={35} />
                  </div>
                </Layout>


              </Prod.CurrProduct.Information.Container>
            </Prod.CurrProduct.Container>
          ) : (data.getProduct !== null) ? (
            <Animations.FadeIn>
              <Main product={data.getProduct} />
            </Animations.FadeIn>
          ) : null
        }
      </Common.Presentation>

      <br />

      <Tabs.Layout>
        {
          pages.map((page, index) => (
            <Tabs.Link
              key={index}
              active={activeTab}
              current={page}
              onClick={() => setActiveTab(page)}
            >
              <Tabs.Label active={activeTab} current={page}>{page}</Tabs.Label>
            </Tabs.Link>
          ))
        }
      </Tabs.Layout>

      <Forms.Container>
        {
          (activeTab == 'Description') ? (
            <Fragment>
              {
                (!loading && data.getProduct) &&  (
                  <div style={{ overflowY: 'scroll' }}>
                    {
                      data.getProduct.description.length == 0
                        ? (
                          <Common.Description>
                            This merchant has not added any product description yet.
                          </Common.Description>
                        ) : ReactHtmlParser(data.getProduct.description)
                    }
                  </div>
                )
              }
            </Fragment>
          ) : (activeTab == 'Store Information') ? (
            <Fragment>
              {
                (loading && data.getProduct) ? (
                  <div>
                    <div style={{ marginBottom: 10 }}> <Skeleton height={30} width={200} /> </div>
                    <Skeleton height={30} width={200} />
                  </div>
                ) : (
                  <Query query={Tags.Merchant.Queries.findCurrentMerchant} variables={{ username: data.getProduct.storeName }}>
                    {
                      ({ loading, data }) => {
                        if (loading) return null;
                        const { findCurrentMerchant: Merchant } = data;
                        return (
                          <div>
                            {
                              Merchant ? (
                                <div>
                                  <div style={{ display: 'flex', marginBottom: 10 }}>
                                    <Headers.Label style={{ marginRight: 15, fontWeight: 600 }}>Delivery</Headers.Label>
                                    <Headers.Info style={{ margin: 0 }}>{Merchant.delivery ? "Yes" : "No"}</Headers.Info>
                                  </div>

                                  {
                                    Merchant.delivery && (
                                      <div style={{ display: 'flex', margin: '10px 0px'  }}>
                                        <Headers.Label style={{ marginRight: 15, fontWeight: 600 }}>Delivery Fee</Headers.Label>
                                        <Headers.Info style={{ margin: 0 }}>{Merchant.deliveryFee}</Headers.Info>
                                      </div>
                                    )
                                  }

                                  <div style={{ display: 'flex', margin: '10px 0px'  }}>
                                    <Headers.Label style={{ marginRight: 15, fontWeight: 600 }}>Location</Headers.Label>
                                    <Headers.Info style={{ margin: 0 }}>{Merchant.address}</Headers.Info>
                                  </div>
                                </div>
                              ) : (
                                <Common.Description>
                                  This Merchant did not provide any information.
                                </Common.Description>
                              )
                            }
                          </div>
                        )
                      }
                    }
                  </Query>
                )
              }
            </Fragment>
          ) : null
        }
      </Forms.Container>


      <WishList items={items} />
      <Trends />
    </div>
  )
}

export default withRouter(Product);
