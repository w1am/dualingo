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

const { Common, Product } = Styles;

const Trends = ({}) => {
  const [ products, setProducts ] = useState([]);
  const [ generateTrends ] = useMutation(Tags.Product.Mutations.generateTrends);
  const [ wishListSuccess, setWishListSuccess ] = useState(false);
  const { loading, data } = useQuery(Tags.Product.Queries.getKeywords);

  const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnFocus: true,
    slidesToShow: (products.length < 5 ? products.length : 5),
    slidesToScroll: (products.length < 5 ? products.length : 5),
    responsive: [
      {
        breakpoint: 1253,
        settings: {
          slidesToShow: (products.length < 4 ? products.length : 4),
          slidesToScroll: (products.length < 4 ? products.length : 4),
        }
      },
      {
        breakpoint: 956,
        settings: {
          slidesToShow: (products.length < 3 ? products.length : 3),
          slidesToScroll: (products.length < 3 ? products.length : 3),
        }
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: (products.length < 2 ? products.length : 2),
          slidesToScroll: (products.length < 2 ? products.length : 2),
        }
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: (products.length < 1 ? products.length : 1),
          slidesToScroll: (products.length < 1 ? products.length : 1),
        }
      },
    ]
  }

  useEffect(() => {
    if (!loading) {
      generateTrends({ variables: { keywords: data.getKeywords } }).then(res => {
        setProducts(res.data.generateTrends.products)
      })
    }
  }, [])

  if (products && products.length >= 1) {
    return (
      <div>
        <br />
        <Message link='/user/wishlist' isOpen={wishListSuccess} message="Wishlist updated!" linkText='Wishlists' />
        <Common.Presentation>
          <Common.Headers.Page>Recommended For You</Common.Headers.Page>

          <Slider {...settings}>
            {
              !products ? (
                <div style={{ maxWidth: '200px', margin: '0 auto' }}><Skeleton height={200} /></div>
              ) : products.map(product => (
                <OtherList key={product.id} product={product} wishListSuccess={wishListSuccess} setWishListSuccess={setWishListSuccess} />
              ))
            }
          </Slider>
        </Common.Presentation>
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default Trends;
