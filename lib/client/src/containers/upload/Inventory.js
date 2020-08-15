import React, { useState } from 'react';
import { Styles } from '../../styles';
import { categories } from '../../shared/categories';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const { Common, Identifier, Animations } = Styles;
const { List } = Identifier;
const { Messages } = Common;

const Inventory = ({
  formData,
  onInputChange,
  clearInputField,
  setCustomValue
}) => {
  const [ quantities, setQuantities ] = useState(0);

  const generateLimit = (quantity) => {
    setCustomValue('quantity', '', parseInt(quantity))
  }

  const checkPurchaseLimit = (value, state, target) => {
    clearInputField(target);
    const newVal = value.toString();

    const isNumber = (str) => {
      var pattern = /^\d+$/;
      return pattern.test(str);
    }

    if (isNumber(newVal)) {
      if (value < 1) {
        state('purchaseLimit', '', 1);
      };
      if (newVal.substring(0, 1) == '0') {
        state('purchaseLimit', '', newVal.substring(1, newVal.length).toString());
      };
      if (newVal > formData['quantity'].value) {
        state('purchaseLimit', '', formData['quantity'].value.toString())
      };
    } else {
      state('purchaseLimit', '', formData['quantity'].value.toString());
    }
  }

  const checkInvalidInput = (value, state, target) => {
    clearInputField(target);
    const newVal = value.toString();
    const isNumber = (str) => {
      var pattern = /^\d+$/;
      return pattern.test(str);
    }
    if (isNumber(newVal)) {
      if (newVal.substring(0, 1) == '0') {
        state('quantity', '', newVal.substring(1, newVal.length).toString());
      };
    } else {
      state('quantity', '', '0');
    }
  }

  return (
    <div>
      <Common.Form.InputWrapper>
        <Common.Form.ResWrapper style={{ width: '100%' }}>
          <Common.Form.Identifier>Quantity Left</Common.Form.Identifier>
          <Common.Form.Input
            type="number"
            style={{ marginBottom: '0px', width: '100%' }}
            error={formData['quantity'] && formData['quantity'].error.length >=1}
            name='quantity'
            value={formData['quantity'] !== undefined && formData['quantity'].value}
            onChange={e => (onInputChange(e), clearInputField('quantity', e))}
            onBlur={e => {
              generateLimit(e.target.value)
              checkInvalidInput(e.target.value, setCustomValue, 'quantity')
            }}
          />
          {
            (formData['quantity'] && formData['quantity'].error) && (
              <Animations.FadeIn>
                <Messages.Error>{formData['quantity'].error}</Messages.Error>
              </Animations.FadeIn>
            )
          }
        </Common.Form.ResWrapper>

        <Common.Form.Wrapper style={{ width: '100%' }}>
          <Common.Form.Identifier>Purchase Limit</Common.Form.Identifier>
          <Common.Form.Input
            type="number"
            style={{ marginBottom: '0px', width: '100%' }}
            error={formData['purchaseLimit'] && formData['purchaseLimit'].error.length >=1}
            name='purchaseLimit'
            value={formData['purchaseLimit'] !== undefined ? formData['purchaseLimit'].value : ''}
            onChange={e => (onInputChange(e), clearInputField('purchaseLimit', e))}
            onBlur={e => checkPurchaseLimit(e.target.value, setCustomValue, 'purchaseLimit')}
          />
          {
            (formData['purchaseLimit'] && formData['purchaseLimit'].error) && (
              <Animations.FadeIn>
                <Messages.Error>{formData['purchaseLimit'].error}</Messages.Error>
              </Animations.FadeIn>
            )
          }
        </Common.Form.Wrapper>
      </Common.Form.InputWrapper>
    </div>
  )
}

export default Inventory;
