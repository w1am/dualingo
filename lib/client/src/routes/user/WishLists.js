import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles';
import { useQuery } from '@apollo/react-hooks';
import { isAuthenticated } from '../../utils/verifyUser';
import { Tags } from '../../tags';
import User from '../../containers/ships/User';
import DatePicker from '../../containers/DatePicker';
import { dates } from '../../shared/date';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Query } from 'react-apollo';
import Skeleton from 'react-loading-skeleton';
import { getCookie } from '../../utils/cookies';
import WishListItem from '../../components/WishListItem';

const { Common, Table, Product } = Styles;

const WishLists = ({ }) => {
  const [ items, setItems ] = useState([]);
  useEffect(() => {
    const x = getCookie('wish');
    if (x !== '') {
      const wishs = JSON.parse(x);
      let temp = [];
      Object.keys(wishs).forEach((item, index) => {
        if (wishs[item] == true) {
          temp.push(item)
        }
      });
      setItems(temp);
    }
  }, []);
  return (
    <div style={{ minHeight: '100vh' }}>
      <Common.Presentation>
        <Common.Headers.Page>
          {isAuthenticated().ok ? isAuthenticated().name.split(' ')[0] : 'User'}'s Wishlists
        </Common.Headers.Page>
        <Product.Wrapper>
          {
            items.length <= 0 ? (
              <Common.Description>Your wishlist is empty</Common.Description>
            ) : items.map((item, i) => (
              <Query
                key={i}
                query={Tags.Product.Queries.getProduct}
                variables={{ id: item }}
              >
                {
                  ({ loading, data }) => {
                    if (loading) {
                      return (
                        <div style={{ width: '200px', margin: '0 3px' }}>
                          <Skeleton height={200} />
                        </div>
                      )
                    };
                    const { getProduct } = data;
                    if (!getProduct) {
                      return null
                    } else {
                      return <WishListItem key={getProduct.id} product={getProduct} />
                    }
                  }
                }
              </Query>
            ))
          }
        </Product.Wrapper>
      </Common.Presentation>
    </div>
  )
}

export default WishLists;
