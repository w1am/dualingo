import React, { useState, Fragment } from 'react';
import { isAuthenticated } from '../../utils/verifyUser';
import { useMutation } from '@apollo/react-hooks';
import { Tags } from '../../tags';
import { Styles } from '../../styles';
import Notification from '../../components/Notification';
import Message from '../../components/messages/Notification';

const { Common } = Styles;

const Alert = ({}) => {
  const [ createPin ] = useMutation(Tags.Pin.Mutations.createPin);
  const [ refreshToken ] = useMutation(Tags.User.Mutations.refreshToken);
  const [ success, setSuccess ] = useState(false);

  const sendEmail = async () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    await createPin({
      variables: {
        email: isAuthenticated().email,
        password: Math.floor(Math.random() * 989128901283912).toString()
      }
    });
  }

  if (isAuthenticated().ok && !isAuthenticated().valid) {
    return (
      <Fragment>
        <Message link={null} isOpen={success} message="Email sent successfully" linkText={null} />
        <Notification type="normal">
          Your email is not verified yet. Check your email address or <Common.Links.Normal onClick={() => sendEmail()} to='#'>
            click here</Common.Links.Normal> to resend.
        </Notification>
      </Fragment>
    )
  } else {
    return null
  }
}

export default Alert;
