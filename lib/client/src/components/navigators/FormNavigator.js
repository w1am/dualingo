import React from 'react';
import { Styles } from '../../styles';
import ButtonLoader from '../../components/loaders/ButtonLoader';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const { Common, Tabs } = Styles;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin-top: 10px;
  @media (max-width: 400px) {
    flex-direction: column-reverse;
  };
`

const FormNavigator = ({ onSubmit, hasErrors, conditions, loading, placeholder, history, responsive }) => {
  return (
    <Layout>
      <p style={{ margin: 0 }}>
        <Common.Buttons.Default responsive onClick={() => history.goBack()}>
          Back
        </Common.Buttons.Default>
      </p>
      <p style={{ margin: 0, marginBottom: 10 }}>
        <Common.Buttons.Auth responsive disabled={loading || hasErrors || conditions()} onClick={onSubmit}>
          <ButtonLoader color="primary" placeholder={placeholder} loading={loading} />
        </Common.Buttons.Auth>
      </p>
    </Layout>
  )
}

export default withRouter(FormNavigator);
