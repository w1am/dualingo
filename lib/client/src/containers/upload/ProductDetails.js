import React, { useState } from 'react';
import { Styles } from '../../styles';
import { categories } from '../../shared/categories';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from '../../utils/productItemFormatter';
import { isValid, isFormatted, revertNumberFormat } from '../../utils/numberFormatter';

const { Common, Identifier, Animations } = Styles;
const { Messages } = Common;
const { List } = Identifier;

const ProductDetails = ({
  formData,
  onInputChange,
  clearInputField,

  tempPrice,
  setTempPrice,
  tempPreviousPrice,
  setTempPreviousPrice,
  setCustomValue
}) => {
  const isInvalidInput = (number, temp, state, previousState, target) => {
    if ((previousState !== null) && (formatNumber(previousState !== undefined ? previousState.value : 0) !== number)) {
      if (!isValid(number)) {
        temp(formatNumber(0))
        state(target, '', 0);
      } else if (number == '') {
        temp(formatNumber(0))
        state(target, '', 0);
      } else {
        temp(formatNumber(Math.abs(parseFloat(parseFloat(number).toString(), 10))));
        state(target, '', isFormatted(number) ? revertNumberFormat(number) : Math.abs(parseInt(number.toString(), 10)));
      }
    }
  }

  return (
    <div>
      <Common.Headers.Identifier>Product Details</Common.Headers.Identifier>

      <Common.Form.Wrapper>
        <Common.Form.Identifier>Title</Common.Form.Identifier>
        <Common.Form.Input
          style={{ marginBottom: '0px', width: '100%' }}
          name="title"
          error={formData['title'] && formData['title'].error.length >=1}
          onChange={e => (onInputChange(e), clearInputField('title', e))}
          value={formData['title'] !== undefined ? formData['title'].value : ''}
        />
        {
          (formData['title'] && formData['title'].error) && (
            <Animations.FadeIn>
              <Messages.Error>{formData['title'].error}</Messages.Error>
            </Animations.FadeIn>
          )
        }
      </Common.Form.Wrapper>

      <Common.Form.InputWrapper>
        <Common.Form.ResWrapper style={{ width: '100%' }}>
          <Common.Form.Identifier>Price (Price after)</Common.Form.Identifier>
          <Common.Form.Input
            style={{ marginBottom: '0px', width: '100%' }}
            name="price"
            error={formData['price'] && formData['price'].error.length >=1}
            onChange={e => (onInputChange(e), clearInputField('price', e), setTempPrice(e.target.value))}
            onBlur={() => (isInvalidInput(tempPrice, setTempPrice, setCustomValue, formData['price'], 'price'))}
            value={tempPrice}
          />
          {
            (formData['price'] && formData['price'].error) && (
              <Animations.FadeIn>
                <Messages.Error>{formData['price'].error}</Messages.Error>
              </Animations.FadeIn>
            )
          }
        </Common.Form.ResWrapper>

        <Common.Form.Wrapper style={{ width: '100%' }}>
          <Common.Form.Identifier>Previous Price (Price before)</Common.Form.Identifier>
          <Common.Form.Input
            style={{ marginBottom: '0px', width: '100%' }}
            name="previousPrice"
            error={formData['previousPrice'] && formData['previousPrice'].error.length >=1}
            onChange={e => {
              onInputChange(e);
              clearInputField('previousPrice', e);
              setTempPreviousPrice(e.target.value)
            }}
            onBlur={() => (isInvalidInput(tempPreviousPrice, setTempPreviousPrice, setCustomValue, formData['previousPrice'], 'previousPrice'))}
            value={tempPreviousPrice}
          />
          {
            (formData['previousPrice'] && formData['previousPrice'].error) && (
              <Animations.FadeIn>
                <Messages.Error>{formData['previousPrice'].error}</Messages.Error>
              </Animations.FadeIn>
            )
          }
        </Common.Form.Wrapper>
      </Common.Form.InputWrapper>
    </div>
  )
}

export default ProductDetails;
