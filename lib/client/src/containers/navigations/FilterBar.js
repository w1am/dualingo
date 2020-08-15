import React from 'react';
import { Styles } from '../../styles';
const { Common, Filter } = Styles;
const { Containers } = Filter;

const FilterBar = ({}) => {
  return (
    <Containers.Tool>
      <select>
        <option>Price</option>
      </select>
    </Containers.Tool>
  )
}

export default FilterBar;
