import React, { useState } from 'react';
import { Styles } from '../../styles';
import AddOptionsTable from './AddOptionsTable';

const { Common, Animations } = Styles;
const { Messages } = Common;

const AddOptions = ({
  checked,
  addOption,
  setAddOption,
  customOptions,
  setCustomOptions,
  customOption,
  setCustomOption,
  tempCustomOption,
  setTempCustomOption,
  onInputChange,
  clearInputField,
  formData,
  ix,
  setIx
}) => {
  const onUpdateCustomOption = (id, name, price) => {
    let customOptions = Object.assign({}, customOption);
    customOptions[id] = { name, price };
    setCustomOption(customOptions);
  };

  console.log(customOption)
  console.log(customOptions)

  if (checked) {
    return (
      <div style={{ marginTop: 20 }}>
        <Animations.FadeIn>
          <Common.Form.Identifier>Additional Option title</Common.Form.Identifier>
          <Common.Form.Wrapper style={{width: '315px'}}>
            <Common.Form.Input
              error={formData['addOptionTitle'] && formData['addOptionTitle'].error.length >=1}
              value={formData['addOptionTitle'] !== undefined && formData['addOptionTitle'].value}
              name='addOptionTitle'
              onChange={e => (onInputChange(e), clearInputField('addOptionTitle', e))}
            />
            {
              (formData['addOptionTitle'] && formData['addOptionTitle'].error) && (
                <Animations.FadeIn>
                  <Messages.Error>{formData['addOptionTitle'].error}</Messages.Error>
                </Animations.FadeIn>
              )
            }
          </Common.Form.Wrapper>

          <Common.Form.Wrapper>
            <Common.Form.Input
              name='addOptions'
              onKeyPress={e => {
                if (e.key == 'Enter') {
                  if (e.target.value.length < 1) {
                    setCurrCustomOption('');
                  } else {
                    setCustomOptions([ ...customOptions, { key: Math.random(), value: e.target.value } ])
                    onUpdateCustomOption(ix, e.target.value, 0);
                    setIx(ix + 1)
                    e.target.value = '';
                  }
                }
              }}
              placeholder="Type options"
            />
            {
              (formData['addOptions'] && formData['addOptions'].error) && (
                <Animations.FadeIn>
                  <Messages.Error>{formData['addOptions'].error}</Messages.Error>
                </Animations.FadeIn>
              )
            }
          </Common.Form.Wrapper>
      
          <AddOptionsTable
            customOptions={customOptions}
            customOption={customOption}
            setCustomOption={setCustomOption}
            tempCustomOption={tempCustomOption}
            setTempCustomOption={setTempCustomOption}
            onUpdateCustomOption={onUpdateCustomOption}
            setCustomOptions={setCustomOptions}
          />
        </Animations.FadeIn>
      </div>
    )
  } else return null
}

export default AddOptions;
