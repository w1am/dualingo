import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import FormHOC from '../HOC/FormHOC';
import FormNavigator from '../components/navigators/FormNavigator';
import { connect } from 'react-redux';
import { formatNumber } from '../utils/productItemFormatter';
import { Tags } from '../tags';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { isAuthenticated } from '../utils/verifyUser';
import queryString from 'query-string';
import OrderItem from '../containers/ships/OrderItem';

const { Common, Animations } = Styles;
const { Messages } = Common;

const inputs = [ 'address', 'phone', 'building', 'instructions' ];
const headers = [ 'Address', 'Mobile Phone / Tel Number', 'Building', 'Delivery Instructions' ];

const Shipping = ({ items, onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading, subTotal, location: { search } }) => {
  const values = queryString.parse(search);

  const [ paymentMethod, setPaymentMethod ] = useState('mcb');
  const [ setShipInfo ] = useMutation(Tags.Ship.Mutations.setShipInfo);
  const [ updateStock ] = useMutation(Tags.Product.Mutations.updateStock);
  const { loading: shipLoading, data } = useQuery(Tags.Ship.Queries.getShip, {
    variables: { id: values.session }
  });

  const onPaymentChange = (value) => {
    const obj = Object.assign({}, paymentMethod);
    obj['method'] = value;
    setPaymentMethod(value);
  }

  const onSubmit = async () => {
    setLoading(true);
    const hasErrors = onFormSubmit();
    if (hasErrors) {
      setLoading(false);
    } else {
      if (!isAuthenticated().ok) {
        location.assign('/');
      } else {

        let res = false;
        items.map(async item => {
          let userItems = item.purchases;
          userItems.map(async i => {
            if ((i.option !== null) || (i.option !== 'null')) {
              let response = await updateStock({ variables: { id: i.itemId, count: i.count, option: i.option } })
              res = response.data.updateStock;
            } else {
              let response = await updateStock({ variables: { id: i.itemId, count: i.count, option: null } })
              res = response.data.updateStock;
            }
          })
        })

        if (res) {
          const res = await setShipInfo({
            variables: {
              id: values.session,
              customer: isAuthenticated().name,
              email: isAuthenticated().email,
              address: formData['address'] !== undefined ? formData['address'].value : null,
              number: formData['phone'] !== undefined ? formData['phone'].value : null,
              building: formData['building'] !== undefined ? formData['building'].value : null,
              instructions: formData['instructions'] !== undefined ? formData['instructions'].value : null,
              paymentMethod
            }
          });

          if (res.data.setShipInfo) {
            location.assign(`/receipt?session=${values.session}`)
            setLoading(false);
          }
        } else {
          setLoading(false);
          alert('Something went wrong with your order. Please try again later')
        }
      }
    }
  }

  useEffect(() => {
    document.title = 'Flex - Shipping'
  }, [ data ]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Common.Headers.Page>Shipping</Common.Headers.Page>

      <div style={{ display: 'flex' }}>
        <Common.Presentation style={{ flex: 0.7, marginRight: 15 }}>
          <Common.Headers.Identifier>Products</Common.Headers.Identifier>
          {
            !shipLoading && (
              <OrderItem ship={data.getShip.purchases[0]} />
            )
          }

          <Common.Elements.Divider />

          {
            inputs.map((field, index) => (
              <Common.Form.Wrapper key={index}>
                <Common.Form.Identifier>{headers[index]}</Common.Form.Identifier>
                <Common.Form.Input
                  onKeyPress={e => {
                    if (e.key == 'Enter') {
                      onSubmit()
                    }
                  }}
                  error={formData[field] && formData[field].error.length >=1}
                  name={field}
                  onChange={e => (onInputChange(e), clearInputField(field, e))}
                />
                {
                  (formData[field] && formData[field].error) && (
                    <Animations.FadeIn>
                      <Messages.Error>{formData[field].error}</Messages.Error>
                    </Animations.FadeIn>
                  )
                }
              </Common.Form.Wrapper>
            ))
          }

        </Common.Presentation>


        <Common.Presentation style={{ flex: 0.3 }}>
          <Common.Headers.Page>Payment Method</Common.Headers.Page>

          <Common.Description>
            Select a payment method to proceed to your online purchases. Enter bank A/C below and enter your name as identifier.
          </Common.Description>

          <Common.Form.Check.Wrapper style={{ padding: 0, marginRight: 5 }}>
            <Common.Form.Radio.Input
              checked={paymentMethod == 'mcb'}
              id="mcb_radio"
              onChange={() => onPaymentChange('mcb')}
            />
            <Common.Form.Check.Label htmlFor='mcb_radio'>JUICE MCB</Common.Form.Check.Label>
          </Common.Form.Check.Wrapper>

          <Common.Form.Check.Wrapper style={{ padding: 0, marginRight: 5 }}>
            <Common.Form.Radio.Input
              checked={paymentMethod == 'sbm'}
              id="sbm_radio"
              onChange={() => onPaymentChange('sbm')}
            />
            <Common.Form.Check.Label htmlFor='sbm_radio'>SBM Transfer</Common.Form.Check.Label>
          </Common.Form.Check.Wrapper>

          <Common.Elements.Divider />

          <Common.Form.Identifier>Please transfer to this account:</Common.Form.Identifier>
          {
            paymentMethod == 'sbm' ?<h2>04210100056253</h2> : paymentMethod == 'mcb' ? <h2>000447743139</h2> : null
          }
          <br />
          <Common.Form.Identifier>Amount to transfer:</Common.Form.Identifier>
          <div>
            <h3>MUR {formatNumber(subTotal)}</h3>
            <p style={{ color: 'green', marginTop: 5 }}>Incl. Tax & Delivery</p>
          </div>

        </Common.Presentation>
      </div>

      <FormNavigator placeholder="Next" loading={loading} hasErrors={hasErrors} onSubmit={onSubmit} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    subTotal: state.subTotal,
    items: state.items
  }
}

const component = FormHOC({ inputs })(Shipping);
export default connect(mapStateToProps)(component);
