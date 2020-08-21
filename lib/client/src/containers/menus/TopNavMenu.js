import React, { useState } from 'react';
import { Styles } from '../../styles';
import Skeleton from 'react-loading-skeleton';
const { TopNav: { Icon, Menu } } = Styles.Navigation;

import TopNavDropdown from '../../components/dropdowns/TopNavDropdown';

const TopNavMenu = ({ menu }) => {
  const [ openMenu, setOpenMenu ] = useState(false);

  return (
    <Menu.Wrapper>
      <Menu.Item.Wrapper
        openMenu={openMenu}
        onMouseEnter={() => setOpenMenu(true)} 
        onMouseLeave={() => setOpenMenu(false)} 
      >
        <Icon
          src={menu.icon}
          loader={<div style={{ marginRight: 5 }}><Skeleton height={20} width={20} /></div>}
        />
        <Menu.Item.Name>
          { menu.name }
        </Menu.Item.Name>
      </Menu.Item.Wrapper>
      <TopNavDropdown dropdown={menu.dropdown} openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </Menu.Wrapper>
  )
}

export default TopNavMenu;
