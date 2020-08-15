import React, { useState } from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import ReactImageMagnify from 'react-image-magnify';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Message from '../../components/messages/Notification';
import { addToWishList, verifyWishList } from '../../utils/cookies';

const { Common, Product, Badges } = Styles;
const { CurrProduct } = Product;

const DisplayImage = ({
  product: { fileUrl, options, store, session, id },
  selected,
  selectedImage
}) => {
  const [ wishListSuccess, setWishListSuccess ] = useState(false);

  const addToWishlist = () => {
    const prev = Object.assign({}, JSON.parse(localStorage.getItem('wish')));
    if (prev && prev[id]) {
      prev[id] = false;
    } else {
      prev[id] = true;
    }
    localStorage.setItem('wish', JSON.stringify(prev));
    setWishListSuccess(true);
    setTimeout(() => {
      setWishListSuccess(false)
    }, 2000)
  }

  const validateCheck = () => {
    let wishs = JSON.parse(localStorage.getItem('wish'));
    if (wishs && wishs[id]) {
      return true
    } else {
      return false
    }
  }

  return (
    <CurrProduct.Display.Wrapper style={{ position: 'relative' }}>
      <Badges.WishList
        style={{ top: 0, left: 0 }}
        checked={verifyWishList(id)}
        onClick={() => {
          let wishListRes = addToWishList(id);
          if (wishListRes) { setWishListSuccess(true) }
          setTimeout(() => {
            setWishListSuccess(false)
          }, 2000)
        }}
        icon={faHeart}
      />
      <Message link='/user/wishlist' isOpen={wishListSuccess} message="Wishlist updated!" linkText='Wishlists' />
      <ReactImageMagnify {...{
        smallImage: {
          isFluidWidth: true,
          isHintEnabled: true,
          src: selectedImage !== null
              ? loadImage(store.username, selectedImage, false, false, session)
              : selected && selected.fileUrl
              ? loadImage(store.username, selected.fileUrl, false, false, session) 
              : options.length >= 1
                ? loadImage(store.username, `600-option-0`, false, false, session)
                : loadImage(store.username, `600-main-0`, false, false, session)
        },
        largeImage: {
          width: 1000,
          height: 1000,
          src: selectedImage !== null
              ? loadImage(store.username, selectedImage, false, false, session)
              : selected && selected.fileUrl
              ? loadImage(store.username, selected.fileUrl, false, false, session) 
              : options.length >= 1
                ? loadImage(store.username, `600-option-0`, false, false, session)
                : loadImage(store.username, `600-main-0`, false, false, session)
        },
        enlargedImagePosition: 'over',
        isHintEnabled: true,
        shouldHideHintAfterFirstActivation: false,
      }} />
    </CurrProduct.Display.Wrapper>
  )
}

export default DisplayImage;
