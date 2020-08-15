import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import styled from 'styled-components';
import UserSidebar from '../containers/navigations/UserSidebar'
import { Route, withRouter } from 'react-router-dom';
import UserPageContent from './UserPageContent';

const { Common, Table, Sidebars, Stores } = Styles;

const UserPage = ({ match: { params: { name }, url, path }, history }) => {
  const [ activeTab, setActiveTab ] = useState(null);
  return (
    <div>
      <Common.Containers.Page style={{ maxWidth: '100%', overflow: 'none' }}>
        <UserSidebar />
        <Common.Wrappers.Content style={{ width: '100%' }}>
          <Route
            exact
            path={`${path}/:tab`}
            render={props => <UserPageContent props={props} setActiveTab={setActiveTab} />}
          />
        </Common.Wrappers.Content>
      </Common.Containers.Page>
    </div>
  )
}

export default withRouter(UserPage);
