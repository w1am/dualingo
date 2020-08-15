import React, { useState } from 'react';
import { Styles } from '../styles';
import { useMutation } from '@apollo/react-hooks';
import ButtonLoader from '../components/loaders/ButtonLoader';
import Message from '../components/messages/Notification';
import FormHOC from '../HOC/FormHOC';
import { Tags } from '../tags';
const { User, Pin } = Tags;

const inputs = [ 'name', 'email', 'phone', 'password', 'confirmPassword' ];
const headers = [ 'Name', 'Email Address', 'Mobile Phone', 'Password', 'Confirm Password' ];

const { Common, Forms, Animations } = Styles;
const { Messages } = Common;
const { Register } = Forms.User;
const { Layout, Container } = Register;

const UserRegister = ({ onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading }) => {
  const [ registerUser ] = useMutation(User.Mutations.register);
  const [ createPin ] = useMutation(Pin.Mutations.createPin);

  const [ serverResponse, setServerResponse ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ emailSuccess, setEmailSuccess ] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const hasErrors = onFormSubmit();
    if (!hasErrors) {
      const res = await registerUser({
        variables: {
          email: formData['email'].value,
          name: formData['name'].value,
          password: formData['password'].value
        }
      });
      const { ok, error } = res.data.registerUser;
      if (ok) {
        setLoading(false);
        setSuccess(true);
        const pinRes = await createPin({
          variables: {
            email: formData['email'].value,
            password: Math.floor(Math.random() * 989128901283912).toString()
          }
        });
        if (pinRes.data.createPin) {
          setEmailSuccess(true);
          setTimeout(() => {
            setEmailSuccess(false);
          }, 10000)
        }
      } else {
        setServerResponse(error.message);
        setLoading(false);
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <div>
      <Message link={null} isOpen={success} message="Register successful!" linkText={null} />
      <Message link={null} isOpen={emailSuccess} message="Email verification sent!" linkText={null} />

      <Common.Headers.Page>Register</Common.Headers.Page>

      <Layout>
        {
          inputs.map((field, index) => (
            <Container key={index}>
              <Common.Form.Wrapper>
                <Common.Form.Identifier>{headers[index]}</Common.Form.Identifier>
                <Common.Form.Input
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
      </Layout>

      {
        (serverResponse && serverResponse.length >= 1) && (
          <Animations.FadeIn>
            <Messages.Error>{serverResponse}</Messages.Error>
          </Animations.FadeIn>
        )
      }

      <br />

      <Common.Buttons.Auth disabled={hasErrors || loading} onClick={onSubmit}>
        <ButtonLoader color="primary" placeholder="Register" loading={loading} />
      </Common.Buttons.Auth>

      <Common.Links.Small to='/user/auth/login' style={{ marginTop: 15 }}>
        Already have an account? Click to Log in
      </Common.Links.Small>
    </div>
  )
}

export default FormHOC({ inputs })(UserRegister); 
