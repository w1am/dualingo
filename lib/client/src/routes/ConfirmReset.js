import React, { useState } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useMutation } from '@apollo/react-hooks';
import { isAuthenticated } from '../utils/verifyUser';
import { withRouter } from 'react-router-dom';
import Message from '../components/messages/Notification';
const { Common } = Styles;

const ConfirmReset = ({ history }) => {
  const [ success, setSuccess ] = useState(false);
  const [ createPin ] = useMutation(Tags.Pin.Mutations.createPin);

  const sendEmail = async () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    setTimeout(() => {
      location.assign('/profile')
    }, 3000);

    await createPin({
      variables: {
        email: isAuthenticated().email,
        password: Math.floor(Math.random() * 989128901283912).toString()
      }
    });
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Message link={null} isOpen={success} message="Email sent successfully" linkText={null} />

      <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '35%', left: '50%' }}>
        <Common.Presentation>
          <Common.Headers.Page style={{ textAlign: 'center' }}>Confirm reset password?</Common.Headers.Page>
          <Common.Description>We'll send you an email with a link to reset your password.</Common.Description>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '170px', margin: '0px auto' }}>
            <Common.Buttons.Default onClick={() => history.goBack()}>Cancel</Common.Buttons.Default>
            <Common.Buttons.Auth onClick={() => sendEmail()}>Confirm</Common.Buttons.Auth>
          </div>
        </Common.Presentation>
      </div>
    </div>
  )
}

export default withRouter(ConfirmReset);
