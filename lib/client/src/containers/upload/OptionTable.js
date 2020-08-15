import React, { useState, useCallback } from 'react';
import { Styles } from '../../styles';
import { categories } from '../../shared/categories';
import { faTimes, faUpload, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { loadImage } from '../../utils/imageFormatter';
import TableImagePreview from '../../components/TableImagePreview';
import { isAuthenticated } from '../../utils/verifyUser';
import { isValid, revertNumberFormat, isFormatted } from '../../utils/numberFormatter';
import { formatNumber } from '../../utils/productItemFormatter';

const { Common, Identifier, Animations, Table } = Styles;
const { List } = Identifier;
const { Messages } = Common;

const OptionTable = ({
  uploads,
  setNewUpload,

  optionPrice,
  optionQuantity,
  optionPreviousPrice,
  optionFileUrl,
  setOptionPrice,
  setOptionPreviousPrice,
  setOptionQuantity,
  setOptionFileUrl,

  tempPrice,
  tempPreviousPrice,

  optionTempPrice,
  setOptionTempPrice,

  optionTempPreviousPrice,
  setOptionTempPreviousPrice,

  session,
  formData,
  clearInputField,
  name,
}) => {
  const [ tracker, setTracker ] = useState(0);

  const onUpdatePrice = (id, value) => {
    let prices = Object.assign({}, optionPrice);
    prices[id] = value;
    setOptionPrice(prices);
  };
  const onUpdateTempPrice = (id, value) => {
    let prices = Object.assign({}, optionTempPrice);
    prices[id] = value;
    setOptionTempPrice(prices);
  };

  const onUpdatePreviousPrice = (id, value) => {
    let previousPrices = Object.assign({}, optionPreviousPrice);
    previousPrices[id] = value;
    setOptionPreviousPrice(previousPrices);
  };

  const onUpdateTempPreviousPrice = (id, value) => {
    let previousPrices = Object.assign({}, optionTempPreviousPrice);
    previousPrices[id] = value;
    setOptionTempPreviousPrice(previousPrices);
  };

  const onUpdateQuantity = (id, e) => {
    let quantities = Object.assign({}, optionQuantity);
    if (e.target.value == '') {
      quantities[id] = 0;
    } else {
      quantities[id] = parseInt(e.target.value);
    }
    setOptionQuantity(quantities);
  }
 
  const onUpdateFileUrl = (id, fileUrl) => {
    let fileUrls = Object.assign({}, optionFileUrl);
    fileUrls[id] = fileUrl;
    setOptionFileUrl(fileUrls);
  }

  const onUploadDelete = (key, index) => {
    let filteredUploads = uploads.filter(upload => {
      return (upload.key !== key)
    });
    let prevOptionPriceObj = Object.assign({}, optionPrice);
    let prevOptionPreviousPriceObj = Object.assign({}, optionPreviousPrice);
    let prevOptionQuantityObj = Object.assign({}, optionQuantity);
    // let prevOptionFileUrlObj = Object.assign({}, optionFileUrl);

    delete prevOptionPriceObj[index];
    delete prevOptionPreviousPriceObj[index];
    delete prevOptionQuantityObj[index];
    // delete prevOptionFileUrlObj[index];

    setOptionPrice(prevOptionPriceObj);
    setOptionPreviousPrice(prevOptionPreviousPriceObj);
    setOptionQuantity(prevOptionQuantityObj);
    // setOptionFileUrl(prevOptionFileUrlObj);
    
    setNewUpload(filteredUploads);
  }

  const generateImagePreview = useCallback((index) => {
    if (typeof optionFileUrl[index] == 'object') {
      return URL.createObjectURL(optionFileUrl[index])
    } else {
      return loadImage(name, `600-option-${index}`, false, false, session)
    }
  }, [optionFileUrl]);

  const isInvalidInput = (number, temp, state, index, previousState) => {
    if (formatNumber(parseFloat(previousState[index])) !== number) {
      if (!isValid(number.toString())) {
        temp(index, formatNumber(0))
        state(index, 0)
      } else if (number == '') {
        temp(index, formatNumber(0));
        state(index, 0);
      } else {
        temp(index, number.indexOf(',') > -1 ? number : formatNumber(Math.abs(parseFloat(number.toString(), 10))));
        state(
          index,
          isFormatted(number) ? revertNumberFormat(number) : Math.abs(parseInt(number.toString(), 10))
        );
      }
    }
  }

  return (
    <div style={{overflowX: 'auto'}}>
      <Table.Layout hidden={uploads.length < 1}>
        <Table.Browser>
          <Table.Wrapper>
            <Table.Header>Option</Table.Header>
            <Table.Header>Price</Table.Header>
            <Table.Header>Quantity</Table.Header>
            <Table.Header>Previous Price</Table.Header>
            <Table.Header>Image</Table.Header>
            <Table.Header>Delete</Table.Header>
          </Table.Wrapper>
          {
            uploads.map((upload, index) => {
              return (
                <Table.Wrapper key={upload.key}>
                  <Table.Item style={{ padding: 22 }}>{upload.value}</Table.Item>
                  <Table.Item>
                    <Table.Input
                      value={
                        optionTempPrice[index] !== undefined
                          ? optionTempPrice[index]
                          : (formData['price'] && optionPrice[index] !== 0)
                            ? formatNumber(formData['price'].value)
                            : "0.00"
                      }
                      placeholder="Price"
                      onChange={e => {
                        clearInputField('options');
                        onUpdateTempPrice(index, e.target.value)
                      }}
                      onBlur={(e) => isInvalidInput(
                        e.target.value,
                        onUpdateTempPrice,
                        onUpdatePrice,
                        index,
                        optionPrice
                      )}
                    />
                  </Table.Item>
                  <Table.Item>
                    <Table.Input
                      style={{ minWidth: '100px', maxWidth: '100px' }}
                      min={0}
                      placeholder="Quantity"
                      value={
                        optionQuantity[index] !== undefined
                          ? optionQuantity[index]
                          : (formData['quantity'] !== undefined && optionQuantity[index] !== 0)
                            ? formData['quantity'].value : 0
                      }
                      onChange={e => {
                        clearInputField('options');
                        onUpdateQuantity(index, e);
                      }}
                    />
                  </Table.Item>
                  <Table.Item>
                    <Table.Input
                      placeholder="Previous price"
                      value={
                        optionTempPreviousPrice[index] !== undefined
                          ? optionTempPreviousPrice[index]
                          : (formData['previousPrice'] && optionPreviousPrice[index] !== 0)
                            ? formatNumber(formData['previousPrice'].value)
                            : "0.00"
                      }
                      onChange={e => {
                        clearInputField('options');
                        onUpdateTempPreviousPrice(index, e.target.value)
                      }}
                      onBlur={(e) => isInvalidInput(
                        e.target.value,
                        onUpdateTempPreviousPrice,
                        onUpdatePreviousPrice,
                        index,
                        optionPreviousPrice
                      )}
                    />
                  </Table.Item>
                  <Table.Item style={{minWidth: '70px'}}>
                    <Table.Image.Wrapper>
                      <Table.Image.Icon icon={faUpload} />
                      <TableImagePreview index={index} generateImagePreview={generateImagePreview} />
                      <input
                        accept="image/x-png,image/jpeg,image/jpg"
                        type='file'
                        style={{display: 'none'}}
                        onChange={e => {
                          clearInputField('options');
                          if (e.target.files[0]) {
                            onUpdateFileUrl(index, e.target.files[0])
                          }
                        }} />
                    </Table.Image.Wrapper>
                  </Table.Item>
                  <Table.Item>
                    <Common.Icons.Trash icon={faTrashAlt} onClick={() => onUploadDelete(upload.key, index)} />
                  </Table.Item>
                </Table.Wrapper>
              )
            })
          }
        </Table.Browser>
      </Table.Layout> 
      {
        (formData['options'] && formData['options'].error) && (
          <Animations.FadeIn>
            <Messages.Error>{formData['options'].error}</Messages.Error>
          </Animations.FadeIn>
        )
      }
    </div>
  )
}

export default OptionTable;
