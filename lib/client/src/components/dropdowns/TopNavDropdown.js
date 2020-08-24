import React from 'react';
import { Styles } from '../../styles';
import styled from 'styled-components';

const { Common, Animations } = Styles;
const { TopNav } = Styles.Navigation;
const { Menu: { Dropdown } } = TopNav;

const Layout = styled.div`
  z-index: 2;
  &.open {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.1s 0.1s, visible 0.1s 0.1s;
  };
  &.close {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.1s, visible 0.1s;
  }
`

const TopNavDropdown = ({ openMenu, setOpenMenu, dropdown }) => {
  return (
    <Layout className={openMenu ? "open" : "close"}>
      <Dropdown.Layout
        onMouseLeave={() => setOpenMenu(false)}
        onMouseEnter={() => setOpenMenu(true)} 
      >
        <Dropdown.Menu.Layout>
          {
            dropdown.map((menu, x) => (
              <div key={x}>
                {
                  menu.map((list, y) => (
                    <Dropdown.Wrapper key={y}>
                      <Common.Headers.Identifier>
                        {list.identifier ? list.identifier : <br />}
                      </Common.Headers.Identifier>
                      {
                        list.items.map((item, z) => (
                          <Dropdown.Item
                            onClick={() => setOpenMenu(false)}
                            to={{ pathname: item.path }}
                            key={z}
                          >{item.name}
                          </Dropdown.Item>
                        ))
                      }
                    </Dropdown.Wrapper>
                  ))
                }
              </div>
            ))
          }
        </Dropdown.Menu.Layout>
      </Dropdown.Layout>
    </Layout>
  )
}

export default TopNavDropdown;
