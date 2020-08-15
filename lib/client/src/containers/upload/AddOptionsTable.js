import React from 'react';
import { Styles } from '../../styles';
const { Common, Table } = Styles;
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from '../../utils/productItemFormatter';
import { isValid, revertNumberFormat, isFormatted } from '../../utils/numberFormatter';

const AddOptionsTable = ({ customOptions, setCustomOptions, customOption, setCustomOption, tempCustomOption, setTempCustomOption, onUpdateCustomOption }) => {

  const onUpdateTempCustomOption = (id, name, price) => {
    let customOptions = Object.assign({}, tempCustomOption);
    customOptions[id] = { name, price };
    setTempCustomOption(customOptions);
  };

  const checkInvalidInput = (option, number, temp, state, index, previousState) => {
    if (formatNumber(parseFloat(previousState[index].price)) !== number) {
      if (!isValid(number.toString())) {
        temp(index, option, formatNumber(0))
        state(index, option, 0)
      } else {
        temp(index, option, formatNumber(Math.abs(parseInt(number.toString(), 10))));
        state(index, option, Math.abs(parseInt(number.toString(), 10)));
      }
    }
  }

  const onOptionDelete = (key, index) => {
    let filteredOptions = customOptions.filter(option => {
      return (option.key !== key)
    });
    setCustomOptions(filteredOptions);
    delete customOption[index];
  }

  return (
    <div style={{ overflow: 'scroll' }}>
      <Table.Layout style={{width: '450px'}} hidden={customOptions.length < 1}>
        <Table.Browser>
          <Table.Wrapper>
            <Table.Header>Option</Table.Header>
            <Table.Header>Price (Additional price)</Table.Header>
            <Table.Header>Delete</Table.Header>
          </Table.Wrapper>
          {
            customOptions.map((option, index) => (
              <Table.Wrapper key={index}>
                <Table.Item style={{width: '100px'}}>{option.value}</Table.Item>
                <Table.Item style={{width: '200px'}}>
                  <Common.Form.Wrapper style={{width: '200px'}}>
                    <Common.Form.Input
                      value={ tempCustomOption[index] == undefined ? 0 : tempCustomOption[index].price }
                      onChange={e => onUpdateTempCustomOption(index, option.value, e.target.value)}
                      onBlur={e => {
                        checkInvalidInput(
                          option.value,
                          e.target.value,
                          onUpdateTempCustomOption,
                          onUpdateCustomOption,
                          index,
                          customOption
                        )
                      }}
                      placeholder='Price'
                    />
                  </Common.Form.Wrapper>
                </Table.Item>
                <Table.Item><Common.Icons.Trash onClick={() => onOptionDelete(option.key, index)} icon={faTrashAlt} /></Table.Item>
              </Table.Wrapper>
            ))
          }
        </Table.Browser>
      </Table.Layout>
    </div>
  )
}

export default AddOptionsTable;
