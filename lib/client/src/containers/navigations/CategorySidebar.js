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

const CategorySidebar = ({}) => {
  return (
    <Container>
      {
        categories.map(cat => (
          <Links.Sidebar
            activeClassName='onActive'
            to={{ pathname: `/feed/${cat.name}` }}
          >{cat.name}</Links.Sidebar>
        ))
      }
    </Container>
  )
}

export default CategorySidebar;
