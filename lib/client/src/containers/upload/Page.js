import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Tags } from '../../tags';
import { withRouter } from 'react-router-dom';
import { isAuthenticated, storeInfo } from '../../utils/verifyUser';
import Modal from '../../containers/AppModal'

const { Page: { Queries } } = Tags;
const { Common } = Styles;

const Page = ({ history, match: { params }, page, setPage }) => {
  const { loading, data, refetchQuery } = useQuery(Queries.getPages, {
    variables: { storeId: storeInfo(params.storeName)._id },
    pollInterval: 100
  });

  const [ createPage ] = useMutation(Tags.Page.Mutations.createPage);

  const [ newPage, setNewPage ] = useState(false);
  const [ newPageName, setNewPageName ] = useState('');
  const [ newPageLoading, setNewPageLoading ] = useState(false);
  const [ error, setError ] = useState('');

  const onSubmit = async () => {
    const secrets = [ 'orders', 'pages', 'products', 'settings', 'features' ];
    if (newPageName.toLowerCase().includes(secret)) {
      setError('This page name is not allowed');
    } else {
      setNewPageLoading(true);
      const res = await createPage({ variables: { page: newPageName, storeName: params.storeName } });
      if (res.data.createPage) {
        setNewPageLoading(false);
        setNewPage(false);
      }
    }
  }

  useEffect(() => {
    if (!loading) {
      if (data == undefined || data.getPages == null || data.getPages.length == 0) {
        history.push('/')
      }
    }
  }, [ data ])

  return (
    <div>
      <Modal
        width="300px"
        header="New Page"
        isOpen={newPage}
        modalAction={setNewPage}
        buttonAction={onSubmit}
        cancelAction={() => (setNewPage(false), setNewPageName(''))}
        placeholder="Confirm"
        loading={newPageLoading}
        conditions={() => {
          if (newPageName == '' || !newPageName) {
            return true
          }
        }}
      >
        {
          (error && error.length >= 1) && (
            <Notification>{error}</Notification>
          )
        }
        <Common.Form.Wrapper>
          <Common.Form.Identifier>Page Name</Common.Form.Identifier>
          <Common.Form.Input
            value={newPageName}
            onKeyPress={(e) => { if (e.key == 'Enter') { onSubmit() } }}
            onChange={e => setNewPageName(e.target.value)}
            style={{ width: '100%' }}
          />
        </Common.Form.Wrapper>
      </Modal>

      <Common.Form.Identifier>
        Section <Common.Links.Normal to="#" onClick={() => setNewPage(true)}> (Add Section)</Common.Links.Normal>
      </Common.Form.Identifier>
      <Common.Description>
        Used to organize your products to make it easier for customers to browse
      </Common.Description>
      <select value={page} onChange={e => setPage(e.target.value)}>
        {
          loading ? null : data.getPages.map((page, index) => (
            <option value={page} key={index}>{page}</option>
          ))
        }
      </select>
    </div>
  )
}

export default withRouter(Page);
