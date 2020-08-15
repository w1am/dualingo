import React, { useEffect } from 'react';
import { Styles } from '../styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tags } from '../tags';
import { loadImage } from '../utils/imageFormatter';
import { formatNumber } from '../utils/productItemFormatter';
import queryString from 'query-string';
import OrderList from '../containers/ships/OrderList';
import { clearItems } from '../actions/productActions';
import { connect } from 'react-redux';
import { isAuthenticated } from '../utils/verifyUser';

const { Common, Product } = Styles;
const { Assets } = Product;

const Receipt = ({ location: { search }, clearItems }) => {
  const values = queryString.parse(search);
  const { loading, data } = useQuery(Tags.Ship.Queries.getCurrentShip, {
    variables: { id: values.session }
  });
  const [ clearRedisItems ] = useMutation(Tags.Cart.Mutations.clearRedisItems);

  useEffect(() => {
    if (isAuthenticated().ok) {
      clearItems();
      clearRedisItems();
    } else {
      location.assign('/')
    }
  }, [ data ]) 

  if (loading) {
    return null
  } else {
    const { getCurrentShip: ship } = data;
    return (
      <div>
        <Common.Headers.Page>Receipt</Common.Headers.Page>
        <Common.Presentation>
          <Common.Headers.Page>Your Name</Common.Headers.Page>
          <p style={{ color: 'grey' }}>ORDER #9999</p>
          <h3>Thank you for your purchase</h3>
          <Common.Description>
            Hold tight! Once we've verified the payment, your products will be packed ready for you. If you haven't made the payment yet,
            go to <Common.Links.Normal to='/user/orders'>Order History</Common.Links.Normal> and proceed with the instructions. 
          </Common.Description>
          <Common.Elements.Divider />

          <Common.Headers.Page>Order Summary</Common.Headers.Page>

          <OrderList edit={false} purchases={ship.purchases} />

        </Common.Presentation>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearItems: () => { dispatch(clearItems()) }
  }
}

export default connect(null, mapDispatchToProps)(Receipt);
