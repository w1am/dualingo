import React, { useState, useEffect } from 'react';
import AppLogo from '../../assets/logo.png';
import { Styles } from '../../styles';
import { menus } from '../../shared/menus';
import Cart from '../../assets/icons/shopping-cart.png';
import Bar from '../../assets/icons/bar.png';
import Search from '../../assets/icons/search.png';
import TopNavMenu from '../menus/TopNavMenu';
import TopNavSearch from '../search/TopNavSearch';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { loadCount, loadSubTotal, loadItems } from '../../actions/productActions';
import { Tags } from '../../tags';
import { isAuthenticated } from '../../utils/verifyUser';
import { getCookie } from '../../utils/cookies';

const { Navigation, Common } = Styles;
const { Trackers } = Common;
const { TopNav: { Icon, Menu } } = Navigation;

const TopNav = ({ isOpen, setIsOpen, toggleSearch, setToggleSearch , count, history, loadCount, loadSubTotal, loadItems }) => {
  const { loading: itemsLoading, data: itemsData } = useQuery(Tags.Cart.Queries.getItems);
  const { loading: countLoading, data: countData } = useQuery(Tags.Cart.Queries.getCount);
  const { loading: subTotalLoading, data: subTotalData } = useQuery(Tags.Cart.Queries.getSubTotal);
  const [ setSubTotal ] = useMutation(Tags.Cart.Mutations.setSubTotal);
  const [ reset ] = useMutation(Tags.Cart.Mutations.reset);

  useEffect(() => {
    if (!countLoading && !subTotalLoading && !itemsLoading) {
      if (itemsData.getItems && itemsData.getItems.length >= 1) {
        loadItems(itemsData.getItems);
      };
      loadCount(countData.getCount);
      loadSubTotal(subTotalData.loadSubTotal);
      setSubTotal();
      reset();
    }
  }, [ countData, subTotalData, itemsData ]);

  return (
    <Navigation.TopNav.Container>
      <Common.Links.Normal
        style={{
          margin: 'auto 0',
          paddingLeft: 20,
          position: 'relative',
          top: '-1.2px'
        }}
        to="#"
        onClick={() => location.assign('/')}
      >
        <Common.Containers.Image>
          <Navigation.TopNav.Logo
            src={AppLogo}
            loader={<div style={{ margin: 'auto 0' }}><Skeleton width={120} height={33} /></div>}
          />
        </Common.Containers.Image>
      </Common.Links.Normal>
      <Menu.Layout>
        <Menu.Item.Wrapper onClick={() => history.push('/cart')}>
          <div style={{ margin: 'auto 0', position: 'relative' }}>
            <Icon
              src={Cart}
              loader={<div style={{ marginRight: 5 }}><Skeleton height={20} width={20} /></div>}
            />
            { count >= 1 && <Trackers.Count>{count}</Trackers.Count> }
          </div>
          <Menu.Item.Name style={{ padding: 0, background: 'none' }}>Cart</Menu.Item.Name>
        </Menu.Item.Wrapper>

        {
          menus.map((menu, i) => (
            <TopNavMenu key={i} menu={menu} />
          ))
        }

        <TopNavSearch />
      </Menu.Layout>

      <Menu.Responsive.Layout>
        <Icon
          onClick={() => setIsOpen(!isOpen)}
          style={{ marginLeft: '20px' }} 
          src={Bar}
        />

        <div onClick={() => history.push('/cart')} style={{ margin: 'auto 0', position: 'relative', marginLeft: 20 }}>
          <Icon style={{ display: 'block', margin: 'auto 0' }} src={Cart} />
          { count >= 1 && <Trackers.Count>{count}</Trackers.Count> }
        </div>

        <Icon onClick={() => setToggleSearch(!toggleSearch)} src={Search} />

      </Menu.Responsive.Layout>
    </Navigation.TopNav.Container>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCount: (count) => dispatch(loadCount(count)),
    loadSubTotal: (subTotal) => dispatch(loadSubTotal(subTotal)),
    loadItems: (items) => dispatch(loadItems(items))
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(TopNav);
export default withRouter(component);
