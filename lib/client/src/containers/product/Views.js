import React, { useState, useEffect } from 'react';
import { getCookie } from '../../utils/cookies';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tags } from '../../tags';
import { Styles } from '../../styles';
import OtherList from '../../components/OtherList';
import Skeleton from 'react-loading-skeleton';
import Message from '../../components/messages/Notification';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Query } from 'react-apollo';

const { Common, Product } = Styles;

const Views = ({}) => {
  const [ wishListSuccess, setWishListSuccess ] = useState(false);

  return (
    <Query query={Tags.Product.Queries.getViews}>
      {
        ({ loading, data }) => {
          if (loading) return null;
          const { getViews: views } = data;

          if (views) {
            const settings = {
              dots: true,
              infinite: true,
              speed: 200,
              autoplay: true,
              autoplaySpeed: 10000,
              pauseOnFocus: true,
              slidesToShow: (views.length < 5 ? views.length : 5),
              slidesToScroll: (views.length < 5 ? views.length : 5),
              responsive: [
                {
                  breakpoint: 1253,
                  settings: {
                    slidesToShow: (views.length < 4 ? views.length : 4),
                    slidesToScroll: (views.length < 4 ? views.length : 4),
                  }
                },
                {
                  breakpoint: 956,
                  settings: {
                    slidesToShow: (views.length < 3 ? views.length : 3),
                    slidesToScroll: (views.length < 3 ? views.length : 3),
                  }
                },
                {
                  breakpoint: 730,
                  settings: {
                    slidesToShow: (views.length < 2 ? views.length : 2),
                    slidesToScroll: (views.length < 2 ? views.length : 2),
                  }
                },
                {
                  breakpoint: 415,
                  settings: {
                    slidesToShow: (views.length < 1 ? views.length : 1),
                    slidesToScroll: (views.length < 1 ? views.length : 1),
                  }
                },
              ]
            }

            return (<div style={{ marginTop: 10 }}>
              <Common.Presentation>
                <div style={{ borderBottom: '1px solid #EBEBEB', margin: '10px 0px' }}>
                  <Common.Headers.Page>Recently Viewed</Common.Headers.Page>
                </div>
                <Slider {...settings}>
                  {
                    views.map(view => (
                      <Query query={Tags.Product.Queries.getProduct} variables={{ id: view }}>
                        {
                          ({ loading: productLoading, data: productData }) => {
                            if (productLoading) return (
                              <div style={{ maxWidth: '200px', margin: '0 auto' }}><Skeleton height={200} /></div>
                            );
                            const { getProduct: product } = productData
                            return (
                              <OtherList
                                key={product.id}
                                product={product}
                                wishListSuccess={wishListSuccess}
                                setWishListSuccess={setWishListSuccess}
                              />
                            )
                          }
                        }
                      </Query>
                    ))
                  }
                </Slider>
              </Common.Presentation>
            </div>)
          } else {
            return null
          }
        }
      }
    </Query>

  )
}

export default Views;
