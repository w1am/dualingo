import React from 'react';
import { loadImage } from '../../utils/imageFormatter';

import { Styles } from '../../styles';
const { Product: { CurrProduct: { ImgController } } } = Styles;

const ImageController = ({ product, setSelectedImage, selectedImage, selected, setCurrentlySelected, currentlySelected }) => {
  const { fileUrl, options, session, store: { username } } = product;

  return (
    <ImgController.Layout>
      {
        fileUrl.map((file, x) =>
          <ImgController.Image
            key={x}
            currentlySelected={(currentlySelected !== null && currentlySelected) == file}
            onClick={() => {
              setSelectedImage(`600-main-${x}`);
              setCurrentlySelected(`600-main-${x}`)
            }}
            src={loadImage(username, `600-main-${x}`, false, false, session)}
          />
        )
      }
      {
        options.map((option, y) =>
          <ImgController.Image
            key={y}
            currentlySelected={(currentlySelected !== null && currentlySelected) == option.fileUrl}
            onClick={() => {
              setSelectedImage(`600-option-${y}`)
              setCurrentlySelected(`600-option-${y}`)
            }}
            src={loadImage(username, `600-option-${y}`, false, false, session)}
          />
        )
      }
    </ImgController.Layout>
  )
}

export default ImageController;
