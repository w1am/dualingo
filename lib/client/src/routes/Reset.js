import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Styles } from '../styles';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tags } from '../tags';
import styled from 'styled-components';
import Success from '../assets/success.png';
import Invalid from '../assets/invalid.png';
import PageLoader from '../components/loaders/PageLoader'
import FormNavigator from '../components/navigators/FormNavigator';
import FormHOC from '../HOC/FormHOC';
import Message from '../components/messages/Notification';
const { Common, Forms, Animations } = Styles;
const { Messages } = Common;
const { Register } = Forms.User;
const { Layout, Container } = Register;

const Header = styled.h1`
  color: #333333;
`
const Text = styled.p`
  color: rgba(0, 0, 0, 0.7)
`
const Image = styled.img`
  height: 50px;
  width: 50px;
  margin-bottom: 10px;
`

const inputs = [ 'password', 'confirmPassword' ];
const headers = [ 'Password', 'Confirm Password' ];

const Reset = ({ history, location: { search }, onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading }) => {
  const values = queryString.parse(search)

  const [ resetPassword ] = useMutation(Tags.User.Mutations.resetPassword);
  const [ success, setSuccess ] = useState(false);

  const { loading: pinLoading, data: pinData } = useQuery(Tags.Pin.Queries.getForgot, {
    variables: { email: values.email, password: values.auth }
  });

  useEffect(() => {
    if (!pinLoading) {
      if (!pinData.getForgot) {
        history.push('/')
      }
    }
  }, [ pinData ])

  const onSubmit = async () => {
    const hasErrors = onFormSubmit();
    if (!hasErrors) {
      const res = await resetPassword({ variables: { email: values.email, newPassword: formData['password'].value } });
      if (res.data.resetPassword) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000)
      }
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Message link='/user/auth/login' isOpen={success} message="Password reset successfull" linkText='login' />

      <Common.Headers.Page>Reset Password</Common.Headers.Page>
      <Common.Presentation>
        {
          inputs.map((field, index) => (
            <Container key={index}>
              <Common.Form.Wrapper>
                <Common.Form.Identifier>{headers[index]}</Common.Form.Identifier>
                <Common.Form.Input
                  disabled={pinLoading}
                  onKeyPress={e => {
                    if (e.key == 'Enter') {
                      onSubmit()
                    }
                  }}
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
            </Container>
          ))
        }

        <FormNavigator placeholder="Reset" loading={loading} hasErrors={hasErrors} onSubmit={onSubmit} />
      </Common.Presentation>
    </div>
  )
}

const component = FormHOC({ inputs })(Reset);
export default withRouter(component);
