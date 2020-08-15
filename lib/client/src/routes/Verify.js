import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Styles } from '../styles';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tags } from '../tags';
import styled from 'styled-components';
import Success from '../assets/success.png';
import Invalid from '../assets/invalid.png';
import PageLoader from '../components/loaders/PageLoader'
const { Common } = Styles;

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

const Verify = ({ location: { search } }) => {
  const values = queryString.parse(search)
  const [ refreshToken ] = useMutation(Tags.User.Mutations.refreshToken);
  const { loading, data } = useQuery(Tags.Pin.Queries.getPin, {
    variables: { email: values.email, password: values.auth }
  });

  useEffect(() => {
    if (!loading) {
      if (data.getPin) {
        refreshToken({ variables: { email: values.email } }).then(res => {
          const { ok, token } = res.data.refreshToken;
          if (ok) {
            localStorage.setItem('token', token);
            sessionStorage.setItem('token', token);
            setTimeout(() => {
              location.assign('/')
            }, 3000)
          } 
        });
      }
    }
  }, [ data ])

  if (loading) {
    return <div style={{ minHeight: '100vh' }}><PageLoader /></div>
  } else {
    if (data.getPin) {
      return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '35%', left: '50%', textAlign: 'center' }}>
            <Image src={Success} />
            <Header>Email address confirmed</Header>
            <Text>We've successfully updated your email address. You can now login with your email email</Text>
            <Common.Buttons.Eco onClick={() => location.assign('/')}>
              Return Home
            </Common.Buttons.Eco>
            <p style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 14 }}>Redirecting to 3 seconds...</p>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '35%', left: '50%', textAlign: 'center' }}>
            <Image src={Invalid} />
            <Header>Email verification failed!</Header>
            <Text>The verification code does not match our record. Please try again at a later time.</Text>
            <Common.Buttons.Default onClick={() => location.assign('/')}>
              Return Home
            </Common.Buttons.Default>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(Verify);
