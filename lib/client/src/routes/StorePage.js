import React, { useEffect, useState, Fragment } from 'react';
import StorePageSideBar from '../containers/StorePageSideBar';
import { isAuthenticated } from '../utils/verifyUser';
import { useQuery } from '@apollo/react-hooks';
import { Tags } from '../tags';
import InfoToolbar from '../components/store/InfoToolbar';
import ProductItem from '../components/ProductItem';
import StorePageContent from './StorePageContent';
import ResponsiveStorePageSidebar from '../containers/ResponsiveStorePageSidebar';
import StoreNav from '../containers/navigations/StoreNav';
import { Route, withRouter } from 'react-router-dom';
import { Styles } from '../styles';

const { Common, Stores, Animations } = Styles;
const { Merchant, Product } = Tags;

const otherPages = [ 'pages', 'settings', 'products' ]

const StorePage = ({ match: { params: { name, tab }, url, path }, history }) => {
  const { loading, data } = useQuery(Merchant.Queries.findCurrentMerchant, {
    variables: { username: name }
  });

  const [ activeTab, setActiveTab ] = useState(null);

  const checkOwner = (stores) => {
    const pos = stores.map(store => store.username).indexOf(name);
    return pos;
  }

  // useEffect(() => {
  //   if (isAuthenticated().ok && checkOwner(isAuthenticated().stores) > -1) {
  //     history.push(`${url}/orders`)
  //   } else {
  //     history.push(`${url}/Latest`)
  //     setActiveTab('Latest')
  //   }
  // }, [ data ])

  return (
    <Fragment>
      <Stores.Content.Wrappers.Content style={{ maxWidth: '100%', overflow: 'none' }}>
        {
          (isAuthenticated().ok && checkOwner(isAuthenticated().stores) > -1) && (
            <StorePageSideBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )
        }

        <Stores.Content.Containers.Content
          className={ isAuthenticated().ok && checkOwner(isAuthenticated().stores) > -1 ? 'authed' : 'unauthed' }
          style={{ width: '100%' }}
        >
          {/* <ResponsiveStorePageSidebar */}
          {/*   loading={loading} */}
          {/*   data={data} */}
          {/*   activeTab={activeTab} */}
          {/*   setActiveTab={setActiveTab} */}
          {/* /> */}

          {/* <InfoToolbar */}
          {/*   loading={loading} */}
          {/*   data={data} */}
          {/*   activeTab={activeTab} */}
          {/*   setActiveTab={setActiveTab} */}
          {/* /> */}

          <Animations.FadeIn>
            <Route
              path={`${path}/:tab`}
              render={props => <StorePageContent data={data} loading={loading} props={props} setActiveTab={setActiveTab} />}
            />
          </Animations.FadeIn>
        </Stores.Content.Containers.Content>
      </Stores.Content.Wrappers.Content>
    </Fragment>
  )
}

export default withRouter(StorePage);
