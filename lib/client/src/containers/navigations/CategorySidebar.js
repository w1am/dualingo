import React from 'react';
import { Styles } from '../../styles';
import { isAuthenticated } from '../../utils/verifyUser';
import Popular from '../../assets/icons/popular.png';
import Stores from '../../assets/icons/stores.png';
import Wishlist from '../../assets/icons/wishlist.png';

const { Sidebars, Common, Navigation } = Styles;
const { Container, Links } = Sidebars.Category;
const { TopNav: { Icon } } = Navigation;

const categories = [
  { name: 'Popular', path: '/' },
  { name: 'Gadgets', path: '/' },
  { name: 'Accesories', path: '/' },
  { name: 'Hobbies', path: '/' },
  { name: 'Home Decor', path: '/' },
  { name: 'Household Supplies', path: '/' },
  { name: 'Fashion', path: '/' },
  { name: 'Shoes', path: '/' },
  { name: 'Baby & Kids', path: '/' },
  { name: 'Wallet & Bags', path: '/' },
  { name: 'Phone Upgrades', path: '/' },
  { name: 'Tools', path: '/' },
  { name: 'Tops', path: '/' },
  { name: 'Pet Accesories', path: '/' },
  { name: 'Stationary', path: '/' },
  { name: 'Underwear', path: '/' },
  { name: 'Kitchen', path: '/' },
  { name: 'Bottoms', path: '/' },
  { name: 'Stationary', path: '/' }
]

const CategorySidebar = ({ scrollToRef, sidebarRef, type }) => {
  return (
    <Container>
      <Common.Headers.Sub>Shop by Category</Common.Headers.Sub>
      {
        categories.map((cat, index) => (
          <Links.Sidebar
            key={index}
            activeClassName='onActive'
            onClick={() => scrollToRef(sidebarRef)}
            to={{ pathname: `/${type}/${cat.name}` }}
          >{cat.name}</Links.Sidebar>
        ))
      }
    </Container>
  )
}

export default CategorySidebar;
