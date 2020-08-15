import React, { useState, useEffect }  from 'react';
import { Styles } from '../../styles';
import { Line, Bar } from 'react-chartjs-2';
import { useQuery } from '@apollo/react-hooks';
import { Tags } from '../../tags';
import { withRouter } from 'react-router-dom';
import { formatNumber } from '../../utils/productItemFormatter';
import { dates as Calendar } from '../../shared/date';
import styled from 'styled-components';

const { Common } = Styles;

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

const Chart = styled.div`
  height: 100%;
  width: 400px;
  @media (max-width: 1110px) {
    width: 350px;
  };
  @media (max-width: 968px) {
    width: 320px;
  };
  @media (max-width: 910px) {
    width: 100%;
  };
`

const Orders = ({ match: { params } }) => {
  const [ received, setReceived ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ dataset, setDataset ] = useState({ });
  const getYear = () => new Date().getFullYear(); 
  const getToday = () => new Date().getDate(); 
  const getMonth = () => new Date().getMonth();
  const [ currYear, setCurrYear ] = useState(getYear());
  const [ currMonth, setCurrMonth ] = useState(getMonth());

  const [ sales, setSales ] = useState({});

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate(); 

  const getYears = (startYear) => {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while ( startYear <= currentYear ) {
      years.push(startYear++);
    };
    return years;
  }

  const { loading, data } = useQuery(Tags.Order.Queries.getOrders, {
    variables: { store: params.name, year: currYear.toString(), month: Calendar[parseInt(currMonth)].month.toString() }
  });

  const getTotal = (orders) => {
    let total = 0;
    orders.map(order => {
      total += order.sales;
    });
    return total;
  }

  useEffect(() => {
    let results = [];
    let displays = [];
    let salesNumber = [];
    if (!loading) {
      data.getOrders.map(order => {
        results.push(order.orders);
        displays.push(`day ${parseInt(order.day)}`);
        salesNumber.push(parseInt(order.sales))
      })
      setSales({
        labels: displays,
        datasets: [
          {
            label: `Sales for ${Calendar[currMonth].month} ${currYear}`,
            backgroundColor: 'rgba(79, 170, 15, 0.6)',
            data: salesNumber
          }
        ]
      })
      setDataset({
        labels: displays,
        datasets: [
          {
            label: `Orders for ${Calendar[currMonth].month} ${currYear}`,
            backgroundColor: 'rgba(240, 90, 58, 0.6)',
            data: results
          }
        ]
      })
    };
  }, [ data ])

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <select
          style={{ margin: 0, marginRight: 10, padding: '5px 5px' }}
          value={currMonth}
          onChange={e => setCurrMonth(e.target.value)}
        >
          {
            Calendar.map((month, index) => {
              if (index < Calendar[getMonth()].id) {
                return (
                  <option value={index} key={index}>{Calendar[index].month}</option>
                )
              }
            })
          }
        </select>
        <select onChange={e => setCurrYear(e.target.value)} style={{ margin: 0, padding: '5px 5px'  }}>
          {
            getYears(2020).map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))
          }
        </select>
      </div>

      <Container>
        <Stat>
          <Common.Presentation style={{ padding: 0, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '10px 20px' }}>
                <Common.Headers.Page style={{ margin: 0 }}>Orders</Common.Headers.Page>
                <Common.Description style={{ margin: 0, marginTop: 6 }}>
                  Showing orders for {Calendar[currMonth].month} {currYear}
                </Common.Description>
              </div>

              <Wrapper>
                <Chart>
                  <Line
                    options={{
                      responsive: true
                    }}
                    data={dataset}
                  />
                </Chart>
              </Wrapper>
            </div>
          </Common.Presentation>
        </Stat>

        <Sale>
          <Common.Presentation style={{ padding: 0, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '10px 20px' }}>
                <Common.Headers.Page style={{ margin: 0 }}>Sales</Common.Headers.Page>
                <Common.Description style={{ margin: 0, marginTop: 6 }}>
                  You should receive your money within 1-2 business days
                </Common.Description>
              </div>

              <Wrapper>
                {
                  !loading && <h2>Rs {formatNumber(getTotal(data.getOrders))}</h2>
                }

                <Chart>
                  <Bar
                    options={{
                      responsive: true
                    }}
                    data={sales}
                  />
                </Chart>
              </Wrapper>
            </div>
          </Common.Presentation>
        </Sale>
      </Container>
    </div>
  )
}

export default withRouter(Orders);
