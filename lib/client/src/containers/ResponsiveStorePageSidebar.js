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
      <Responsives.Store.Container>
        <div>
          <div style={{ display: 'flex' }}>
            <Store.Logo src={loadImage(merchant.username, 'logo', true, false)} />
            <Icon icon={faCog} />
          </div>
          <div style={{ padding: 5 }}>
            <Common.Headers.Identifier>{merchant.companyName}</Common.Headers.Identifier>

            <Store.Info.Header>Contact Info:</Store.Info.Header>
            <Store.Info.Desc>{merchant.address}</Store.Info.Desc>
          </div>
        </div>

        <div>
          <Links.Sidebar to='#'>Settings</Links.Sidebar>
          <Links.Sidebar to='#'>Customize Pages</Links.Sidebar>
          <Links.Sidebar to='#'>Orders</Links.Sidebar>
          <Links.Sidebar
            onClick={() => location.assign(`/merchant/dashboard/upload/${name}/${data.findCurrentMerchant.id}`)}
            to='#'>Upload Product
          </Links.Sidebar>
        </div>
      </Responsives.Store.Container>
    )
  }
}

export default withRouter(ResponsiveStorePageSidebar);
