import React, { useState, useRef, Fragment } from 'react';
import { Styles } from '../styles';
import styled from 'styled-components';
import Modal from '../containers/AppModal';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Tags } from '../tags';
import PageLoader from '../components/loaders/PageLoader';
import SelectorItem from '../components/SelectorItem';
import { useMutation } from '@apollo/react-hooks';
import voucher_codes from 'voucher-code-generator';
import ReactLoading from 'react-loading';
import Message from '../components/messages/Notification';
import copy from "copy-to-clipboard";  
const { Common, Product, Animations, Coupon, Table } = Styles;

const Stat = styled.div`
  width: 100%;
  margin-right: 5px;
  @media (max-width: 910px) {
    margin-right: 0px;
    margin-bottom: 10px;
  };
`

const Sale = styled.div`
  width: 100%;
  margin-left: 5px;
  @media (max-width: 910px) {
    margin-left: 0px;
  };
`

const Wrapper = styled.div`
  position: relative;
  background: #F8F8F8;
  height: 100%;
  padding: 10px 20px;
  display: block;
  border-top: 1px solid #EBEBEB;
`
const Container = styled.div`
  display: flex;
  @media (max-width: 910px) {
    flex-direction: column;
  };
`

const CouponLayout = styled.div`
  background: rgba(240, 90, 58, 0.06);
  border: 2px dashed #F05A3A;
  padding: 20px;
  width: 100%;
`

const CouponButton = styled.button`
  background: #F05A3A;
  margin: 0px;
  border: 2px solid #d34a2e;
  border-left: 0px;
  color: white;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    background: #e04323;
    transition: 0.1s linear;
  };
  &:disabled {
    background: #ff836b;
    cursor: default;
    border: 2px sold #ed725c;
  }
`

