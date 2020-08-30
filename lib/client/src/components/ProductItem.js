import React, { useState, useEffect, Fragment } from 'react';
import { loadImage } from '../utils/imageFormatter';
import { formatNumber } from '../utils/productItemFormatter';
import { Styles } from '../styles';
import Modal from '../containers/AppModal';
import Option from '../components/product/Option';
import AddOption from '../components/product/AddOption';
import Skeleton from 'react-loading-skeleton';
import { addItem, resetCount, getSubTotal } from '../actions/productActions';
import { connect } from 'react-redux';
import { formatTextLen } from '../utils/formatters';
import { ObjLen } from '../utils/formatters';
import ProductHOC from '../HOC/ProductHOC'
import Notification from '../components/Notification';
import Message from '../components/messages/Notification';
import { graphql } from 'react-apollo';
import { Tags } from '../tags';
import ButtonLoader from '../components/loaders/ButtonLoader';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addToWishList, verifyWishList } from '../utils/cookies';
import ReactStars from "react-rating-stars-component";
import styled from 'styled-components';

const Wooper = styled.div`
  width: 100%;
  background: grey;
`

const { Common, Product, Badges, Animations } = Styles;
const { Container, Assets, Wrappers, Title, Price, StoreName, Buttons, Cart } = Product;

