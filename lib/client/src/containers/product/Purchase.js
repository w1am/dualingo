import React, { Fragment, useState } from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import { faPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { addItem, resetCount, getSubTotal } from '../../actions/productActions';
import { connect } from 'react-redux';
import ProductHOC from '../../HOC/ProductHOC'
import { graphql } from 'react-apollo';
import Message from '../../components/messages/Notification';
import styled from 'styled-components';
import { Tags } from '../../tags';
import ReactLoading from 'react-loading';

const { Common, Product } = Styles;
const { CurrProduct } = Product;

const Layout = styled.div`
  display: flex;
  @media (max-width: 370px) {
    display: block;
  }
`

const Purchase = ({
  selected, currentStock, addOption, selectedQuantity, setQuantity, product, addToCart, getSubTotal,
  spaceError, hocLoading, cartSuccess, resetCart, setError
}) => {
  const onClickEvent = (buy) => {
    if (product.addOptions.length >= 1 && addOption == 'null') {
      setError(`Please select ${product.addOptionTitle}`)
    } else {
      if (product.options.length >= 1 || product.addOptions.length >= 1) {
        addToCart(JSON.stringify(selected), selectedQuantity, addOption, selectedQuantity, null);
      } else {
        addToCart(null, null, addOption, selectedQuantity, null);
      };
      if (buy) {
        location.assign(`/cart`)
      }
    }
  }

  return (
    <Layout>
      <div>
        <Message link='/cart' reset={resetCart} isOpen={cartSuccess} message="Item added to cart" linkText='View cart' />
        <CurrProduct.Purchase.Cart disabled={parseInt(currentStock) <= 0} onClick={() => onClickEvent(false)}>
          {
            hocLoading ? (
              <ReactLoading
                type="spin"
                color='white'
                height="16px"
                width="16px"
              />
            ) : (
              <Fragment>
                <Common.Icons.Default
                  style={{ color: 'white', paddingLeft: 0 }}
                  icon={faPlus}
                /> Add to cart
              </Fragment>
            )
          }
        </CurrProduct.Purchase.Cart>
      </div>

      <CurrProduct.Purchase.Buy disabled={parseInt(currentStock) <= 0} style={{ marginLeft: 10 }} onClick={() => onClickEvent(true)}>
        <Fragment>
          <Common.Icons.Default
            style={{ color: 'white', paddingLeft: 0 }}
            icon={faShoppingCart}
          /> Buy now
        </Fragment>
      </CurrProduct.Purchase.Buy>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (storeName, name, product) => dispatch(addItem(storeName, name, product)),
    resetCount: () => dispatch(resetCount()),
    getSubTotal: () => dispatch(getSubTotal())
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(ProductHOC()(Purchase));
export default 
graphql(
  Tags.Cart.Mutations.set, { name: 'set' }
)(graphql(
  Tags.Cart.Mutations.reset, { name: 'reset' }
)(graphql(
  Tags.Cart.Mutations.setSubTotal, { name: 'setSubTotal' }
)(graphql(
  Tags.Product.Mutations.checkStock, { name: 'checkStock' }
)(component))))
