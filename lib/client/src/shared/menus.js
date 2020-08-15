import CategoryIcon from '../assets/icons/category.png';
import AccountIcon from '../assets/icons/account.png';
import { isAuthenticated } from '../utils/verifyUser';

export const menus = [
  // Account
  {
    icon: AccountIcon,
    name: 'Account',
    dropdown: [
      [
        {
          identifier: 'Account',
          items: isAuthenticated().ok ? (
            [
              { name: 'My Profile', path: '/profile' },
              { name: 'Sign Out', path: '/signout' }
            ]
          ) : (
            [
              { name: 'User Login', path: '/user/auth/login' },
              { name: 'Join Flex', path: '/user/auth/register' }
            ]
          ) 
        },

        {
          identifier: 'Merchant',
          items: (isAuthenticated().ok && isAuthenticated().stores.length >= 1) ? (
            [ { name: 'My Stores', path: '/profile' } ]
          ) : (
            [ { name: 'Merchant Register', path: '/merchant/auth/register' } ]
          )
        }
      ],

      [
        {
          identifier: 'Accessibility',
          items: [
            isAuthenticated().ok && { name: 'Order History', path: '/user/orders' },
            isAuthenticated().ok && { name: 'Incomplete Orders', path: '/user/incomplete' },
            { name: 'Wishlist', path: '/user/wishlist' },
            isAuthenticated().email == 'william@inorbit.com' && { name: 'Dashboard', path: '/dashboard' }
          ]
        },
      ] 
    ]
  },

  // Categories
  {
    icon: CategoryIcon,
    name: 'Categories',
    dropdown: [
      [
        {
          identifier: 'Categories',
          items: [
            { name: 'Gadgets', path: '/category/Gadgets' },
            { name: 'Accesories', path: '/category/Accesories' },
            { name: 'Hobbies', path: '/category/Hobbies' },
            { name: 'Home Decor', path: '/category/Home Decor' },
            { name: 'Household Supplies', path: '/category/Household Supplies' },
            { name: 'Fashion', path: '/category/Fashion' },
            { name: 'Shoes', path: '/category/Shoes' },
            { name: 'Baby & Kids', path: '/category/Baby & Kids' },
          ]
        },
      ],

      [
        {
          identifier: null,
          items: [
            { name: 'Wallet & Bags', path: '/category/Wallet & Bags' },
            { name: 'Phone Upgrades', path: '/category/Phone Upgrades' },
            { name: 'Tools', path: '/category/Tools' },
            { name: 'Tops', path: '/category/Tops' },
            { name: 'Pet Accesories', path: '/category/Pet Accesories' },
            { name: 'Stationary', path: '/category/Stationary' },
            { name: 'Underwear', path: '/category/Underwear' },
            { name: 'Kitchen', path: '/category/Kitchen' },
          ]
        },
      ],

      [
        {
          identifier: null,
          items: [
            { name: 'Bottoms', path: '/category/Bottoms' },
            { name: 'Stationary', path: '/category/Stationary' },
          ]
        },
      ]
    ]
  },

  // Stores
]
