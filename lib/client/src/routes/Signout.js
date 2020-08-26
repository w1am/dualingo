import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Tags } from '../tags';
import { connect } from 'react-redux';
import { clearItems } from '../actions/productActions';
const { User, Cart } = Tags; 

const Signout = ({ clearItems }) => {
  const [ clearRedisItems ] = useMutation(Cart.Mutations.clearRedisItems);
  const [ signout ] = useMutation(User.Mutations.signout);

  sessionStorage.removeItem('token');
  // const { flush, loading, data } = useQuery(Queries.flush);
  useEffect(() => {
    // flush;
    clearItems();
    signout();
    clearRedisItems();
  });
  // return location.assign('/');
  return <p>Hello</p>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearItems: () => { dispatch(clearItems()) }
  }
}

export default connect(null, mapDispatchToProps)(Signout);
