import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { faTimesCircle, faCheck, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Styles } from '../../styles';
import ImagePreview from '../../components/ImagePreview';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const { Common, DropImage, Animations } = Styles;
const { Messages } = Common;

const ProductImage = ({ formData, clearInputField, image, setImage, match: { params }, location: { search } }) => {
  const values = queryString.parse(search);

  const onDrop = useCallback((files) => {
    clearInputField('mainImage');
    setImage([...image, ...files]);
  }, [image]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg, image/webp'
  })

  const generateImageList = useCallback(() => {
    let previews = [];
    for (let i = 0; i <= image.length - 1; i++) {
      previews.push(image[i]);
    };
    return previews;
  }, [image])

  const onImagePreviewDelete = useCallback((name) => {
    let filteredImagePreview = image;
    filteredImagePreview = [...filteredImagePreview].filter(img => {
      return (img.name !== name)
    });
    setImage(filteredImagePreview);
  }, [image]);


  return (
    <div>
      <Common.Description>
        Selecting a high resolution product image sells your product more.
      </Common.Description>

      <DropImage.Container {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragReject ? (
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <DropImage.Icon style={{color: '#a34f4f'}} icon={faTimesCircle} />
              <DropImage.HoverLabel style={{color: '#a34f4f'}}>only .jpg .jpeg .png .webp accepted</DropImage.HoverLabel> 
            </div>
          ) : isDragActive ? (
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <DropImage.Icon style={{color: '#58aa63'}} icon={faCheck} />
              <DropImage.HoverLabel style={{color: '#58aa63'}}>Drop the files here</DropImage.HoverLabel> 
            </div>
          ) : (
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <DropImage.Icon icon={faCloudUploadAlt} />
                <DropImage.Label>Drop some files here</DropImage.Label>
              </div>
            )
        }
      </DropImage.Container>
      <ImagePreview
        storeName={params.storeName}
        session={values.session}
        generateImageList={generateImageList}
        onImagePreviewDelete={onImagePreviewDelete}
      />

      {
        (formData['mainImage'] && formData['mainImage'].error) && (
          <Animations.FadeIn>
            <Messages.Error>{formData['mainImage'].error}</Messages.Error>
          </Animations.FadeIn>
        )
      }

      <br />
    </div>
  )
}

export default withRouter(ProductImage);
