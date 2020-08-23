import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import { connect } from 'react-redux';
import { loadImage } from '../utils/imageFormatter';
import CartItem from '../containers/product/CartItem';
import { formatNumber } from '../utils/productItemFormatter';
import styled from 'styled-components';
import FormNavigator from '../components/navigators/FormNavigator';
import { objLen } from '../utils/formatters';
import Message from '../components/messages/Notification';
import { withRouter } from 'react-router-dom';
import { Tags } from '../tags';
import { useMutation } from '@apollo/react-hooks';
import { isAuthenticated } from '../utils/verifyUser';
import ScrollToTopRoute from '../ScrollToTopRoute';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  @media (max-width: 512px) {
    font-size: 14px;
  };
  @media (max-width: 412px) {
    display: block;
  }
`

const { Common, Tabs, Forms, Animations } = Styles;
const { Assets } = Common;

const Cart = ({ items, inc, dec, resetCount, loadItems, subTotal, history, count, clearItems }) => {
  const [ types, setTypes ] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ loginError, setLoginError ] = useState(false);
  const [ ship ] = useMutation(Tags.Ship.Mutations.ship);
  const [ checkStock ] = useMutation(Tags.Product.Mutations.checkStock);
  const [ errors, setErrors ] = useState([]);

  const onTypeUpdate = (store, type) => {
    const obj = Object.assign({}, types);
    obj[store] = { type: type.name, fee: type.fee };
    setTypes(obj);
  }

  const resetState = () => {
    setTimeout(() => {
      setError(false);
    }, 1800)
  }

  const onSubmit = async () => {
    setLoading(true);

    if (items && items.length <= 0) {
      setLoading(false);
      alert('Cart is empty')
    } else {
      if (isAuthenticated().ok) {
        if ((items.length >= 1) && (objLen(types) <= 0)) {
          setLoading(false);
          setError(true);
          setMessage('Please select order type')
          resetState()
        } else {

          items.map(async item => {
            let userItems = item.purchases;
            userItems.map(async i => {
              if ((i.option !== null) || (i.option !== 'null')) {
                let res = await checkStock({
                  variables: {
                    productId: i.itemId,
                    selectedOption: i.option,
                    selectedCount: parseInt(i.count)
                  }
                });
                if (res.data.checkStock !== true) {
                  setErrors([...errors, i.itemId]);
                  setLoading(false);
                  setError(true);
                  setMessage('Something went wrong')
                  resetState()
                }
              } else {
                let res = await checkStock({
                  variables: {
                    productId: i.itemId,
                    selectedOption: null,
                    selectedCount: parseInt(i.count)
                  }
                });
                if (res.data.checkStock !== true) {
                  setErrors([...errors, i.itemId]);
                  setLoading(false);
                  setError(true);
                  setMessage('Something went wrong')
                  resetState()
                }
              }
            })
          })

          const res = await ship({
            variables: {
              customer: isAuthenticated().email,
              purchases: JSON.stringify(items),
              grandTotal: subTotal,
              grandDelivery: getDeliveryFee()
            }
          });
          const { ok, ship: shipId, type } = res.data.ship;
          if (ok) {
            location.assign(`/shipping?session=${shipId}`);
            setLoading(false);
          } else {
            setLoading(false);
            if (type == 'LOGIN') {
              alert('There is a problem with your account. Please log out and try again');
              localStorage.removeItem('token');
              sessionStorage.removeItem('token');
              window.location.reload();
            }
          }
        }
      } else {
        setLoading(false);
        setLoginError(true)
        setTimeout(() => {
          setLoginError(false)
        }, 4000)
      }
    } 
  }

  const getDeliveryFee = () => {
    let fee = 0;
    Object.keys(types).forEach(store => {
      if (types[store].type === 'delivery') {
        fee += types[store].fee
      }
    });
    return fee;
  }

  useEffect(() => {
    document.title = `Paylingo - Checkout (${count.toString()})`
  }, [ count ]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollToTopRoute />
      <Message
        isOpen={error}
        message={message}
        type='error'
      />
      <Message
        isOpen={loginError}
        message='Please login first'
        type='error'
        link='/user/auth/login?redirect=true&to=cart'
        linkText='login here'
      />

      <br />
      <Common.Presentation>
        <Animations.FadeIn>
          <Wrapper>
            <h4>Subtotal</h4>
            <div style={{ display: 'flex' }}>
              <h4>MUR {formatNumber(subTotal)} </h4>
              <h4 style={{ marginLeft: 10 }}>+ Delivery (MUR {formatNumber(getDeliveryFee())})</h4>
            </div>
          </Wrapper>
          <Common.Elements.Divider />
          {
            (items.length <= 0)
              ? (
                <div>
                  Looks like your cart is empty. Click
                  <Common.Links.Normal style={{ margin: '0px 5px' }} to='/'> here</Common.Links.Normal>
                  to shop.
                </div>
              ) : items.map((item, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', marginBottom: 15 }}>
                    <Assets.LogoSM src={loadImage(item.storeName, 'logo', true, false)} />
                    <p style={{ margin: 'auto 0', fontSize: 14, fontWeight: 700, marginLeft: 10 }}>{item.name}</p>
                  </div>
                  <p style={{ margin: 0, paddingTop: 5, fontSize: 14, color: '#333333' }}>Select order type:</p>
                  <div style={{ display: 'flex' }}>

                    {
                      item.delivery && (
                        <Common.Form.Check.Wrapper style={{ padding: 0, marginRight: 5 }}>
                          <Common.Form.Radio.Input
                            checked={types[item.storeName] !== undefined && types[item.storeName].type == 'delivery'}
                            onChange={(e) => onTypeUpdate(item.storeName, { name: 'delivery', fee: item.deliveryFee })}
                            id={`${item.storeName}_order_type_delivery_radio`}
                          />
                          <Common.Form.Check.Label htmlFor={`${item.storeName}_order_type_delivery_radio`}>
                            Delivery (+MUR {formatNumber(item.deliveryFee)})
                          </Common.Form.Check.Label>
                        </Common.Form.Check.Wrapper>
                      )
                    }

                    <Common.Form.Check.Wrapper style={{ padding: 0 }}>
                      <Common.Form.Radio.Input
                        checked={types[item.storeName] !== undefined && types[item.storeName].type == 'pickup'}
                        onChange={(e) => onTypeUpdate(item.storeName, { name: 'pickup', fee: 0 })}
                        id={`${item.storeName}_order_type_pickup_radio`}
                      />
                      <Common.Form.Check.Label htmlFor={`${item.storeName}_order_type_pickup_radio`}>Pickup</Common.Form.Check.Label>
                    </Common.Form.Check.Wrapper>

                  </div>

                  <CartItem
                    errors={errors}
                    setErrors={setErrors}
                    storeName={item.storeName}
                    delivery={item.delivery}
                    deliveryFee={item.deliveryFee}
                    name={item.name}
                    purchases={item.purchases}
                  />
                </div>
              ))
          }
          <FormNavigator
            conditions={() => (items && items.length <= 0)}
            placeholder="Next"
            loading={loading}
            hasErrors={error}
            onSubmit={onSubmit}
          />
        </Animations.FadeIn>
      </Common.Presentation>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    subTotal: state.subTotal,
    count: state.count
  }
}

const component = connect(mapStateToProps)(Cart); 
export default withRouter(component);
