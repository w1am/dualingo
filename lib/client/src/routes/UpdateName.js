import React, { useState } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import FormNavigator from '../components/navigators/FormNavigator';
import { useMutation } from '@apollo/react-hooks';
import { isAuthenticated } from '../utils/verifyUser';
import { withRouter } from 'react-router-dom';
import Message from '../components/messages/Notification';
const { Common } = Styles;

const UpdateName = ({ history }) => {
  const [ success, setSuccess ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ name, setName ] = useState(isAuthenticated().name);
  const [ updateName ] = useMutation(Tags.User.Mutations.updateName);

  const onSubmit = async () => {
    setLoading(true);
    let res = await updateName({ variables: { email: isAuthenticated().email, name } });
    if (res.data.updateName) {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 2000)
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Message link={null} isOpen={success} message="Name Updated!" linkText={null} />
      <br />
      <Common.Headers.Page>Change Your Name</Common.Headers.Page>
      <Common.Presentation>
        <Common.Form.Identifier>Name</Common.Form.Identifier>
        <Common.Form.Input onKeyPress={e => {
          if (e.key == 'Enter') {
            onSubmit()
          }
        }} value={name} onChange={e => setName(e.target.value)} /> <br />
        <Common.Description>
          Changing your name might affect past orders. The update will take effect immediately.
        </Common.Description>

        <FormNavigator placeholder="Confirm" loading={loading} hasErrors={false} onSubmit={onSubmit} />
      </Common.Presentation>
    </div>
  )
}

export default withRouter(UpdateName);
