import React, { useEffect, useState } from 'react';
import { Styles } from '../../styles';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import OptionContainer from './Option';
import Purchase from './Purchase';
import { withRouter } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import Notification from '../../components/Notification';
import Delivery from '../../assets/icons/delivery.png';
import styled from 'styled-components';

const { Common, Product, Navigation, Animations } = Styles;
const { CurrProduct: { Information, Price, PreviousPrice, Option, Out } } = Product;
const { TopNav: { Icon } } = Navigation;

const Layout = styled.div`
  border: 1px solid #dadee6;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  max-width: 200px; 
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    background: #F9F9F9;
    transition: 0.2s linear;
  };
`

const InformationContainer = ({
  product,
  selected,
  setSelected,
  currentStock,
  setCurrentStock,
  setSelectedImage,
  setCurrentlySelected,
  addOption,
  setAddOption,
  items,
  storeName,
  history
}) => {
  const [ selectedQuantity, setQuantity ] = useState(1);
  const [ error, setError ] = useState('');

  useEffect(() => {
    if (product.options.length >= 1) {
      setCurrentStock(product.options[0].quantity);
    };
  }, []);

  const checkStock = () => {
    if (product.options.length >= 1) {
      if (selected !== null) {
        if (product.purchaseLimit >= selected.quantity) {
          return selected.quantity
        } else {
          return (product.purchaseLimit)
        }
      } else {
        if (product.purchaseLimit >= product.options[0].quantity) {
          return product.options[0].quantity
        } else {
          return product.purchaseLimit
        }
      }
    } else {
      if (product.purchaseLimit >= product.quantity) {
        return product.quantity
      } else {
        return product.purchaseLimit
      }
    }
  }

  return (
    <div>
      <Information.Title>{product.title}</Information.Title>
      <div style={{ display: 'flex', margin: 'auto 0' }}>
        <ReactStars
          count={5}
          value={product.rating}
          color1={"#bababa"}
          color2={"#EF5131"}
          edit={false}
          size={22}
        />
        <span style={{ fontSize: '13px', margin: 'auto 0', marginLeft: '10px' }}>
          {product.ratingCount ? product.ratingCount : 0}
        </span>
      </div>
      <div style={{ margin: '10px 0px' }}>
        {
          product.categories.map((category, index) => (
            <Common.Categories.Item
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => history.push(`/category/${category}`)}
            >{category}</Common.Categories.Item>
          ))
        }
      </div>
      <PreviousPrice hidden={!product.previousPrice}>
        MUR {
          selected !== null && selected
            ? formatNumber(
                selected.previousPrice +
                (addOption == 'null' ? 0 : JSON.parse(addOption).price) +
                (product.store.vatRegistered ? selected.addedVAT : 0)
            ) : product.options.length >= 1
              ? formatNumber(
                  product.options[0].previousPrice +
                  (addOption == 'null' ? 0 : JSON.parse(addOption).price) +
                  (product.store.vatRegistered ? product.options[0].addedVAT : 0)
                )
              : formatNumber(product.previousPrice + (addOption == 'null' ? 0 : JSON.parse(addOption).price) + product.addedVAT)
        }
      </PreviousPrice>
      <div style={{ display: 'flex' }}>
        <Price>
          MUR {
            selected !== null && selected ?
              formatNumber(
                selected.price +
                (addOption == 'null' ? 0 : JSON.parse(addOption).price) +
                (product.store.vatRegistered ? selected.addedVAT : 0)
              )
              : product.options.length >= 1
                ? formatNumber(
                  product.options[0].price +
                  (addOption == 'null' ? 0 : JSON.parse(addOption).price) +
                  (product.store.vatRegistered ? product.options[0].addedVAT : 0)
                )
                : formatNumber(product.price + (addOption == 'null' ? 0 : JSON.parse(addOption).price) +product. addedVAT)
          } 
        </Price>
        {
          product.store.vatRegistered && (
            <span style={{ color: 'green', display: 'block', margin: 'auto 0', marginLeft: 10 }}>
              Incl. VAT
            </span>
          )
        }
      </div>

      <br />
      {
        product.options.length >= 1 && (
          <Common.Form.Identifier style={{ color: '#b12704' }}>Choose option
            {currentStock !== null && ` (${currentStock} Left)`}
          </Common.Form.Identifier>
        )
      }

      <Option.Wrapper>
        {
          product.options.map((option, index) => (
            <OptionContainer
              key={index}
              tracker={index}
              setSelected={setSelected}
              setSelectedImage={setSelectedImage}
              setCurrentStock={setCurrentStock}
              setCurrentlySelected={setCurrentlySelected}
              option={option}
              selected={selected}
              product={product}
            />
          ))
        }
      </Option.Wrapper>

      <Common.Elements.Divider />

      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 10 }} hidden={product.addOptions.length <= 0}>
          <Common.Form.Identifier style={{color: '#b12704'}}>
            {product.addOptions.length >= 1 && product.addOptionTitle}
          </Common.Form.Identifier>
          <select onChange={e => (setAddOption(e.target.value), setError(''))}>
            <option value='null'>Select {product.addOptionTitle.toLowerCase()}</option>
            {
              product.addOptions.map((option, i) => (
                <option key={i} value={JSON.stringify({ name: option.name, price: option.price })}>{option.name}</option>
              ))
            }
          </select>
        </div>

        <div>
          <Common.Form.Identifier style={{color: '#C54230'}}>Quantity</Common.Form.Identifier>
          <select disabled={checkStock() == 0} onChange={e => setQuantity(parseInt(e.target.value))}>
            {
              (checkStock() == 0)
                ? <option>Out of stock</option>
                : [...Array(
                  product.options.length >= 1 ?
                  selected !== null ?
                  product.purchaseLimit >= selected.quantity ?
                  selected.quantity
                  : product.purchaseLimit
                  : product.purchaseLimit >= product.options[0].quantity ?
                  product.options[0].quantity : product.purchaseLimit
                  : product.purchaseLimit >= product.quantity ? product.quantity : product.purchaseLimit 
                )].map((quan, index) => (
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))
            }
          </select>
        </div>
      </div>

      {
        (error && error.length >= 1) && (
          <div style={{ maxWidth: '300px' }}>
            <br />
            <Notification>{error}</Notification>
          </div>
        )
      }

      <br />

      {
        (parseInt(currentStock) <= 0) ? (
          <Animations.Fade>
            <Out.Layout>
              <p style={{ margin: 0, color: 'white' }}>This product is currently out of stock.</p>
            </Out.Layout>
          </Animations.Fade>
        ) : (
          <Purchase
            setError={setError}
            selectedQuantity={selectedQuantity}
            setQuantity={setQuantity}
            addOption={addOption}
            currentStock={currentStock}
            selected={selected}
            product={product}
          />
        )
      }

      {
        (product.store.delivery) && (
          <Layout>
            <Icon style={{ height: 30, display: 'block', margin: 'auto 0' }} src={Delivery} />
            <p style={{ margin: 'auto 0', fontSize: 14, color: '#333333', marginLeft: 8 }}>Delivery Included</p>
          </Layout>
        )
      }

    </div>
  )
}

export default withRouter(InformationContainer);