const ProductItem = ({ product, addToCart, spaceError, hocLoading, cartSuccess, addItem, resetCart, items, conditions }) => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ selectedOption, setSelectedOption ] = useState(product.options.length >= 1 ? JSON.stringify(product.options[0]) : null);
  const [ selectedOptionCount, setOptionCount ] = useState(1);
  const [ addOption, setAddOption ] = useState('null');
  const [ count, setCount ] = useState(1);
  const [ error, setError ] = useState('');
  const [ wishListSuccess, setWishListSuccess ] = useState(false);

  const resetState = () => {
    setOptionCount(1);
    setSelectedOption(product.options.length >= 1 ? JSON.stringify(product.options[0]) : null);
    setAddOption('null');
    setCount(1);
    setError('')
  }

  return (
    <Fragment>
      <Message link='/cart' isOpen={cartSuccess} message="Item added to cart" linkText='View cart' />
      <Message link='/user/wishlist' isOpen={wishListSuccess} message="Wishlist updated!" linkText='Wishlists' />

      <Modal
        width="450px"
        header="Select option"
        placeholder="Confirm"
        isOpen={openModal}
        conditions={() => error && error.length >= 1}
        buttonAction={() => {
          if (product.addOptions.length >= 1 && (addOption == 'null' || addOption == null)) {
            setError(`Please select ${product.addOptionTitle.toLowerCase()}`);
          } else {
            setOpenModal(false);
            addToCart(selectedOption, selectedOptionCount, addOption, count, false);
            resetState();
          }
        }}
        modalAction={setOpenModal}
        cancelAction={() => (setOpenModal(false), resetState())}
        disableClick={false}
      >
        {
          (error && error.length >= 1) && (
            <Notification>{error}</Notification>
          )
        }
        {
          JSON.parse(selectedOption) == null ? (
            <Assets.Option 
              src={loadImage(product.store.username, `600-main-0`, false, false, product.session)}
              loader={<div style={{marginRight: '20px'}}><Skeleton width={80} height={100} /></div>}
            />
          ) : (
            <Assets.Option
              src={loadImage(product.store.username, JSON.parse(selectedOption).fileUrl, false, false, product.session)}
              loader={<div style={{marginRight: '20px'}}><Skeleton width={80} height={100} /></div>}
            />
          )
        }
        <p style={{ color: '#D8453A', fontWeight: 600 }}>
          Rs {
            JSON.parse(selectedOption) ? (
              formatNumber(
                JSON.parse(selectedOption) !== null
                  ? JSON.parse(selectedOption).price +
                (JSON.parse(addOption) == null ? 0 : JSON.parse(addOption).price) +
                (product.store.vatRegistered ? (JSON.parse(selectedOption) !== null && JSON.parse(selectedOption).addedVAT) : 0)
                : null
              )
            ) : (product.addOptions.length >= 1 && (JSON.parse(selectedOption) == null)) ? (
              formatNumber(
                product.price +
                (addOption !== 'null' ? JSON.parse(addOption).price : 0) +
                (product.store.vatRegistered ? product.addedVAT : 0)
              )
            ) : null
          }
        </p>
        <Option
          selectedOption={selectedOption}
          addOption={addOption}
          addOptions={product.addOptions}
          addOptionTitle={product.addOptionTitle}
          options={product.options}
          setSelectedOption={setSelectedOption}
          setAddOption={setAddOption}
          setError={setError}
        ></Option>
        <AddOption
          options={product.addOptions}
          addOptions={product.addOptions}
          selectedOptionCount={selectedOptionCount}
          setOptionCount={setOptionCount}
          selectedOption={selectedOption}
          purchaseLimit={product.purchaseLimit}
          setError={setError}
        />
      </Modal>

      <Container className={conditions}>
        <div>
          <div style={{ position: 'relative' }}>
            <Badges.Default>
              {product.options.length >= 1 ? parseInt(product.options[0].discount) : parseInt(product.discount)}% OFF
            </Badges.Default>
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
                  loader={<Wooper><Skeleton /></Wooper>}
                />
              </Common.Containers.Image>
            </Common.Links.Normal>
          </div>
          <Wrappers.Info>
            <div style={{ minHeight: '120px' }}>
              <Title to={{ pathname: `/${product.store.username}/product/${product.id}` }}>
                {formatTextLen(product.title, 6)}
              </Title>

              <div style={{ display: 'flex', margin: 'auto 0' }}>
                <ReactStars
                  count={5}
                  value={product.rating}
                  color1={"#bababa"}
                  color2={"#EF5131"}
                  edit={false}
                  size={18}
                />
                <span style={{ fontSize: '13px', margin: 'auto 0', marginLeft: '10px' }}>
                  {product.ratingCount ? product.ratingCount : 0}
                </span>
              </div>

              <div style={{ display: 'block', margin: '10px 0px' }}>
                <Common.Currency>Rs</Common.Currency> <Price>
                  {
                    product.options.length >= 1
                      ? formatNumber(product.options[0].price + (product.store.vatRegistered ? product.options[0].addedVAT : 0))
                      : formatNumber(product.price + (product.store.vatRegistered ? product.addedVAT : 0))
                  }
                </Price>
              </div>

              <StoreName to='/'>{product.store.companyName}</StoreName>
            </div>

            {
              (spaceError && spaceError.length >= 1) && (
                <Animations.FadeIn>
                  <Common.Messages.Error>{spaceError}</Common.Messages.Error>
                </Animations.FadeIn>
              )
            }
            <Wrappers.Button>
              <Cart
                hidden={product.options.length !== 0}
                value={count}
                onChange={(e) => {
                  if (e.target.value <= 0) {
                    setCount(1);
                  } else if (
                    (e.target.value <= product.purchaseLimit)
                    && (e.target.value <= parseInt(product.quantity))
                  ) {
                    setCount(e.target.value);
                  };
                }}
                type="number"
              />
              <Buttons.Purchase
                onClick={() => {
                  if (product.options.length >= 1 || product.addOptions.length >= 1) {
                    setOpenModal(true)
                    setSelectedOption(product.options.length >= 1 ? JSON.stringify(product.options[0]) : null);
                    setOptionCount(1);
                    setAddOption('null');
                  } else {
                    addToCart(null, null, addOption, count, false);
                  }
                }}
              >
                <ButtonLoader
                  loading={hocLoading}
                  placeholder={product.options.length >= 1 ? 'Select Option' : 'Add To Cart'}
                  color="secondary"
                />
              </Buttons.Purchase>
            </Wrappers.Button>

          </Wrappers.Info>
        </div>
      </Container>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (storeName, name, product) => {
      dispatch(addItem(storeName, name, product))
    },
    resetCount: () => dispatch(resetCount()),
    getSubTotal: () => dispatch(getSubTotal())
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(ProductHOC()(ProductItem));
export default 
graphql(
  Tags.Cart.Mutations.set, { name: 'set' }
)(graphql(
  Tags.Cart.Mutations.reset, { name: 'reset' }
)(graphql(
  Tags.Cart.Mutations.setSubTotal, { name: 'setSubTotal' }
)(graphql(
  Tags.Sessions.Mutations.setId, { name: 'setId' }
)(graphql(
  Tags.Product.Mutations.checkStock, { name: 'checkStock' }
)(component)))))
