import React, { useState } from 'react';
import { Styles} from '../../styles';
import { inc, dec, resetCount, getSubTotal } from '../../actions/productActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tags } from '../../tags';
import { useMutation } from '@apollo/react-hooks';

const { Common, Cart } = Styles;
const { Buttons, Paragraphs } = Cart;

const Control = ({
  storeName,
  name,
  delivery,
  deliveryFee,
  count,
  option,
  addOption,
  id,
  inc, dec, resetCount, items, getSubTotal,
  history,
  setErrors,
  quantity
}) => {
  const [ increment ] = useMutation(Tags.Cart.Mutations.increment);
  const [ decrement ] = useMutation(Tags.Cart.Mutations.decrement);
  const [ setSubTotal ] = useMutation(Tags.Cart.Mutations.setSubTotal);
  const [ reset ] = useMutation(Tags.Cart.Mutations.reset);

  const [ loading, setLoading ] = useState(false);

  const refreshRoute = () => {
    history.replace('/reload');
    setTimeout(() => {
      history.replace(`/cart`)
    })
  }

  const decrementAction = async () => {
    setLoading(true);
    const format = `${id}-${option}-${addOption}`;
    dec(storeName, name, format, delivery, deliveryFee);
    resetCount();
    getSubTotal();
    const res = await decrement({ variables: { storeName, name, identifier: format, delivery, deliveryFee } });
    await reset();
    await setSubTotal();
    if (res.data.decrement) {
      setLoading(false);
    }
  }

  const incrementAction = async () => {
    const format = `${id}-${option}-${addOption}`;
    inc(storeName, name, format, delivery, deliveryFee);
    resetCount();
    getSubTotal();
    setLoading(false);
    let res = await increment({ variables: { storeName, name, identifier: format, delivery, deliveryFee } });
    await reset();
    await setSubTotal();
    if (res.data.increment) {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Buttons.Control disabled={count <= 1 || loading} onClick={() => (decrementAction(), setErrors([]))}>-</Buttons.Control>
      <Paragraphs.Control>{count}</Paragraphs.Control>
      <Buttons.Control disabled={count >= quantity || loading} onClick={() => (incrementAction(), setErrors([]))}>+</Buttons.Control>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inc: (storeName, name, identifier, delivery, deliveryFee) => {
      dispatch(inc(storeName, name, identifier, delivery, deliveryFee))
    },
    dec: (storeName, name, identifier, delivery, deliveryFee) => {
      dispatch(dec(storeName, name, identifier, delivery, deliveryFee))
    },
    resetCount: () => {
      dispatch(resetCount())
    },
    getSubTotal: () => dispatch(getSubTotal())
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(Control);
export default withRouter(component);
