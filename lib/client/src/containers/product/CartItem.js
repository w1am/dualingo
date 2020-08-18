import React, { Fragment } from 'react';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import { deleteItem, resetCount, getSubTotal } from '../../actions/productActions';
import Control from '../../components/product/Control';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Common, Cart } = Styles;
const { Assets, Layouts, Headers, Wrappers, Paragraphs } = Cart;
import styled from 'styled-components';
import { Tags } from '../../tags';
import { useMutation } from '@apollo/react-hooks';

const Wrapper = styled.div`
  width: 120px;
  height: 120px;
  white-space: nowrap;
  text-align: center;
  margin: 1em 0;
  @media (max-width: 612px) {
    width: 80px;
    height: 80px;
  };
  @media (max-width: 412px) {
    width: 50px;
    height: 80px;
  };
`

const CartItem = ({ purchases, errors, setErrors, storeName, name, delivery, deliveryFee, deleteItem, resetCount, getSubTotal, history }) => {
  const [ delItem ] = useMutation(Tags.Cart.Mutations.delItem);
  const [ setSubTotal ] = useMutation(Tags.Cart.Mutations.setSubTotal);
  const [ reset ] = useMutation(Tags.Cart.Mutations.reset);

  const onDelete = async (id, option, addOption) => {
    const format = `${id}-${option}-${addOption}`;
    deleteItem(storeName, name, format);
    resetCount();
    getSubTotal();
    await delItem({ variables: { storeName, name, identifier: format } });
    await reset();
    await setSubTotal();
  }

  return (
    <div>
      {
        (purchases && purchases.length <= 0 || purchases == undefined) ? null : purchases.map((purchase, index) => {
          return (
            <Fragment key={index}>
              <Layouts.Item key={index} style={{ border: errors.indexOf(purchase.itemId) > -1 ? '1px solid red' : '1px solid transparent' }}>
                <div style={{ display: 'flex' }}>
                  <Wrapper>
                    <Assets.Product src={loadImage(storeName, purchase.fileUrl, false, false, purchase.session)} />
                  </Wrapper>
                  <Wrappers.Item>
                    <Headers.Title to={{ pathname: `/${storeName}/product/${purchase.itemId}` }}>{purchase.title}</Headers.Title>
                    <Headers.Price>MUR {formatNumber(purchase.price)} (x{ purchase.count })</Headers.Price>
                    <Paragraphs.Option>
                      { purchase.option && purchase.option }
                      { (purchase.option && purchase.addOption) && `, ` }
                      { purchase.addOption && purchase.addOption }
                    </Paragraphs.Option>
                    <Control
                      setErrors={setErrors}
                      count={purchase.count}
                      option={purchase.option}
                      addOption={purchase.addOption}
                      id={purchase.itemId}
                      storeName={storeName}
                      name={name}
                      quantity={purchase.quantity}
                      delivery={delivery}
                      deliveryFee={deliveryFee}
                    />
                  </Wrappers.Item>
                </div>
                <Common.Icons.Trash
                  onClick={() => onDelete(purchase.itemId, purchase.option, purchase.addOption)}
                  style={{ margin: 'auto 0' }}
                  icon={faTrashAlt}
                />
              </Layouts.Item>
              {
                (errors.indexOf(purchase.itemId) > -1) && (
                  <Common.Messages.Error>This product is out of stock. try decreasing count</Common.Messages.Error>
                )
              }
            </Fragment>
          )
        })
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (storeName, name, identifier) => {
      dispatch(deleteItem(storeName, name, identifier))
    },
    resetCount: () => {
      dispatch(resetCount())
    },
    getSubTotal: () => dispatch(getSubTotal())
  }
}

const component = connect(null, mapDispatchToProps)(CartItem);
export default withRouter(component);


