import React, { useState } from 'react';
import { Styles } from '../styles';
import { useMutation } from '@apollo/react-hooks';
import { Tags } from '../tags';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import ButtonLoader from '../components/loaders/ButtonLoader';
import AppModal from '../containers/AppModal';
import FormHOC from '../HOC/FormHOC';
import Message from '../components/messages/Notification';
import Notification from '../components/Notification';

const { Common, Forms, Animations } = Styles;
const { Messages } = Common;
const { User, Pin } = Tags;

const inputs = [ 'email', 'password' ];
const headers = [ 'Email Address', 'Password' ];

const UserLogin = ({ onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading, location: { search } }) => {
  const [ forgotModal, setForgotModal ] = useState(false);
  const [ savePassword, setSavePassword ] = useState(true);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ serverResponse, setServerResponse ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ forgotLoading, setForgotLoading ] = useState(false);
  const [ emailSuccess, setEmailSuccess ] = useState(false);
  const [ error, setError ] = useState('');

  const [ loginUser ] = useMutation(User.Mutations.login);
  const [ sendEmail ] = useMutation(Pin.Mutations.sendEmail);
  const [ findUser ] = useMutation(User.Mutations.findUser);

  const values = queryString.parse(search)

  const onSubmit = async () => {
    setLoading(true);
    const hasErrors = onFormSubmit();
    if (!hasErrors) {
      const res = await loginUser({
        variables: {
          email: formData['email'].value,
          password: formData['password'].value,
          save: savePassword
        }
      });
      const { ok, error, token } = res.data.loginUser;
      if (ok) {
        if (savePassword) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        };
        setSuccess(true);
        window.scrollTo(0, 0);
        setTimeout(() => {
          if (values.redirect == 'true' && values.to == 'cart') {
            location.assign('/cart');
          } else {
            location.assign('/');
          }
        }, 1000)
      } else {
        setServerResponse(error.message);
        setLoading(false);
      }
    }
  }

  const modalSubmit = async () => {
    setForgotLoading(true)

    let userRes = await findUser({ variables: { email } })
    const { ok } = await userRes.data.findUser;

    if (!ok) {
      setError('This user does not exist')
      setForgotLoading(false)
    } else {
      const res = await sendEmail({
        variables: { email, password: Math.floor(Math.random() * 989128901283912).toString() }
      });
      if (res.data.sendEmail) {
        setForgotLoading(false)
        setForgotModal(false);

        setEmailSuccess(true);
        setTimeout(() => {
          setEmailSuccess(false);
        }, 10000)
      } else {
        setForgotLoading(false)
      }
    }
  }

  return (
    <div>
      <AppModal
        width="500px"
        header="Forgot Password"
        isOpen={forgotModal}
        modalAction={setForgotModal}
        cancelAction={() => setForgotModal(false)}
        loading={forgotLoading}
        buttonAction={modalSubmit}
        conditions={() => false}
        placeholder="Send"
      >
        {
          (error && error.length >= 1) && (
            <Notification>{error}</Notification>
          )
        }
        <Common.Description>
          Enter your email address you used to register. We'll send you an email with a link to reset your password.
        </Common.Description>
        <Common.Form.Identifier>Email Address</Common.Form.Identifier>
        <Common.Form.Input
          onChange={e => setEmail(e.target.value)}
          onKeyPress={e => {
            if (e.key == 'Enter') {
              modalSubmit()
            }
          }}
          value={email}
        />
      </AppModal>

      <Message link={null} isOpen={success} message="Welcome back!" linkText={null} />
      <Message link={null} isOpen={emailSuccess} message="Email has been sent!" linkText={null} />

      <Common.Headers.Page>Log In</Common.Headers.Page>

      {
        inputs.map((field, index) => (
          <Common.Form.Wrapper key={index}>
            <Common.Form.Identifier>{headers[index]}</Common.Form.Identifier>
            <Common.Form.Input
              onKeyPress={e => {
                if (e.key == 'Enter') {
                  onSubmit()
                }
              }}
              type={ field == 'password' ? showPassword ? 'text' : 'password' : 'text' }
              error={formData[field] && formData[field].error.length >=1}
              name={field}
              onChange={e => (onInputChange(e), clearInputField(field, e))}
            />
            {
              (formData[field] && formData[field].error) && (
                <Animations.FadeIn>
                  <Messages.Error>{formData[field].error}</Messages.Error>
                </Animations.FadeIn>
              )
            }
          </Common.Form.Wrapper>
        ))
      }

      <Common.Form.Check.Wrapper style={{ padding: 0 }}>
        <Common.Form.Check.Input id='show_password' checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
        <Common.Form.Check.Label htmlFor='show_password'>Show password</Common.Form.Check.Label>
      </Common.Form.Check.Wrapper>

      <Common.Form.Check.Wrapper>
        <Common.Form.Check.Input id='checkbox_password' checked={savePassword} onChange={() => setSavePassword(!savePassword)} />
        <Common.Form.Check.Label htmlFor='checkbox_password'>Stay signed in</Common.Form.Check.Label>
      </Common.Form.Check.Wrapper>

      {
        (serverResponse && serverResponse.length >= 1) && (
          <Animations.FadeIn>
            <Messages.Error>{serverResponse}</Messages.Error>
          </Animations.FadeIn>
        )
      }

      <br />

      <Common.Buttons.Auth disabled={hasErrors || loading} onClick={onSubmit}>
        <ButtonLoader color="primary" placeholder="Sign in" loading={loading} />
      </Common.Buttons.Auth>

      <Common.Links.Small onClick={() => setForgotModal(true)} to="#" style={{ marginTop: 15 }}>
        Forgot password?
      </Common.Links.Small>
    </div>
  )
}

const component = FormHOC({ inputs })(UserLogin); 
export default withRouter(component);
