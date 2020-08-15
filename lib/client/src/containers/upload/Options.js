import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { Styles } from '../../styles';

const { Common } = Styles;

const Options = ({
  uploads,
  setNewUpload,
  setOptionPrice,
  setOptionPreviousPrice,
  setOptionQuantity,
  optionPrice,
  optionPreviousPrice,
  optionQuantity,
  formData
}) => {
  const [ option, setOption ] = useState('');
  const [ tempUploads, setTempUpload ] = useState([]);
  const [ tracker, setTracker ] = useState(0);
  const [ error, setError ] = useState('');

  return (
    <div>
      <Common.Form.Identifier>Options (Hit enter after typing each option)</Common.Form.Identifier>

      <Common.Form.Input
        style={{ width: '100%' }}
        value={option}
        onChange={(e) => {
          if ((e.target.value.split(" ").length >= 5) || e.target.value.length >= 20) {
            setOption("");
            setError('Options must short and simple 😉');
          } else {
            setOption(e.target.value);
          }
        }} onKeyPress={(e) => {
          if (e.key == 'Enter' && option.trim().length >= 1) {
            if (uploads.length >= 7) {
              setError('Too many');
            } else {
              if (tempUploads.indexOf(option.toLowerCase()) < 0) {
                setNewUpload([...uploads, { key: tracker, value: option.trim() }]);

                let optionPriceObj = Object.assign({}, optionPrice);
                let optionPreviousPriceObj = Object.assign({}, optionPreviousPrice);
                let optionQuantityObj = Object.assign({}, optionQuantity);

                optionPriceObj[tracker] = formData['price'] !== undefined ? formData['price'].value : 0;
                optionPreviousPriceObj[tracker] = formData['previousPrice'] !== undefined ? formData['previousPrice'].value : 0;
                optionQuantityObj[tracker] = formData['quantity'] !== undefined ? formData['quantity'].value : 0;

                setOptionPrice(optionPriceObj);
                setOptionPreviousPrice(optionPreviousPriceObj);
                setOptionQuantity(optionQuantityObj);

                let prevTracker = tracker;
                setTracker(prevTracker += 1);
                e.target.value = '';
                setOption('');
                setError('');
              } else {
                setError('Option already exists');
              }
            }
          }
        }
        } placeholder='Eg. Charcoal Red...' />
    </div>
  )
}

export default Options;
