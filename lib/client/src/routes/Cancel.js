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
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const { Common } = Styles;

const Cancel = ({ location: { search } }) => {
  const values = queryString.parse(search);

  if (values.status == 'success') {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '38%', left: '50%', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 400 }}>Order Cancelled</h1>
            <Common.Icons.Default
              icon={faCheck}
              style={{ color: 'green', paddingRight: 0, paddingLeft: 10, fontSize: 20, margin: 'auto 0' }}
            />
          </div>
          <Common.Description style={{ textAlign: 'center' }}>
            Thanks for shopping with dualingo. Hope you return soon!
          </Common.Description>
          <Common.Buttons.Eco onClick={() => location.assign('/')}>
            Return Home
          </Common.Buttons.Eco>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default withRouter(Cancel);
