import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Tags } from '../tags';
import { connect } from 'react-redux';
import { clearItems } from '../actions/productActions';
const { User, Cart } = Tags; 

const Signout = ({ clearItems }) => {
  const [ signout ] = useMutation(User.Mutations.signout);
  const [ success, setSuccess ] = useState(false);

  sessionStorage.removeItem('token');

  setTimeout(() => {
    clearItems();
    signout().then(res => {
      console.log(res);
      if (res.data.signout) {
        setSuccess(true);
      } else {
        setTimeout(() => {
          location.assign('/')
        }, 2000)
      }
    });
  });

  if (success) {
    return location.assign('/')
  } else {
    return <p>Loading...</p>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearItems: () => { dispatch(clearItems()) }
  }
}

export default connect(null, mapDispatchToProps)(Signout);
