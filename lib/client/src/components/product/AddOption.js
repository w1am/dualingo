import React from 'react';
import { Styles } from '../../styles';
const { Common } = Styles;

const AddOption = ({ setError, options, addOptions, setOptionCount, selectedOptionCount, selectedOption, purchaseLimit }) => {
  return (
    <div style={{ marginTop: '6px' }} hidden={false}>
      <Common.Form.Identifier>Quantity</Common.Form.Identifier>
      <Common.Form.Input
        onChange={e => {
          setError('');
          if (e.target.value <= 0) {
            setOptionCount(1)
          } else if (
            JSON.parse(selectedOption) !== null
            && (e.target.value <= purchaseLimit)
            && (e.target.value <= JSON.parse(selectedOption).quantity)
          ) {
            setOptionCount(parseInt(e.target.value))
          };
        }}
        value={selectedOptionCount}
        type="number"
      />
    </div>
  )
}

export default AddOption;
