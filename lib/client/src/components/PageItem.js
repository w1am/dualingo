import React, { useState } from 'react';
import { Styles } from '../styles';
import { loadImage } from '../utils/imageFormatter';
import { formatTextLen } from '../utils/formatters';
import { Query } from 'react-apollo';
import { Tags } from '../tags';
import { useMutation } from '@apollo/react-hooks';

const { Table, Product } = Styles;
const { Assets } = Product;

const PageItem = ({ product, store }) => {
  const [ page, setPage ] = useState(product.page);
  const [ updatePage ] = useMutation(Tags.Page.Mutations.updatePage);

  const onChange = async (e) => {
    setPage(e.target.value);
    await updatePage({ variables: { productId: product.id, page: e.target.value } });
  }

  return (
    <Table.Wrapper>
      <Table.Item>
        <Assets.Display src={loadImage(product.store.username, '600-main-0', false, false, product.session)} />
      </Table.Item>
      <Table.Item>{formatTextLen(product.title, 6)}</Table.Item>
      <Table.Item>
        <Query query={Tags.Page.Queries.getPages} variables={{ storeId: store._id }}>
          {
            ({ loading, data }) => {
              if (loading) return null;
              const { getPages } = data;
              return (
                <select value={page} onChange={onChange}>
                  {
                    getPages.map((page, index) => (
                      <option key={index} value={page}>{page}</option>
                    ))
                  }
                </select>
              );
            }
          }
        </Query>
      </Table.Item>
    </Table.Wrapper>
  )
}

export default PageItem;
