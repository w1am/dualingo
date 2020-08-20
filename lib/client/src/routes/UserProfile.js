import React, { Fragment } from 'react';
import { Styles } from '../styles';
import { isAuthenticated } from '../utils/verifyUser';
import { loadImage } from '../utils/imageFormatter';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewStoreImage  from '../assets/new_store.png';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Common, Stores, Animations, User } = Styles;
const { Links } = Stores;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
`

const UserProfile = ({}) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Common.Headers.Page>{isAuthenticated().name.split(' ')[0]}'s Profile</Common.Headers.Page>
      <Common.Presentation>
        <User.Container>

          <User.Layout>
            <Common.Headers.Identifier>General</Common.Headers.Identifier>
            <User.Links.User onClick={() => location.assign('/confirm/reset')} to='#'>Reset Password</User.Links.User>
            <User.Links.User to='/update/name'>Update My Name</User.Links.User>
          </User.Layout>

          <User.Layout>
            <Common.Headers.Identifier>Accessibility</Common.Headers.Identifier>
            <User.Links.User to='/user/orders'>Order History</User.Links.User>
            <User.Links.User to='/user/incomplete'>Incomplete Orders</User.Links.User>
            <User.Links.User to='/user/wishlist'>Wishlist</User.Links.User>
          </User.Layout>

        </User.Container>
      </Common.Presentation>

      <Common.Headers.Page>Published Store</Common.Headers.Page>
      <Common.Presentation>
        <Animations.Fade>
          <Stores.Selector.Container>
            {
              (isAuthenticated().ok && (isAuthenticated().stores.length <= 0)) ? (
                <Links.New to='/merchant/auth/register'>
                  <div style={{ position: 'relative' }}>
                    <Stores.Selector.Logo src={NewStoreImage} />
                  </div>
                  <Stores.Selector.Label>Create Store</Stores.Selector.Label>
                </Links.New>
              ): isAuthenticated().stores.map(store => (
                <Stores.Selector.Layout key={store._id} to={{ pathname: `store/${store.username}` }}>
                  <Stores.Selector.Logo src={loadImage(store.username, 'logo', true, false)} />
                  <Stores.Selector.Label>{store.companyName}</Stores.Selector.Label>
                </Stores.Selector.Layout>
              ))
            }
          </Stores.Selector.Container>
        </Animations.Fade>
      </Common.Presentation>
    </div>
  )
}

export default UserProfile;
