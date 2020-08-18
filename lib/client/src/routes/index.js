import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/verifyUser';

import Home from './Home';
import MerchantForm from './MerchantForm';
import UserForm from './UserForm';
import StorePage from './StorePage';
import UserProfile from './UserProfile';
import UploadPage from './UploadPage';
import Product from './Product';
import Cart from './Cart';
import Settings from './Settings';
import Pages from './Pages';
import Signout from './Signout';
import Shipping from './Shipping';
import Receipt from './Receipt';
import UserPage from './UserPage';
import Overview from './Overview';
import StoreOrderPage from './StoreOrderPage';
import Dashboard from './Dashboard';
import ProductDescription from './ProductDescription';
import ProductView from './ProductView';
import SearchPage from './SearchPage';
import Verify from './Verify';
import Reset from './Reset';
import StoreLocation from './StoreLocation';
import ConfirmReset from './ConfirmReset';
import UpdateName from './UpdateName';
import Cancel from './Cancel';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated().ok ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated().ok ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const StoreRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const stores = isAuthenticated().stores;
      if (isAuthenticated().ok && (isAuthenticated().stores[0].username !== params.name)) {
        return <Component {...props} />
      } else {
        return <Redirect to='/' />
      }
    }}
  />
);

const StorePageRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { match: { params, url } } = props;
      if (isAuthenticated().ok && (isAuthenticated().stores[0].username == params.name)) {
        return <Component {...props} />
      } else {
        return <Redirect to={{ pathname: `/store/${params.name}/Latest` }} />
      }
    }}
  />
);

const StoreUploadRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { match: { params, url } } = props;
      if (isAuthenticated().ok && (isAuthenticated().stores[0].username == params.storeName)) {
        return <Component {...props} />
      } else {
        return <Redirect to='/' />
      }
    }}
  />
);

const UserOverviewRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { match: { params, url } } = props;
      const stores = isAuthenticated().stores;
      if ((params.email == undefined) || (!params.email) || (params.overview == undefined) || (!params.overview)) {
        return <Redirect to='/' />
      } else if (isAuthenticated().ok && (params.email == isAuthenticated().email)) {
        return <Component {...props} />
      } else {
        return <Redirect to='/' />
      }
    }}
  />
);

const MerchantRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated().ok && (isAuthenticated().stores.length >= 1)) {
        return <Redirect to='/' />
      } else {
        return <Component {...props} />
      }
    }}
  />
);

export default () => (
  <Switch>
    <Route path="/reload" exact component={null} key='reload' />
    <Route path='/' exact component={Home} />
    <Route path='/feed/:cat' exact component={Home} />
    <StoreRoute path='/store/orders/:storeName/:shipId' exact component={StoreOrderPage} />
    <StorePageRoute path='/store/:name' component={StorePage} />
    <Route path='/profile' component={UserProfile} />
    <MerchantRoute path='/merchant/auth/register' exact component={MerchantForm} />
    <StoreUploadRoute path='/merchant/dashboard/upload/:storeName' component={UploadPage} />
    <Route path='/merchant/:name/location' exact component={StoreLocation} />
    <PrivateRoute path='/user/auth' component={UserForm} />
    <Route path='/:storeName/product/:id' exact component={Product} />
    <Route path='/cart' exact component={Cart} />
    <AuthRoute path='/confirm/reset' exact component={ConfirmReset} />
    <AuthRoute path='/update/name' exact component={UpdateName} />
    <Route path='/verify' exact component={Verify} />
    <Route path='/reset' exact component={Reset} />
    <Route path='/cancel' exact component={Cancel} />
    <Route path='/category/:cat' exact component={ProductView} />
    <Route path='/search/:query' exact component={SearchPage} />
    <Route path='/signout' exact component={Signout} />
    <Route path='/shipping' exact component={Shipping} />
    <Route path='/receipt' exact component={Receipt} />
    <StoreUploadRoute path='/merchant/:name/product/update/description' exact component={ProductDescription} />
    <UserOverviewRoute path='/user/:email/orders/:overview' exact component={Overview} />
    <Route path='/user' component={UserPage} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
)
