import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Styles } from '../../styles';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from '../../utils/verifyUser';
import { categories } from '../../shared/categories';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const { Common, Sidebars, Animations } = Styles;
const { App } = Sidebars;
const { Wrappers, Containers, Links } = App;

const Text = styled.p`
  margin: 0px;
`

const Layout = styled.div`
  border-bottom: 1px solid #EBEBEB;
  &:last-child {
    border-bottom: 0px;
  }
`

const AccountLinks = [
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
  },

  {
    identifier: 'Accessibility',
    items: [
      isAuthenticated().ok && { name: 'Order History', path: '/user/orders' },
      isAuthenticated().ok && { name: 'Incomplete Orders', path: '/user/incomplete' },
      { name: 'Wishlist', path: '/user/wishlist' },
      isAuthenticated().email == 'william@inorbit.com' && { name: 'Dashboard', path: '/dashboard' }
    ]
  }
]

const StoreLinks = [
  { name: 'Orders', path: '/orders' },
  { name: 'Pages', path: '/pages' },
  { name: 'Products', path: '/products' },
  { name: 'Settings', path: '/settings' },
  { name: 'Features', path: '/features' },
]

const Sidebar = ({ isOpen, setIsOpen, match }) => {
  const [ activate, setActivate ] = useState({});
  const [ storeName, setStoreName ] = useState(null)

  const onUpdate = (key) => {
    const obj = Object.assign({}, activate);
    obj[key] = activate[key] ? !activate[key] : true;
    setActivate(obj);
  }

  const outsideClick = useRef();

  useEffect(() => {
    const path = window.location.pathname;
    const format = path.split('/').slice(1);
    if (format[0] == 'store') {
      setStoreName(format[1])
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, []);

  const handleClickOutside = event => {
    if (outsideClick.current && !outsideClick.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <Containers.App ref={outsideClick} isOpen={isOpen}>
      {
        isOpen && (
          <Fragment>
            {/* Categories */}
            <Wrappers.Link>
              <Links.App active={activate['categories']} onClick={() => onUpdate('categories')}>
                <Text>Categories</Text>
                <Common.Icons.Default
                  style={{ margin: 'auto 0', opacity: '0.5' }}
                  icon={activate['categories'] ? faCaretDown : faCaretUp}
                />
              </Links.App>

              <Containers.Link className={ activate['categories'] ? 'open' : 'close' }>
                {
                  categories.map(cat => (
                    <Links.Sub onClick={() => setIsOpen(false)} to={{ pathname: cat.path }} key={cat.id}>{cat.name}</Links.Sub>
                  ))
                }
              </Containers.Link>
            </Wrappers.Link>

            
            {/* Account */}
            <Wrappers.Link>
              <Links.App active={activate['account']} onClick={() => onUpdate('account')}>
                <Text>Account</Text>
                <Common.Icons.Default
                  style={{ margin: 'auto 0', opacity: '0.5' }}
                  icon={activate['account'] ? faCaretDown : faCaretUp}
                />
              </Links.App>

              <Containers.Link className={ activate['account'] ? 'open' : 'close' }>
                {
                  AccountLinks.map((link, index) => (
                    <Layout key={index}>
                      <Common.Headers.Sub style={{ paddingLeft: 20, marginBottom: 5, marginTop: 15 }}>
                        {link.identifier.toUpperCase()}
                      </Common.Headers.Sub>
                      {
                        link.items.map((item, key) => {
                          if (item) {
                            return <Links.Sub onClick={() => setIsOpen(false)} to={{ pathname: item.path }} key={key}>{item.name}</Links.Sub>
                          }
                        })
                      }
                    </Layout>
                  ))
                }
              </Containers.Link>
            </Wrappers.Link>

            {/* Store */}
            {
              ((isAuthenticated().ok) && (isAuthenticated().stores.length >= 1)) && (
                <Wrappers.Link>
                  <Links.App active={activate['store']} onClick={() => onUpdate('store')}>
                    <Text>Store</Text>
                    <Common.Icons.Default
                      style={{ margin: 'auto 0', opacity: '0.5' }}
                      icon={activate['store'] ? faCaretDown : faCaretUp}
                    />
                  </Links.App>

                  <Containers.Link className={ activate['store'] ? 'open' : 'close' }>
                    {
                      StoreLinks.map((link, index) => (
                        <Links.Sub
                          onClick={() => setIsOpen(false)}
                          to={{ pathname: `/store/${isAuthenticated().stores[0].username}${link.path}` }}
                          key={index}
                        >{link.name}</Links.Sub>
                      ))
                    }
                    <Links.Sub
                      onClick={() => setIsOpen(false)}
                      to={{ pathname: `/merchant/dashboard/upload/${isAuthenticated().stores[0].username}` }}
                      key={12}
                    >Upload Product</Links.Sub>
                  </Containers.Link>
                </Wrappers.Link>
              )
            }
          </Fragment>
        )
      }
    </Containers.App>
  )
}

export default withRouter(Sidebar);
