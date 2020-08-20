import React, { useState, useEffect } from 'react';
import { Styles } from '../../styles';
import { useQuery } from '@apollo/react-hooks';
import { isAuthenticated } from '../../utils/verifyUser';
import { Tags } from '../../tags';
import User from '../../containers/ships/User';
import DatePicker from '../../containers/DatePicker';
import { dates } from '../../shared/date';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ResUser from '../../containers/ships/ResUser';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ScrollToTopRoute from '../../ScrollToTopRoute';

const { Common, Table } = Styles;

const ResContainer = styled.div`
  display: none;
  @media (max-width: 770px) {
    display: flex;
    flex-wrap: wrap;
  }
`

const Container = styled.div`
  display: block;
  @media (max-width: 770px) {
    display: none;
  }
`

const Orders = ({ history }) => {
  const [ format, setFormat ] = useState(null);
  const [ paid, setPaid ] = useState(null);
  const [ limit, setLimit ] = useState(5);
  const [ page, setPage ] = useState(1);

  const { loading, data } = useQuery(Tags.Ship.Queries.getUserShips, {
    variables: {
      email: isAuthenticated().email,
      paid: paid == 'true' ? true: paid == 'false' ? false : null,
      format,
      limit,
      page,
      valid: true
    } 
  });

  useEffect(() => {
    if (!isAuthenticated().ok) {
      history.push('/user/auth/login');
      setTimeout(() => {
        alert('Please login first')
      })
    }
  }, [ data ])

  return (
    <div>
      <ScrollToTopRoute />
      {
        !loading && (
          <Common.Description>
            {data.getUserShips.len ? data.getUserShips.len== 1 ? '1 Order' : `${data.getUserShips.len} Orders` : '0 Orders'}
          </Common.Description>
        )
      }

      <div style={{ display: 'flex', marginBottom: 10 }}>
        <span style={{ margin: 'auto 0', marginRight: 10, fontSize: 13 }}>Sort by: </span>
        <select value={paid} onChange={e => setPaid(e.target.value)}>
          <option value={null}>All</option>
          <option value={true}>Paid</option>
          <option value={false}>Not Paid</option>
        </select>
        <DatePicker format={format} setFormat={setFormat} />
      </div>

      <ResContainer>
        {
          loading ? null : (
            data.getUserShips.ships.map(ship => (
              <ResUser key={ship.id} ship={ship} />
            ))
          )
        }
      </ResContainer>

      <Container style={{ overflow: 'auto' }}>
        <Table.Layout>
          <tbody>
            <Table.Wrapper>
              <Table.Header>Order ID</Table.Header>
              <Table.Header>Address</Table.Header>
              <Table.Header>Date</Table.Header>
              <Table.Header>Amount</Table.Header>
              <Table.Header>Status</Table.Header>
            </Table.Wrapper>
            {
              loading
                ? (
                  <Table.Wrapper>
                    <Table.Item style={{ padding: 15 }}>Loading...</Table.Item>
                    <Table.Item></Table.Item>
                    <Table.Item></Table.Item>
                    <Table.Item></Table.Item>
                    <Table.Item></Table.Item>
                  </Table.Wrapper>
                )
                : (data.getUserShips.ships == null || data.getUserShips.ships.length <= 0)
                  ? <Common.Description style={{ padding: 10 }}>Looks like you haven't made any order yet</Common.Description>
                  : data.getUserShips.ships.map(ship => (
                    <User key={ship.id} ship={ship} />
                  ))
            }
          </tbody>
        </Table.Layout>
      </Container>

      {
        loading ? null : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', margin: 'auto 0' }}>
              <Common.Buttons.Default
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                style={{ padding: '0px 10px', height: '30px', marginRight: 8 }}
              >
                <Common.Icons.Default style={{ padding: 0 }} icon={faChevronLeft} />
              </Common.Buttons.Default>

              <Common.Buttons.Default
                disabled={data.getUserShips.ships.length < limit}
                onClick={() => setPage(page + 1)}
                style={{ padding: '0px 10px', height: '30px' }}
              >
                <Common.Icons.Default style={{ padding: 0 }} icon={faChevronRight} />
              </Common.Buttons.Default>
            </div>
            <p style={{ float: 'right', fontSize: 14, color: '#333333' }}>
              Showing {data.getUserShips.ships.length} out of {data.getUserShips.len} results
            </p>
          </div>
        )
      }
    </div>
  )
}

export default withRouter(Orders);
