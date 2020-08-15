import React from 'react';
import { Styles } from '../styles';
import { loadImage } from '../utils/imageFormatter';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tags } from '../tags';
import { Query } from 'react-apollo';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { isAuthenticated } from '../utils/verifyUser';

import Settings from '../assets/icons/settings.png';
import Pages from '../assets/icons/pages.png';
import Products from '../assets/icons/products.png';
import Orders from '../assets/icons/orders.png';
import Upload from '../assets/icons/upload.png';
import Features from '../assets/icons/features.png';
import Coupons from '../assets/icons/coupons.png';

const { Page: { Queries } } = Tags;

const { Common, Sidebars, Navigation } = Styles;
const { Store } = Sidebars;
const { Links } = Store;
const { TopNav: { Icon } } = Navigation;

const SettingsIcon = styled(FontAwesomeIcon)`
  color: #3d3d3d;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    color: #262626;
  }
`

const StorePageSideBar = ({ match: { params: { name }, url }, activeTab, setActiveTab }) => {
  const validateUser = (stores) => {
    const pos = stores.map(store => store.username).indexOf(name);
    if (pos > -1) {
      return true
    } else {
      return false
    }
  }

  return (
    <Store.Container>
      <Common.Headers.Sub style={{ paddingLeft: 10 }}>MENU</Common.Headers.Sub>
      <div
        hidden={
          !(isAuthenticated().ok
            && (isAuthenticated().stores
              && isAuthenticated().stores.length >= 1)
            && validateUser(isAuthenticated().stores))
        }>
        <Links.Sidebar activeClassName='onActive' to={{ pathname: `${url}/orders` }}>
          <Icon
            src={Orders}
            loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>}
          /><p style={{ margin: 'auto 0' }}>Orders</p>
        </Links.Sidebar>
        <Links.Sidebar activeClassName='onActive' to={{ pathname: `${url}/pages` }}>
          <Icon src={Pages} loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>} /><p style={{ margin: 'auto 0' }}>Pages</p>
        </Links.Sidebar>
        <Links.Sidebar activeClassName='onActive' to={{ pathname: `${url}/products` }}>
          <Icon loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>} src={Products} /><p style={{ margin: 'auto 0' }}>Products</p>
        </Links.Sidebar>
        <Links.Sidebar activeClassName='onActive' to={{ pathname: `${url}/settings` }}>
          <Icon loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>} src={Settings} /><p style={{ margin: 'auto 0' }}>Settings</p>
        </Links.Sidebar>
        <Links.Sidebar
          onClick={() => location.assign(`/merchant/dashboard/upload/${name}`)}
          to='#'>
          <Icon loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>} src={Upload} /><p style={{ margin: 'auto 0' }}>Upload Product</p>
        </Links.Sidebar>
        <Links.Sidebar
          activeClassName='onActive' to={{ pathname: `${url}/coupons` }}>
          <Icon loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>} src={Coupons} /><p style={{ margin: 'auto 0' }}>Coupons</p>
        </Links.Sidebar>
        <br />
        <Common.Headers.Sub style={{ paddingLeft: 10 }}>ADVANCED</Common.Headers.Sub>
        <Links.Sidebar
          activeClassName='onActive' to={{ pathname: `${url}/features` }}
          >
          <Icon loader={<div style={{ marginRight: 10 }}><Skeleton height={20} width={20} /></div>} src={Features} /><p style={{ margin: 'auto 0' }}>Features</p>
        </Links.Sidebar>
      </div>
    </Store.Container>
  )
}

export default withRouter(StorePageSideBar);
