import React from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';

const { Common, Product } = Styles;
const { CurrProduct: { Information, Price, PreviousPrice, Option } } = Product;

const OptionContainer = ({
  tracker,
  setSelected,
  setSelectedImage,
  setCurrentStock,
  setCurrentlySelected,
  option,
  selected,
  product
}) => {
  const { session, store: { username } } = product;
  return (
    <Option.Layout
      selected={selected}
      currOption={option}
      onClick={() => {
        setSelected(option);
        setSelectedImage(null);
        setCurrentStock(option.quantity)
        setCurrentlySelected(option.fileUrl)
      }}
    >
      <Option.Image
        src={
          loadImage(
            product.store.username,
            `600-option-${tracker}`,
            false,
            false,
            product.session
          )
        }
      />
      <div
        style={{
          padding: 5,
          margin: 'auto 0',
          marginLeft: 5
        }}
      >
        <Option.Title>{option.name}</Option.Title>
        <Option.Price>Rs {formatNumber(option.price)}</Option.Price>
      </div>
    </Option.Layout>
  )
}

export default OptionContainer;
