import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Tags } from '../../tags';
import { loadImage } from '../../utils/imageFormatter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Styles } from '../../styles';
import { Link } from 'react-router-dom';
import ReactImg from 'react-image';
import Skeleton from 'react-loading-skeleton';
const { Common } = Styles;

const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  background: white;
  justify-content: center;
`

const Image = styled(ReactImg)`
  max-width: 100%;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  margin: 0 auto;
  display: block;
  border: 5px solid rgba(0, 0, 0, 0.1);
`
const Header = styled.p`
  text-align: center;
  margin: 0;
  margin-top: 15px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`
const Wrapper = styled(Link)`
  text-decoration: none;
`

const Stores = ({}) => {
  return (
    <Query query={Tags.Merchant.Queries.getMerchants} variables={{ limit: 20 }}>
      {
        ({ loading, data }) => {
          if (loading) return null;
          const { getMerchants: merchants } = data;

          const settings = {
            dots: true,
            infinite: true,
            speed: 0,
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnFocus: true,
            slidesToShow: (merchants.length < 5 ? merchants.length : 5),
            slidesToScroll: (merchants.length < 5 ? merchants.length : 5),
            responsive: [
              {
                breakpoint: 1253,
                settings: {
                  slidesToShow: (merchants.length < 4 ? merchants.length : 4),
                  slidesToScroll: (merchants.length < 4 ? merchants.length : 4),
                }
              },
              {
                breakpoint: 956,
                settings: {
                  slidesToShow: (merchants.length < 3 ? merchants.length : 3),
                  slidesToScroll: (merchants.length < 3 ? merchants.length : 3),
                }
              },
              {
                breakpoint: 730,
                settings: {
                  slidesToShow: (merchants.length < 2 ? merchants.length : 2),
                  slidesToScroll: (merchants.length < 2 ? merchants.length : 2),
                }
              },
              {
                breakpoint: 415,
                settings: {
                  slidesToShow: (merchants.length < 1 ? merchants.length : 1),
                  slidesToScroll: (merchants.length < 1 ? merchants.length : 1),
                }
              },
            ]
          }

          return (
            <div style={{ marginTop: 10 }}>
              <Common.Presentation>
                <Common.Headers.Page>Stores</Common.Headers.Page>
                <Slider {...settings}>
                  {
                    merchants.map(merchant => (
                      <Layout>
                        <Wrapper to={{ pathname: `/store/${merchant.username}` }}>
                          <Image
                            src={loadImage(merchant.username, 'logo', true, false)}
                            loader={<Skeleton height={100} width={100} circle={true} />}
                          />
                          <Header>{merchant.companyName}</Header>
                        </Wrapper>
                      </Layout>
                    ))
                  }
                </Slider>
              </Common.Presentation>
            </div>
          )
        }
      }
    </Query>
  )
}

export default Stores;
