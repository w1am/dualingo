import React from 'react';
import { Styles } from '../../styles';
const { Common } = Styles;

const Option = ({ setError, options, setSelectedOption, selectedOption, addOptions, addOptionTitle, setAddOption, addOption }) => {
  return (
    <div style={{ display: 'flex' }}>
      {
        (options.length >= 1) && (
          <div style={{ marginRight: '10px' }}>
            <Common.Form.Identifier>Select option</Common.Form.Identifier>
            <select
              value={JSON.parse(selectedOption) ? JSON.parse(selectedOption).name : ''}
              onChange={e => (setSelectedOption(e.target.value), setError(''))}
            >
              {
                options.map((opt, i) => (
                  <option value={JSON.stringify(opt)} key={i}>{opt.name}</option>
                ))
              }
            </select>
          </div>
        )
      }

      {
        (addOptions.length >= 1 && addOptionTitle) && (
          <div>
            <Common.Form.Identifier>{addOptions.length >= 1 && addOptionTitle}</Common.Form.Identifier>
            <select value={addOption} onChange={e => (setAddOption(e.target.value), setError(''))}>
              <option value='null'>Select {addOptionTitle.toLowerCase()}</option>
              {
                addOptions.map((option, i) => (
                  <option value={JSON.stringify({ name: option.name, price: option.price })} key={i}>{option.name}</option>
                ))
              }
            </select>
          </div>
        )
      }
    </div>
  )
}

export default Option;
