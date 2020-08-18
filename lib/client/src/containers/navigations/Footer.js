import React from 'react';
import { Styles } from '../../styles';
const { Common, Footer: Foot } = Styles;
const { Containers, Menus, Links } = Foot;

const Footer = ({}) => {
  return (
    <Containers.App>
      <Containers.Menu>

        <Menus.Item>
          <Links.Menu to='/'>Home</Links.Menu>
          <Links.Menu to='/user/wishlist'>Wishlist</Links.Menu>
          <Links.Menu to='/user/orders'>Order History</Links.Menu>
          <Links.Menu to='/merchant/auth/register'>Sell</Links.Menu>
        </Menus.Item>

        <Menus.Item>
          <Links.Menu to="https://www.facebook.com">Facebook</Links.Menu>
          <Links.Menu to="https://www.instagram.com">Instagram</Links.Menu>
          <Links.Menu to="https://www.twitter.com">Twitter</Links.Menu>
        </Menus.Item>

        <Menus.Item>
          <Links.Menu to="/cart">Cart</Links.Menu>
          <Links.Menu to="/user/incomplete">Incomplete Orders</Links.Menu>
        </Menus.Item>

        {/* <Menus.Item> */}
        {/*   <Links.Menu>Hello World</Links.Menu> */}
        {/* </Menus.Item> */}

      </Containers.Menu>
    </Containers.App>
  )
}

export default Footer;
