import React, { useState, useEffect } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PageItem from '../components/PageItem';
import { storeInfo } from '../utils/verifyUser';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from '../containers/AppModal';
import DatePicker from '../containers/DatePicker';
import { dates } from '../shared/date';
import { formatNumber } from '../utils/productItemFormatter';
import { Query } from 'react-apollo';
import Loader from 'react-loading';

const { Common, Table } = Styles;

const Dashboard = ({}) => {
  const [ format, setFormat ] = useState(null);
  const [ paid, setPaid ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const [ selected, setSelected ] = useState(null);

  const { loading, data } = useQuery(Tags.Ship.Queries.getShips, {
    variables: {
      paid: (paid == 'true' || paid == true) ? true : (paid == 'false' || paid == false) ? false : null,
      format
    }
  });
  const [ setShipPaid ] = useMutation(Tags.Ship.Mutations.setShipPaid);

  if (loading) {
    return null
  } else {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Modal
          width="450px"
          header="Accounts"
          placeholder="Close"
          isOpen={openModal}
          conditions={() => false}
          buttonAction={() => {
          }}
          modalAction={setOpenModal}
          cancelAction={() => setOpenModal(false)}
          disableClick={true}
        >
          <Query query={Tags.Merchant.Queries.getAccounts} variables={{ orderId: selected }}>
            {
              ({ loading, data }) => {
                if (loading) return (
                  <Loader type="spin" color='#333333' height="26px" width="26px" />
                );
                if (data.getAccounts == null || data.getAccounts == 'null') {
                  return null
                } else {
                  return data.getAccounts.map((account, i) => (
                    <div key={i}>
                      <p style={{ marginRight: 20, marginBottom: 0, fontWeight: 600 }}>
                        {account.storeName} (Rs {formatNumber(account.subTotal)})
                      </p>
                      <div style={{ display: 'flex' }}>
                        {
                          account.account.map((acc, i) => (
                            <div key={i}>
                              <p style={{ marginRight: 10 }}>{acc.type.toUpperCase()}</p>
                              <p style={{ marginRight: 10 }}>{acc.account}</p>
                            </div>
                          ))
                        }
                      </div>
                      <Common.Elements.Divider />
                    </div>
                  ))
                }
              }
            }
          </Query>
        </Modal>

        <Common.Headers.Page>Dashboard</Common.Headers.Page>
        <Common.Presentation>
          <div style={{ display: 'flex', marginBottom: 10 }}>
            <span style={{ margin: 'auto 0', marginRight: 10, fontSize: 13 }}>Sort by: </span>
            <select value={paid} onChange={e => setPaid(e.target.value)}>
              <option value={true}>Paid</option>
              <option value={false}>Not Paid</option>
            </select>
            <DatePicker format={format} setFormat={setFormat} />
          </div>

          <div style={{ overflow: 'auto' }}>
            <Table.Layout>
              <tbody>
                <Table.Wrapper>
                  <Table.Header>Order Id</Table.Header>
                  <Table.Header>Amount</Table.Header>
                  <Table.Header>Payment</Table.Header>
                  <Table.Header></Table.Header>
                </Table.Wrapper>
                {
                  loading ? null : data.getShips.map(ship => (
                    <Table.Wrapper key={ship.id}>
                      <Table.Item
                        style={{ color: '#1977d6', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => (setSelected(ship.orderId), setOpenModal(true))}
                      >
                        {ship.orderId}
                      </Table.Item>
                      <Table.Item>Rs {formatNumber(ship.grandTotal + ship.grandDelivery)}</Table.Item>
                      <Table.Item style={{ padding: 10 }}>{ship.paymentMethod}</Table.Item>
                      <Table.Item style={{ padding: 10 }}>
                        {
                          !ship.paid && (
                            <div style={{ display: 'flex' }}>
                              <Common.Buttons.Auth
                                style={{ marginRight: 10 }}
                                onClick={async () => {
                                  await setShipPaid({
                                    variables: {
                                      id: ship.id,
                                      paid: true,
                                      merchant: JSON.stringify(ship.purchases),
                                      total: ship.grandTotal + ship.grandDelivery
                                    }
                                  });
                                }}
                              >
                                <Common.Icons.Default style={{ margin: 0, padding: 0 }} icon={faCheck} />
                              </Common.Buttons.Auth>
                              <Common.Buttons.Delete onClick={async () => {
                                await setShipPaid({
                                  variables: {
                                    id: ship.id,
                                    paid: false,
                                    merchant: JSON.stringify(ship.purchases),
                                    total: ship.grandTotal + ship.grandDelivery
                                  }
                                });
                              }}>
                                <Common.Icons.Default style={{ margin: 0, padding: 0 }} icon={faTimes} />
                              </Common.Buttons.Delete>
                            </div>
                          )
                        }
                      </Table.Item>
                    </Table.Wrapper>
                  ))
                }
              </tbody>
            </Table.Layout>
          </div>
        </Common.Presentation>
      </div>
    )
  }
}

export default withRouter(Dashboard);
