import React from 'react';
import { Styles } from '../../styles';
import styled from 'styled-components';

const { Common, Animations } = Styles;
const { TopNav } = Styles.Navigation;
const { Menu: { Dropdown } } = TopNav;

const TopNavDropdown = ({ openMenu, setOpenMenu, dropdown }) => {
  return (
    <Dropdown.Layout
      hidden={!openMenu}
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
  )
}

export default TopNavDropdown;
