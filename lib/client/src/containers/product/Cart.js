import React from 'react';
import { Styles } from '../styles';
import { loadImage } from '../../utils/imageFormatter';
const { Common, Cart } = Styles;
const { Assets } = Cart;

const CartItem = ({ item }) => {
  return (
    <div>
      <Assets.Product src={loadImage(item.storeName, item.fileUrl, false, false, item.session)} />
    </div>
  )
}

export default CartItem;
