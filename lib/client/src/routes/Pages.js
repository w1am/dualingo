import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PageItem from '../components/PageItem';
import { storeInfo } from '../utils/verifyUser';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from '../containers/AppModal';
import { faChevronRight, faChevronLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PageLoader from '../components/loaders/PageLoader';
import Notification from '../components/Notification';

const { Common, Table } = Styles;

const Pages = ({ match: { params: { name } } }) => {
  const [ newPage, setNewPage ] = useState(false);
  const [ newPageName, setNewPageName ] = useState('');

  const [ page, setPage ] = useState(1);
  const [ len, setLen ] = useState(0);
  const [ limit, setLimit ] = useState(10);
  const [ purchases, setPurchases ] = useState([]);
  const [ error, setError ] = useState('');

  const { loading, data } = useQuery(Tags.Product.Queries.storeProducts,
    { variables: { storeName: name, filter: null, tab: page, limit }
  });
  const [ createPage ] = useMutation(Tags.Page.Mutations.createPage);

  const onSubmit = async () => {
    const secrets = [ 'orders', 'pages', 'products', 'settings', 'features' ];
    if (newPageName.toLowerCase().includes(secret)) {
      setError('This page name is not allowed');
    } else {
      await createPage({ variables: { page: newPageName, storeName: name } });
      location.reload()
    }
  }

  if (loading) {
    return <PageLoader />;
  } else {
    const { storeProducts } = data;
    let store = storeInfo(name);
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
              ref={input => input && input.focus()}
              onKeyPress={(e) => { if (e.key == 'Enter') { onSubmit() } }}
              onChange={e => setNewPageName(e.target.value)}
              style={{ width: '100%' }}
            />
          </Common.Form.Wrapper>
        </Modal>

        <Common.Headers.Page>Pages</Common.Headers.Page>
        <Common.Presentation>
          <Common.Buttons.Default style={{ marginBottom: 15 }} onClick={() => setNewPage(true)}>
            <Common.Icons.Default icon={faPlus} />New Page
          </Common.Buttons.Default>

          <div style={{ overflowX: 'scroll' }}>
            <Table.Layout>
              <tbody>
                <Table.Wrapper>
                  <Table.Header>Product</Table.Header>
                  <Table.Header>Title</Table.Header>
                  <Table.Header>Page</Table.Header>
                </Table.Wrapper>
                {
                  storeProducts.products.length == 0 ? (
                    <Table.Wrapper>
                      <Table.Item style={{ padding: '20px 0px' }}>
                        <Common.Description>
                          You haven't uploaded any products yet. <Common.Links.Normal
                            onClick={() => location.assign(`/merchant/dashboard/upload/${name}`)} to='#'> Click here </Common.Links.Normal> to upload
                        </Common.Description>
                      </Table.Item>
                      <Table.Item></Table.Item>
                    </Table.Wrapper>
                  ) : storeProducts.products.map(product => (
                    <PageItem store={store} key={product.id} product={product} />
                  ))
                }
              </tbody>
            </Table.Layout>
          </div>

          {
            !loading && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', margin: 'auto 0', marginTop: 15 }}>
                  <Common.Buttons.Default
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    style={{ padding: '0px 10px', height: '30px', marginRight: 8 }}
                  >
                    <Common.Icons.Default style={{ padding: 0 }} icon={faChevronLeft} />
                  </Common.Buttons.Default>

                  <Common.Buttons.Default
                    disabled={page >= (data.storeProducts.len / limit)}
                    onClick={() => setPage(page + 1)}
                    style={{ padding: '0px 10px', height: '30px' }}
                  >
                    <Common.Icons.Default style={{ padding: 0 }} icon={faChevronRight} />
                  </Common.Buttons.Default>
                </div>

                <p style={{ float: 'right', fontSize: 14, color: '#333333' }}>
                  Showing {data.storeProducts.products.length} out of {data.storeProducts.len} results
                </p>
              </div>
            )
          }
        </Common.Presentation>

      </div>
    )
  }
}

export default withRouter(Pages);
