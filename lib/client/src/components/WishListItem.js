import React, { useState } from 'react';
import { Styles } from '../styles';
import { formatNumber } from '../utils/productItemFormatter';
import { loadImage } from '../utils/imageFormatter';
import Skeleton from 'react-loading-skeleton';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addToWishList, verifyWishList } from '../utils/cookies';

const { Common, Product, Badges } = Styles;
const { SmContainer, Assets, Wrappers, Title, Price, StoreName, Buttons, Cart } = Product;

const WishListItem = ({ product }) => {
  const [ wishListSuccess, setWishListSuccess ] = useState(false);

  return (
    <SmContainer>
      <div style={{ position: 'relative' }}>
        <Badges.WishList
          checked={verifyWishList(product.id)}
          onClick={() => {
            let wishListRes = addToWishList(product.id);
            if (wishListRes) { setWishListSuccess(true) };
            setTimeout(() => {
              setWishListSuccess(false)
            }, 2000)
          }}
          icon={faHeart}
        />

        <Common.Links.Normal to={{ pathname: `/${product.store.username}/product/${product.id}` }}>
          <Common.Containers.Image>
            <Assets.Product
              src={loadImage(product.store.username, '600-main-0', false, false, product.session)}
              loader={<div style={{ width: '100%' }}><Skeleton height={280} /></div>}
            />
          </Common.Containers.Image>
        </Common.Links.Normal>
      </div>

      <div style={{ padding: '10px 5px' }}>
        <Common.Currency>Rs</Common.Currency> <Price>
          {
            product.options.length >= 1
              ? formatNumber(product.options[0].price + (product.store.vatRegistered ? product.options[0].addedVAT : 0))
              : formatNumber(product.price + (product.store.vatRegistered ? product.addedVAT : 0))
          }
        </Price><br />
        <StoreName to='/'>{product.store.companyName}</StoreName>
      </div>
    </SmContainer>
  )
}

export default WishListItem;
