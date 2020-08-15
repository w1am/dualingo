import React from 'react';
import { Styles } from '../styles';
const { Table } = Styles; 

const TableImagePreview = React.memo(({ generateImagePreview, index }) => {
  return (
    <Table.Image.Preview
      src={ generateImagePreview(index) }
    />
  )
})

export default TableImagePreview;
