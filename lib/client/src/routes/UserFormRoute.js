import React, { useEffect } from 'react';
import { Styles } from '../styles';
const { Common, Forms } = Styles;
import UserLogin from '../forms/UserLogin';
import UserRegister from '../forms/UserRegister';
import { withRouter } from 'react-router-dom';

const UserFormRoute = ({ history, props: { match: { params: { tab } } }, setActiveTab }) => {
  useEffect(() => {
    setActiveTab(tab);
  }, [])

  return (
    <Forms.Container>
      {
        tab == 'login' ? (
          <UserLogin />
        ) : tab == 'register' ? (
          <UserRegister />
        ) : history.push('/user/auth/login')
      }
    </Forms.Container>
  )
}

export default withRouter(UserFormRoute);
