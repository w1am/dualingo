import React from 'react';
import { Styles } from '../../styles';
import ButtonLoader from '../../components/loaders/ButtonLoader';
import { withRouter } from 'react-router-dom';

const { Common, Tabs } = Styles;

const FormNavigator = ({ onSubmit, hasErrors, conditions, loading, placeholder, history }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 10,
        marginTop: 10 
      }}
    >
      <p style={{ margin: 0 }}>
        <Common.Buttons.Default onClick={() => history.goBack()}>
          Back
        </Common.Buttons.Default>
      </p>
      <p style={{ margin: 0 }}>
        <Common.Buttons.Auth disabled={loading || hasErrors || conditions()} onClick={onSubmit}>
          <ButtonLoader color="primary" placeholder={placeholder} loading={loading} />
        </Common.Buttons.Auth>
      </p>
    </div>
  )
}

export default withRouter(FormNavigator);
