import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Tags } from '../tags';
import { connect } from 'react-redux';
import { clearItems } from '../actions/productActions';
const { Cart: { Mutations, Queries } } = Tags; 

const Signout = ({ clearItems }) => {
  const [ clearRedisItems ] = useMutation(Mutations.clearRedisItems);

  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  const { flush, loading, data } = useQuery(Queries.flush);
  useEffect(() => { (flush, clearItems(), clearRedisItems()) });
  return location.assign('/');
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearItems: () => { dispatch(clearItems()) }
  }
}

export default connect(null, mapDispatchToProps)(Signout);
