import React, { useState, Fragment } from 'react';
import { Styles } from '../styles';
import { withRouter, Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Tags } from '../tags';
import { formatTextLen } from '../utils/formatters';
import { loadImage } from '../utils/imageFormatter';
import styled from 'styled-components';
import { formatNumber } from '../utils/productItemFormatter';
import SearchBar from '../containers/navigations/SearchBar';
import PageLoader from '../components/loaders/PageLoader';
import Message from '../components/messages/Notification';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { addToWishList, verifyWishList } from '../utils/cookies';

const { Common, Search, Animations, Cart, Stores, Badges } = Styles;
const { Containers, Assets, Wrappers } = Search;
const { Buttons, Paragraphs } = Cart;

const Title = styled(Link)`
  font-size: 16px;
  display: block;
  margin-top: 0px;
  margin-bottom: 5px;
  color: #333333;
`

const Price = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 0px;
`

const Option = styled.p`
  font-size: 14px;
  color: green;
  margin: 0px;
  margin-top: 8px;
  margin-bottom: 5px;
`

const SearchPage = ({ match: { params } }) => {
  const [ rangeObj, setRangeObj ] = useState({});
  const [ rating, setRating ] = useState(null);
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(12);
  const [ wishListSuccess, setWishListSuccess ] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Message link='/user/wishlist' isOpen={wishListSuccess} message="Wishlist updated!" linkText='Wishlists' />
      <br />
      <Stores.Content.Wrappers.Content style={{ maxWidth: '100%', overflow: 'none' }}>
        <SearchBar
          rangeObj={rangeObj}
          setRangeObj={setRangeObj}
          rating={rating}
          setRating={setRating}
        />

        <Stores.Content.Containers.Content conditions='authed' style={{ width: '100%' }}>
          <Common.Headers.Identifier>Search results for {params.query}</Common.Headers.Identifier>
          <Query
            query={Tags.Product.Queries.filterProduct}
            variables={{ search: params.query, page, limit, option: parseInt(rangeObj['range']), rating }}
          >
            {
              ({ loading, data }) => {
                if (loading) return (
                  <PageLoader />
                );
                const { filterProduct: products } = data;
                if (products == undefined) {
                  return (
                    <Common.Description>0 results</Common.Description>
                  )
                } else {
                  if (!products || products.length == 0) {
                    return (
                      <Common.Description>0 results</Common.Description>
                    )
                  } else {
                    return (
                      <Fragment>
                        <Animations.Fade>
                          {
                            products.map((product, index) => (
                              <Containers.Search>
                                <div style={{ display: 'flex' }}>
                                  <Assets.Product src={loadImage(product.storeName, '600-main-0', false, false, product.session)} />
                                  <Wrappers.Product>
                                    <Title to={{ pathname: `/${product.storeName}/product/${product.id}` }}>{formatTextLen(product.title, 5)}</Title>

                                    <div>
                                      <Price>
                                        Rs {
                                          product.options.length >= 1
                                            ? formatNumber(product.options[0].price + (product.store.vatRegistered ? product.options[0].addedVAT : 0))
                                            : formatNumber(product.price + (product.store.vatRegistered ? product.addedVAT : 0))
                                        }
                                      </Price>

                                      {
                                        product.options.length >= 1 && (
                                          <div style={{ display: 'flex' }}>
                                            {
                                              product.options.map((option, index) => {
                                                if (index == product.options.length - 1) {
                                                  return <Option> {option.name}</Option>
                                                } else {
                                                  return (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                      <Option>{option.name}</Option>
                                                      <Option style={{ marginRight: 5 }}>,</Option>
                                                    </div>
                                                  )
                                                }
                                              }) 
                                            }
                                          </div>
                                        )
                                      }

                                      <Common.Links.Normal
                                        style={{ fontSize: 14, color: "#333333" }}
                                        to={{ pathname: `/store/${product.storeName}` }}
                                      >
                                        {product.store.companyName}
                                      </Common.Links.Normal>
                                    </div>
                                  </Wrappers.Product>
                                </div>

                                <Badges.WishList
                                  style={{ position: 'relative', margin: 'auto 10px', fontSize: 14 }}
                                  checked={verifyWishList(product.id)}
                                  onClick={() => {
                                    let wishListRes = addToWishList(product.id);
                                    if (wishListRes) { setWishListSuccess(true) };
                                    setTimeout(() => {
                                      setWishListSuccess(false)
                                    }, 2000)
                                  }}
                                  icon={faHeart}
                                />
                              </Containers.Search>
                            ))
                        }
                        </Animations.Fade>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                          <div style={{ display: 'flex', margin: 'auto 0' }}>
                            <Common.Buttons.Default
                              disabled={page <= 1}
                              onClick={() => setPage(page - 1)}
                              style={{ padding: '0px 10px', height: '30px', marginRight: 8 }}
                            >
                              <Common.Icons.Default style={{ padding: 0, paddingRight: 10 }} icon={faChevronLeft} />Prev
                            </Common.Buttons.Default>

                            <Common.Buttons.Default
                              disabled={products.length < limit}
                              onClick={() => setPage(page + 1)}
                              style={{ padding: '0px 10px', height: '30px' }}
                            >
                              Next<Common.Icons.Default style={{ padding: 0, paddingLeft: 10 }} icon={faChevronRight} />
                            </Common.Buttons.Default>
                          </div>
                        </div>
                      </Fragment>
                    )
                  }
                }
              }
            }
          </Query>
        </Stores.Content.Containers.Content>
      </Stores.Content.Wrappers.Content>
    </div>
  )
}

export default withRouter(SearchPage);
