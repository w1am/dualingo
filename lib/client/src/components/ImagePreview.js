import React from 'react';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from '../utils/verifyUser';
import { loadImage } from '../utils/imageFormatter';

import { Styles } from '../styles';
const { DropImage, Animations } = Styles;

const ImagePreview = React.memo(({ generateImageList, onImagePreviewDelete, session, storeName }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '18px', maxWidth: '300px' }}>
      {
        generateImageList().map((x, i) => (
          <Animations.FadeIn key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '14px', marginRight: 5 }}>
              <DropImage.Preview
                src={
                  x.type == 'url'
                    ? loadImage(storeName, `600-main-${i}`, false, false, session)
                    : URL.createObjectURL(x)
                }
              />
              <span
                style={{
                  color: '#e52b16',
                  textDecoration: 'underline',
                  fontSize: '13px',
                  padding: '5px 0px',
                  cursor: 'pointer'
                }}
                onClick={() => onImagePreviewDelete(x.name)}
              >
                Remove
              </span>
            </div>
          </Animations.FadeIn>
        ))
      }
    </div>
  )
})

export default ImagePreview;
