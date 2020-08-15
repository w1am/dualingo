import React, { useState } from 'react';
import { Styles } from '../../styles';
import ReactStars from "react-rating-stars-component";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const { Sidebars, Common, Navigation } = Styles;
const { Search } = Sidebars;
const { Link, Container } = Search;

const Layout = styled.div`
  padding: 8px 5px;
  color: #EF5131;
  display: flex;
  border: 1px solid ${props => (props.rating == props.current) ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  opacity: ${props => (props.rating == props.current) ? '0.7' : '1'};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`

const ranges = [
  { range: 'Rs 50 - Rs 500', id: 0 },
  { range: 'Rs 500 - Rs 2000', id: 1 },
  { range: 'Rs 2000 - Rs 5000', id: 2 },
  { range: 'Rs 5000+', id: 3 }
]

const stars = [
  { range: 1, id: 0 },
  { range: 2, id: 1 },
  { range: 3, id: 2 },
  { range: 4, id: 3 }
]


const SearchBar = ({ rangeObj, setRangeObj, rating, setRating }) => {
  const updateRange = (option) => {
    const obj = Object.assign({}, rangeObj);
    obj['range'] = option;
    setRangeObj(obj);
  }

  return (
    <Container>
      <Common.Headers.Sub style={{ paddingLeft: 10 }}>FILTER</Common.Headers.Sub>

      <Common.Headers.Identifier style={{ marginLeft: 10 }}>Price Range</Common.Headers.Identifier>
      {
        ranges.map((range, index) => (
          <div key={index} style={{ display: 'flex', marginLeft: 10, marginBottom: 15 }}>
            <Common.Form.Check.Input
              checked={((rangeObj['range'] !== undefined) && (rangeObj['range'] == range.id))}
              onChange={e => { updateRange(range.id) }}
              id={range.id}
            />

            <Link htmlFor={range.id}>{range.range}</Link>
          </div>
        ))
      }

      <Common.Headers.Identifier style={{ marginLeft: 10 }}>Rating</Common.Headers.Identifier>
      <div style={{ marginLeft: 10 }}>
        <Common.Links.Normal
          style={{ textDecoration: 'underline', marginBottom: 10, fontSize: 14 }}
          onClick={() => setRating(null)}
          to="#"
        >
          remove filter
        </Common.Links.Normal>
      </div>
      <div style={{ marginLeft: 3 }}>
        {
          stars.map((range, index) => {
            return (
              <Layout onClick={() => setRating(range.range)} rating={rating} current={range.range}>
                {
                  [...Array(range.range)].map(star => (
                    <Common.Icons.Default
                      style={{ fontSize: 14, cursor: 'pointer', paddingRight: 5 }}
                      icon={faStar}
                    />
                  ))
                }
                {
                  [...Array(5 - range.range)].map(star => (
                    <Common.Icons.Default
                      style={{ fontSize: 14, cursor: 'pointer', paddingRight: 5, color: 'grey' }}
                      icon={faStar}
                    />
                  ))
                }
                <span style={{ marginLeft: 5, fontSize: 14, color: '#333333' }}>
                  {range.range}+
                </span>
              </Layout>
            )
          })
        }
      </div>

    </Container>
  )
}

export default SearchBar;
