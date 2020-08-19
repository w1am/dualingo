import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles';
import DisplayImage from './DisplayImage';
import Information from './Information';
import ImageController from './ImageController';
import { withRouter } from 'react-router-dom';

const { Common, Product, Navigation } = Styles;
const { TopNav: { Icon } } = Navigation;

const Main = ({ product, coupon, match: { params: { storeName } } }) => {
  const [ selected, setSelected ] = useState(null);
  const [ selectedImage, setSelectedImage] = useState(null);
  const [ currentStock, setCurrentStock ] = useState(null);
  const [ currentlySelected, setCurrentlySelected ] = useState(null);
  const [ addOption, setAddOption ] = useState('null');

  useEffect(() => {
    if (product.options.length >= 1) {
      setSelected(product.options[0]);
      setCurrentlySelected(product.options[0].fileUrl)
    }
    return () => {
      setSelected(null);
      setCurrentlySelected(null)
    }
  }, [ product ])

  return (
    <Product.CurrProduct.Container>
      <div>
        <DisplayImage
          selectedImage={selectedImage} selected={selected} product={product} 
        />
        <ImageController
          selected={selected}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          product={product}
        />
      </div>
      <Product.CurrProduct.Information.Container>
        <Information
          coupon={coupon}
          setSelectedImage={setSelectedImage}
          setCurrentlySelected={setCurrentlySelected}
          currentStock={currentStock}
          setCurrentStock={setCurrentStock}
          selected={selected}
          setSelected={setSelected}
          setAddOption={setAddOption}
          addOption={addOption}
          product={product}
          storeName={storeName}
        />
      </Product.CurrProduct.Information.Container>
    </Product.CurrProduct.Container>
  )
}

export default withRouter(Main);
