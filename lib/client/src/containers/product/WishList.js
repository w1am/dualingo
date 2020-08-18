import React from 'react';
import { Styles } from '../../styles';
import { Query } from 'react-apollo';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton';
import OtherList from '../../components/OtherList';
import { Tags } from '../../tags';
const { Common, Animations } = Styles;

const WishList = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnFocus: true,
    slidesToShow: (items.length < 5 ? items.length : 5),
    slidesToScroll: (items.length < 5 ? items.length : 5),
    responsive: [
      {
        breakpoint: 1253,
        settings: {
          slidesToShow: (items.length < 4 ? items.length : 4),
          slidesToScroll: (items.length < 4 ? items.length : 4),
        }
      },
      {
        breakpoint: 956,
        settings: {
          slidesToShow: (items.length < 3 ? items.length : 3),
          slidesToScroll: (items.length < 3 ? items.length : 3),
        }
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: (items.length < 2 ? items.length : 2),
          slidesToScroll: (items.length < 2 ? items.length : 2),
        }
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: (items.length < 1 ? items.length : 1),
          slidesToScroll: (items.length < 1 ? items.length : 1),
        }
      },
    ]
  }

  if (items && items.length >= 1) {
    return (
      <div>
        <br />
        <Common.Presentation>
          <Common.Headers.Page>Your Wislist</Common.Headers.Page>
          <Slider { ...settings }>
            {
              items.map((item, index) => (
                <Query
                  key={index}
                  query={Tags.Product.Queries.getProduct}
                  variables={{ id: item }}
                >
                  {
                    ({ loading, data }) => {
                      if (loading) {
                        return (
                          <div style={{ maxWidth: '200px', margin: '0 auto' }}><Skeleton height={200} /></div>
                        )
                      };
                      const { getProduct } = data;
                      if (!getProduct) {
                        return null
                      } else {
                        return (
                          <Animations.FadeIn>
                            <OtherList key={getProduct.id} product={getProduct} />
                          </Animations.FadeIn>
                        )
                      }
                    }
                  }
                </Query>
              ))
            }
          </Slider>
        </Common.Presentation>
      </div>
    )
  } else {
    return null
  }
}

export default WishList;
