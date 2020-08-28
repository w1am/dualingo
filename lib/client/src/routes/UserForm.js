import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
const { Common, Tabs } = Styles;
import { Route } from 'react-router-dom';
import UserFormRoute from './UserFormRoute';

const pages = [
  'Login',
  'Register'
]

const UserForm = ({ history, match: { url, path } }) => {
  const [ activeTab, setActiveTab ] = useState(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (path == '/user/auth' && (pathname.split('/')[3] == undefined || pathname.split('/')[3] == '')) {
      history.push(`${url}/login`)
    }
  }, []);

  return (
    <Common.Wrappers.Page style={{ minHeight: '100vh' }}>
      <Common.Headers.Page>User Login</Common.Headers.Page>

      <div style={{ maxWidth: '500px' }}>
        <Tabs.Layout>
          {
            pages.map((page, index) => (
              <Tabs.Link
                key={index}
                active={activeTab}
                current={page.toLowerCase()}
                to={{ pathname: `${url}/${page.toLowerCase()}` }}
                onClick={() => setActiveTab(page.toLowerCase())}
              >
                <Tabs.Label active={activeTab} current={page}>{page}</Tabs.Label>
              </Tabs.Link>
            ))
          }
        </Tabs.Layout>

        <Route path={`${path}/:tab`} render={props => <UserFormRoute props={props} setActiveTab={setActiveTab} />} />
      </div>
    </Common.Wrappers.Page>
  )
}

export default UserForm; 