const StoreCoupons = ({ match: { params } }) => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ tab, setTab ] = useState('All');
  const [ selected, setSelected ] = useState([]);
  const [ selectedObj, setSelectedObj ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ copySuccess, setCopySuccess ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ previous, setPrevious ] = useState([]);
  const [ previousObj, setPreviousObj ] = useState({});

  const [ discount, setDiscount ] = useState(1);
  const [ days, setDays ] = useState(7);
  const [ cached, setCached ] = useState(null);

  const [ createCoupon ] = useMutation(Tags.Coupons.Mutations.createCoupon);

  const textAreaRef = useRef(null);

  const create = async () => {
    if (selected.length >= 1) {
      setLoading(true);

      const coupons = voucher_codes.generate({
        length: 5,
        count: 1,
        charset: voucher_codes.charset("alphabetic"),
        prefix: params.name.slice(0, 3).toUpperCase()
      });

      let res = await createCoupon({
        variables: {
          discount,
          code: coupons[0],
          products: JSON.stringify(selected),
          store: params.name,
          duration: parseInt(days) 
        }
      });
      if (res.data.createCoupon) {
        setLoading(false);
        setSuccess(true);
        setCached(coupons[0]);
        setTimeout(() => {
          setSuccess(false);
        }, 3000)
      }
    } else {
      setError(true)
    }
  }

  const formatInput = (value, state) => {
    let final = days;
    if (value <= 0) {
      final = 1;
    };
    state(final)
  }

  const copyCoupon = () => {
    copy(textAreaRef.current.value)
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000)
  }

  const formatDiscount = (value, state) => {
    let final = discount;
    if (value <= 0) {
      final = 1;
    };
    if ((value % 1) !== 0) {
      state(parseFloat(parseFloat(final).toFixed(2)))
    } else {
      state(parseFloat(final))
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Message link={null} isOpen={success} message="Coupon created successfully!" linkText={null} />
      <Message link={null} isOpen={copySuccess} message="Copied" linkText={null} />

      <Modal
        width="80%"
        header="Select Product(s)"
        placeholder="Confirm"
        isOpen={openModal}
        conditions={() => false}
        buttonAction={() => {
          setPrevious([]);
          setOpenModal(false);
        }}
        modalAction={setOpenModal}
        cancelAction={() => {
          setOpenModal(false);
          setSelected(previous)
          setSelectedObj(previousObj)
        }}
        disableClick={true}
      >
        <Query
          query={Tags.Product.Queries.storeProducts}
          variables={{ storeName: params.name, page: tab == 'All' ? null : tab, filter: null, limit: 12, tab: page }}
        >
          {
            ({ loading, data }) => {
              if (loading) return <PageLoader />
                const { storeProducts } = data;
              if (!storeProducts.products || storeProducts.products.length <= 0) {
                return <p style={{ padding: '20px', margin: 0 }}>No products</p>
              } else {
                return (
                  <div>
                    <Product.Wrapper>
                      {
                        storeProducts.products.map(product => (
                          <SelectorItem
                            setPrevious={setPrevious}
                            selectedObj={selectedObj}
                            setSelectedObj={setSelectedObj}
                            selected={selected}
                            setSelected={setSelected}
                            key={product.id}
                            product={product}
                          />
                        ))
                      }
                    </Product.Wrapper>

                    <p style={{ fontSize: 14, color: '#333333', padding: '0px 20px', textAlign: 'center' }}>
                      Showing {storeProducts.products.length} out of {storeProducts.len} results
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
                      <Common.Buttons.Default
                        style={{ marginRight: 10 }}
                        to='#'
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                      >
                        Prev
                      </Common.Buttons.Default>

                      <Common.Buttons.Default
                        style={{ marginLeft: 10 }}
                        to='#'
                        onClick={() => setPage(page + 1)}
                        disabled={storeProducts.products.length <= storeProducts.len}
                      >
                        Next
                      </Common.Buttons.Default>
                    </div>
                  </div>
                )
              }
            }
          }
        </Query>
      </Modal>

      <Common.Headers.Page>Coupons</Common.Headers.Page>
      <Container>
        <Stat>
          <Common.Presentation style={{ padding: 0, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '10px 20px' }}>
                <Common.Headers.Page style={{ margin: 0 }}>Generate</Common.Headers.Page>
                <Common.Description style={{ margin: 0, marginTop: 6 }}>
                  Create coupons
                </Common.Description>
              </div>

              <Wrapper>
                <Common.Form.Wrapper>
                  <Common.Form.Identifier>Duration (No of Days)</Common.Form.Identifier>
                  <Common.Form.Input
                    type="Number"
                    onChange={e => (setDays(e.target.value), setError(false))}
                    value={days}
                    onBlur={e => formatInput(e.target.value, setDays)}
                  />
                </Common.Form.Wrapper>

                <Common.Form.Wrapper>
                  <Common.Form.Identifier>Discount</Common.Form.Identifier>
                  <Common.Form.Input
                    type="Number"
                    onChange={e => (setDiscount(e.target.value), setError(false))}
                    value={discount}
                    onBlur={e => formatDiscount(e.target.value, setDiscount)}
                  />
                </Common.Form.Wrapper>

                <Common.Form.Wrapper>
                  <Common.Buttons.Default
                    onClick={() => {
                      setError(false);
                      setOpenModal(true);
                      setPrevious(selected);
                      setPreviousObj(selectedObj);
                    }}
                  >Select Product(s)</Common.Buttons.Default>
                  <Common.Description style={{ marginTop: 10, marginLeft: 5, marginBottom: 0 }}>{selected.length} Selected</Common.Description>
                </Common.Form.Wrapper>

                {
                  error && (
                    <Fragment>
                      <Animations.FadeIn>
                        <Common.Messages.Error>Select at least 1 product</Common.Messages.Error>
                      </Animations.FadeIn>
                      <br />
                    </Fragment>
                  )
                }

                <Common.Buttons.Eco disabled={error} onClick={() => create()}>
                  {
                    loading ? (
                      <ReactLoading
                        type="spin"
                        color='white'
                        height="16px"
                        width="16px"
                      />
                    ) : "Generate"
                  }
                </Common.Buttons.Eco>
              </Wrapper>
            </div>
          </Common.Presentation>
        </Stat>

        <Stat>
          <Common.Presentation style={{ padding: 0, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '10px 20px' }}>
                <Common.Headers.Page style={{ margin: 0 }}>Generate</Common.Headers.Page>
                <Common.Description style={{ margin: 0, marginTop: 6 }}>
                  Create coupons
                </Common.Description>
              </div>

              <Wrapper>
                <div style={{ display: 'flex' }}>
                  <CouponLayout>
                    {
                      cached ? (
                        <Animations.FadeIn>
                          <p style={{ margin: 0, fontWeight: 600, color: '#535452' }}>{cached}</p>
                        </Animations.FadeIn>
                      ) : (
                        <p style={{ margin: 0, fontWeight: 600, color: 'rgba(0, 0, 0, 0.4)' }}>Generate coupon first</p>
                      )
                    }
                  </CouponLayout>
                  <CouponButton disabled={!cached} value={cached} ref={textAreaRef} onClick={() => copyCoupon()}>
                    COPY CODE
                  </CouponButton>
                </div>

                <Common.Description>
                  Share this code with audience. People who uses this coupon will benefit from a discount.
                </Common.Description>
              </Wrapper>
            </div>
          </Common.Presentation>
        </Stat>
      </Container>

      <br />
      <Common.Presentation>
        <Table.Layout>
          <tbody>
            <Table.Wrapper>
              <Table.Header>Code</Table.Header>
              <Table.Header>Discount</Table.Header>
              <Table.Header></Table.Header>
            </Table.Wrapper>

            {
              cached && (
                <Table.Wrapper>
                  <Table.Item style={{ padding: 10 }}>{cached}</Table.Item>
                  <Table.Item>{discount}%</Table.Item>
                  <Table.Item>
                    <p style={{ color: 'green', margin: 'auto 0', fontSize: 12, fontWeight: 600 }}> NEW </p>
                  </Table.Item>
                </Table.Wrapper>
              )
            }

            <Query query={Tags.Coupons.Queries.getCoupons} variables={{ store: params.name }}>
              {
                ({ loading: couponsLoading, data: couponsData }) => {
                  if (couponsLoading) return null;
                  const { getCoupons: coups } = couponsData;
                  return coups.map(c => (
                    <Table.Wrapper>
                      <Table.Item style={{ padding: 10 }}>{c.code}</Table.Item>
                      <Table.Item>{c.discount}%</Table.Item>
                      <Table.Item>{c.day} {c.month} {c.year}</Table.Item>
                    </Table.Wrapper>
                  ))
                }
              }
            </Query>
          </tbody>
        </Table.Layout>
      </Common.Presentation>
    </div>
  )
}

export default withRouter(StoreCoupons);
