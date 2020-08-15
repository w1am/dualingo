import React, { Fragment } from 'react';
import { Styles } from '../../styles';
import { isAuthenticated } from '../../utils/verifyUser';
import History from '../../assets/icons/history.png';
import Order from '../../assets/icons/order.png';
import Wishlist from '../../assets/icons/wishlist.png';

const { Sidebars, Common, Navigation } = Styles;
const { Container, Links } = Sidebars.User;
const { TopNav: { Icon } } = Navigation;

const UserSidebar = ({}) => {
  return (
    <Container>
      <Common.Headers.Sub style={{ paddingLeft: 10 }}>MENU</Common.Headers.Sub>
      {
        isAuthenticated().ok && (
          <Fragment>
            <Links.Sidebar activeClassName='onActive' to='/user/orders'>
              <Icon src={History} /><p style={{ margin: 'auto 0' }}>Order History</p>
            </Links.Sidebar>
            <Links.Sidebar activeClassName='onActive' to='/user/incomplete'> 
              <Icon src={Order} /><p style={{ margin: 'auto 0' }}>Incomplete Orders</p>
            </Links.Sidebar>
          </Fragment>
        )
      }
      <Links.Sidebar activeClassName='onActive' to='/user/wishlist'>
        <Icon src={Wishlist} /><p style={{ margin: 'auto 0' }}>Wishlist</p>
      </Links.Sidebar>
    </Container>
  )
}

export default UserSidebar;
