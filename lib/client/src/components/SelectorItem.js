import React, { useState } from 'react';
import { Styles } from '../styles';
import { formatNumber } from '../utils/productItemFormatter';
import { loadImage } from '../utils/imageFormatter';
import Skeleton from 'react-loading-skeleton';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { addToWishList, verifyWishList } from '../utils/cookies';

const { Common, Product, Badges } = Styles;
const { SmContainer, Assets, Wrappers, Title, Price, StoreName, Buttons, Cart } = Product;

const SelectorItem = ({ product, selected, setSelected, selectedObj, setSelectedObj, setPrevious }) => {
  const [ wishListSuccess, setWishListSuccess ] = useState(false);

  const updateCheck = (children) => {
    let curr = selected.map(item => item).indexOf(children.id)
    if (curr == -1) {
      setSelected([
        ...selected,
        children.id
      ]);

      let x = Object.assign({}, selectedObj);
      x[children.id] = true;
      setSelectedObj(x);
    } else {
      let tempArr = selected;
      tempArr.splice(curr, 1);
      setSelected(tempArr);
      let x = Object.assign({}, selectedObj);
      x[children.id] = false;
      setSelectedObj(x);
    }
  }

  return (
    <SmContainer style={{ cursor: 'pointer' }} onClick={() => updateCheck(product)}>
      <div style={{ position: 'relative' }}>
        <Common.Icons.Default
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: "10px 5px",
            color: selectedObj[product.id] ? 'green' : 'rgba(0, 0, 0, 0.2)',
            zIndex: 1,
            fontSize: 20
          }}
          icon={faCheck}
        /> 

        <Common.Containers.Image>
          <Assets.Product
            src={loadImage(product.store.username, '600-main-0', false, false, product.session)}
            loader={<div style={{ width: '100%' }}><Skeleton height={280} /></div>}
          />
        </Common.Containers.Image>
      </div>
    </SmContainer>
  )
}

export default SelectorItem;
