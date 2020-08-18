import React from 'react';
import { Styles } from '../styles';
import { loadImage } from '../utils/imageFormatter';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tags } from '../tags';
import { Query } from 'react-apollo';
const { Page: { Queries } } = Tags;

const { Common, Sidebars } = Styles;
const { Responsives, Store } = Sidebars;
const { Links } = Store;

const Icon = styled(FontAwesomeIcon)`
  color: #3d3d3d;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    color: #262626;
  }
`

const ResponsiveStorePageSidebar = ({ data, loading, match: { params: { name }, url }, activeTab, setActiveTab }) => {
  if (loading) {
    return null
  } else {
    const { findCurrentMerchant: merchant } = data;
    return (
      <select>
        <option>Orders</option>
        <option>Pages</option>
        <option>Products</option>
        <option>Settings</option>
        <option>Upload Product</option>
        <option>Features</option>
      </select>
    )
  }
}

export default withRouter(ResponsiveStorePageSidebar);
