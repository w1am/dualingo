import React, { useState, Fragment } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import StoreProductItem from '../components/StoreProductItem';
import Skeleton from 'react-loading-skeleton';
import { faChevronRight, faChevronLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Modal from '../containers/AppModal';
import styled from 'styled-components';
import Loading from 'react-loading';
import { useMutation } from '@apollo/react-hooks';

const { Common, Table, ButtonSelector, Animations } = Styles;
const { Wrapper } = ButtonSelector;

const Layout = styled.div`
  display: flex;
  @media (max-width: 700px) {
    margin-top: 10px;
  }
`

const StoreProducts = ({ match: { params: { name } } }) => {
  const [ selected, setSelected ] = useState([]);
  const [ selectedObj, setSelectedObj ] = useState({});
  const [ purchases, setPurchases ] = useState([]);
  const [ len, setLen ] = useState(0);
  const [ on, setOn ] = useState(false);
  const [ deleteModal, setDeleteModal ] = useState(false);
  const [ filter, setFilter ] = useState(null);
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(10);
  const [ deleteLoading, setDeleteLoading ] = useState(false);

  const [ deleteProduct ] = useMutation(Tags.Product.Mutations.deleteProduct);

  const updateCheck = (children) => {
    let curr = selected.map(item => item.id).indexOf(children.id)
    if (curr == -1) {
      setSelected([
        ...selected,
        {
          id: children.id,
          session: children.session
        }
      ]);

      let x = Object.assign({}, selectedObj);
      x[children.id] = true;
      setSelectedObj(x);
    } else {
      let tempArr = selected;
      tempArr.splice(curr, 1);
      setSelected(tempArr);
      let x = Object.assign({}, selectedObj);
      x[children.id] = false;
      setSelectedObj(x);
    }
  }

  const addAll = () => {
    if (!on) {
      let temp = [];
      let obj = Object.assign({});
      purchases.map(product => {
        temp.push({ id: product.id });
        obj[product.id] = true;
      });
      setSelected(temp)
      setSelectedObj(obj)
    } else {
      setSelected([])
      setSelectedObj({})
    }
  }

  return (
    <div>
      <Modal
        isOpen={deleteModal}
        header="Delete"
        placeholder="Delete"
        modalAction={setDeleteModal}
        buttonAction={async () => {
          setDeleteLoading(true);
          let tracker = selected.length;
          let count = 0;
          selected.map(async product => {
            let res = await deleteProduct({ variables: { id: product.id } });
            if (res.data.deleteProduct) {
              count += 1;
            }
          });
          if (count >= tracker) {
            setDeleteLoading(false);
            setDeleteModal(false)
          }
        }}
        cancelAction={() => (setDeleteModal(false))}
        conditions={() => false}
        loading={deleteLoading}
        style='danger'
      >
        <Common.Description>
          Are you sure that you want to delete {selected.length} products?
        </Common.Description>
      </Modal>

      <Wrapper>
        <div style={{ display: 'flex', margin: 'auto 0' }}>
          <Common.Buttons.Default onClick={() => (setOn(!on), addAll())} style={{ padding: '0px 10px' }}>
            <Common.Form.Check.Wrapper style={{ padding: 0, margin: 'auto 0' }}>
              <Common.Form.Check.Input checked={on} onChange={(e) => {
                addAll();
                setOn(!on);
              }} />
              <span style={{ paddingLeft: 10, margin: 'auto 0', display: 'inline-block' }}>Select All</span>
            </Common.Form.Check.Wrapper>
          </Common.Buttons.Default>

          <Common.Buttons.Toolbar
            onClick={() => setDeleteModal(true)}
            disabled={ selected && selected.length <= 0 }
            style={{ marginLeft: 10 }}
          >
            Delete
          </Common.Buttons.Toolbar>
          <Common.Buttons.Toolbar
            onClick={() => {
              setTimeout(() => {
                location.assign(`/merchant/dashboard/upload/${name}?id=${selected[0].id}&session=${selected[0].session}&editState=true`)
              })
            }}
            disabled={ selected && selected.length > 1 || selected.length < 1 }
            style={{ marginLeft: 10 }}
          >
            Edit
          </Common.Buttons.Toolbar>
        </div>

        <Layout>
          <Common.Form.Input
            style={{ margin: 'auto 0', borderRadius: '4px 0px 0px 4px', width: '100%' }}
            placeholder="Search Product"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Common.Buttons.Default
            style={{ borderRadius: '0px 4px 4px 0px', border: '1px solid #DDDDDD', borderLeft: 0 }}
          >
            Go
          </Common.Buttons.Default>
        </Layout>
      </Wrapper>


      <div style={{ overflow: 'auto' }}>
        <Table.Layout>
          <tbody>
            <Table.Wrapper>
              <Table.Header></Table.Header>
              <Table.Header>Product</Table.Header>
              <Table.Header>Stock</Table.Header>
              <Table.Header>Categories</Table.Header>
              <Table.Header>Date</Table.Header>
            </Table.Wrapper>
            <Query query={Tags.Product.Queries.storeProducts} variables={{ storeName: name, filter, tab: page, limit }}>
              {
                ({ loading, data }) => {
                  if (loading) return (
                    <Table.Wrapper>
                      <Table.Item style={{ padding: 20 }}>Loading...</Table.Item>
                      <Table.Item></Table.Item>
                      <Table.Item></Table.Item>
                      <Table.Item></Table.Item>
                      <Table.Item></Table.Item>
                    </Table.Wrapper>
                  )
                  const { storeProducts } = data;
                  setPurchases(storeProducts.products);
                  setLen(storeProducts.len);
                  if (storeProducts.products.length == 0) {
                    return (
                      <Table.Wrapper>
                        <Table.Item style={{ padding: '20px 0px' }}>
                          <Common.Description>
                            You haven't uploaded any products yet. <Common.Links.Normal
                              onClick={() => location.assign(`/merchant/dashboard/upload/${name}`)} to='#'> Click here </Common.Links.Normal> to upload
                          </Common.Description>
                        </Table.Item>
                        <Table.Item></Table.Item>
                        <Table.Item></Table.Item>
                        <Table.Item></Table.Item>
                        <Table.Item></Table.Item>
                      </Table.Wrapper>
                    )
                  } else {
                    return storeProducts.products.map(product => (
                      <StoreProductItem
                        product={product}
                        updateCheck={updateCheck}
                        selectedObj={selectedObj}
                        name={name}
                      />
                    ))
                  }
                }
              }
            </Query>
          </tbody>
        </Table.Layout>
      </div>

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
            disabled={page >= (len / limit)}
            onClick={() => setPage(page + 1)}
            style={{ padding: '0px 10px', height: '30px' }}
          >
            <Common.Icons.Default style={{ padding: 0 }} icon={faChevronRight} />
          </Common.Buttons.Default>
        </div>

        <p style={{ float: 'right', fontSize: 14, color: '#333333' }}>
          Showing {purchases.length} out of {len} results
        </p>
      </div>
    </div>
  )
}

export default withRouter(StoreProducts);
