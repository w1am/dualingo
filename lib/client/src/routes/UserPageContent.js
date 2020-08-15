import React from 'react';
import { Styles } from '../styles';
import Orders from './user/Orders';
import WishLists from './user/WishLists';
import Incomplete from './user/Incomplete';

const { Common, Stores } = Styles;

const UserPageContent = ({ props: { match: { params: { tab, name }} }, setActiveTab }) => {
  return (
    <div>
      {
        tab == 'orders' ? (
          <Stores.Content.Wrappers.Page>
            <Common.Headers.Page>Order History</Common.Headers.Page>
            <Common.Presentation>
              <Orders />
            </Common.Presentation>
          </Stores.Content.Wrappers.Page>
        ) : tab == 'incomplete' ? (
          <Stores.Content.Wrappers.Page>
            <Incomplete />
          </Stores.Content.Wrappers.Page>
        ) : tab == 'wishlist' ? (
          <Stores.Content.Wrappers.Page>
            <WishLists />
          </Stores.Content.Wrappers.Page>
        ) : null
      }
    </div>
  )
}

export default UserPageContent;
