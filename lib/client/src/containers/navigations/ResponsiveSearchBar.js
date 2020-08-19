import React, { useState } from 'react';
import { Styles } from '../../styles';
import ReactStars from "react-rating-stars-component";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const { Sidebars, Common, Navigation } = Styles;
const { Search } = Sidebars;
const { Link, Container } = Search;

const Layout = styled.div`
  margin-bottom: 20px;
  display: block;
  @media (min-width: 890px) {
    display: none;
  };
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

const ResponsiveSearchBar = ({ rangeObj, setRangeObj, rating, setRating }) => {
  const updateRange = (option) => {
    const obj = Object.assign({}, rangeObj);
    obj['range'] = option;
    setRangeObj(obj);
  }

  return (
    <Layout>
      <select style={{ marginRight: 10 }} onChange={e => updateRange(e.target.value)}>
        {
          ranges.map((range, index) => (
            <option value={range.id} key={range.id}>{range.range}</option>
          ))
        }
      </select>

      <select style={{ marginRight: 10 }} onChange={e => setRating(parseInt(e.target.value))}>
        <option value={null}>No Filter</option>
        {
          stars.map((range, index) => {
            return (
              <option key={index} value={range.range}>{range.range}+</option>
            )
          })
        }
      </select>

      <Common.Links.Normal
        style={{ textDecoration: 'underline', marginBottom: 10, fontSize: 14 }}
        onClick={() => setRating(null)}
        to="#"
      >
        clear rating
      </Common.Links.Normal>

    </Layout>
  )
}

export default ResponsiveSearchBar;
