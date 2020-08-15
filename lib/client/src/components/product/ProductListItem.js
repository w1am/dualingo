import React, { useState, Fragment } from 'react';
import ReactStars from "react-rating-stars-component";
import { useMutation } from '@apollo/react-hooks';
import { isAuthenticated } from '../../utils/verifyUser';
import { Styles } from '../../styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tags } from '../../tags';
import Message from '../../components/messages/Notification';
import { loadImage } from '../../utils/imageFormatter';
import { formatNumber } from '../../utils/productItemFormatter';
import { formatTextLen } from '../../utils/formatters';

const { Product, Table } = Styles;
const { Assets } = Product;

const Price = styled.p`
  white-space: nowrap;
  margin: auto 0;
  max-width: 100px;
  width: 100px;
  font-size: 14px;
`
const Title = styled(Link)`
  font-size: 14px;
  max-width: 200px;
  width: 200px;
  margin: 0;
  text-decoration: none;
  color: ${props => props.deleted ? 'grey' : '#0066c0'};
  cursor: ${props => props.deleted ? 'default' : 'cursor'};
  @media (max-width: 730px) {
    font-size: 12px;
  }
`

const ProductListItem = ({ ship, item, edit }) => {
  const [ rating, setRating ] = useState(0);
  const [ updateRating ] = useMutation(Tags.Ship.Mutations.updateRating)
  const [ success, setSuccess ] = useState(false);

  return (
    <Fragment>
      <Message link='#' isOpen={success} message="Thanks for your feedback!" linkText={null} />
      <Table.Wrapper style={{ background: 'none' }}>
        <Table.Item style={{ padding: 10, minWidth: '200px' }}>
          <div style={{ display: 'flex' }}>
            <Assets.Order
              style={{ margin: 'auto 0', marginRight: 15 }}
              src={loadImage(ship.storeName, '600-main-0', false, false, item.session)}
            />
            <div style={{ margin: 'auto 0' }}>
              <Title deleted={item.deleted} to={item.deleted ? '#' : { pathname: `/${ship.storeName}/product/${item.itemId}` }}>
                {formatTextLen(item.title, 7)} (x{item.count})
              </Title>
              <p style={{ margin: 0, fontSize: 12, color: 'green', marginTop: 5 }}>
                { item.option && item.option }
                { (item.option && item.addOption) && `, ` }
                { item.addOption && item.addOption }
              </p>
            </div>
          </div>
        </Table.Item>

        {
          edit && (
            <Table.Item style={{ minWidth: '100px' }}>
              <ReactStars
                count={5}
                color2={"#EF5131"}
                value={rating ? rating : item.rating}
                onChange={async (newRating) => {
                  setRating(newRating)
                  setSuccess(true)
                  const res = await updateRating({
                    variables: {
                      purchaseId: ship.id,
                      itemId: item.itemId,
                      rating: newRating,
                      user: isAuthenticated().id
                    }
                  });
                  if (res.data.updateRating) {
                    setTimeout(() => {
                      setSuccess(false)
                    }, 2000)
                  }
                }}
                size={22}
              />
            </Table.Item>
          )
        }

        <Table.Item>
          <Price>Rs {formatNumber(item.subTotal)}</Price>
        </Table.Item>
      </Table.Wrapper>
    </Fragment>
  )
}

export default ProductListItem;
