import React from 'react';
import { Styles } from '../../styles';
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { Tags } from '../../tags';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const { Page: { Queries } } = Tags;

const { Common, Stores } = Styles;

const Layout = styled.div`
  display: none;
  @media (max-width: 890px) {
    display: block;
  }
`

const InfoToolbar = ({ loading, data, activeTab, setActiveTab, match: { url } }) => {
  if (loading) {
    return null
  } else {
    const { findCurrentMerchant: merchant } = data;
    return (
      <Layout style={{ margin: 10 }}>
        <Query query={Queries.getPages} variables={{ storeId: merchant.id }}>
          {
            ({ loading, data }) => {
              if (loading) return null;
              const { getPages } = data;
              return (
                <select onChange={e => setActiveTab(e.target.value)} style={{ margin: 0, width: '100%' }}>
                  {
                    getPages.map((page, index) => (
                      <option
                        value={page}
                        onClick={() => setActiveTab(page)}
                        key={index}
                        to={{ pathname: `${url}/${page}` }}
                      >{page}
                      </option>
                    ))
                  }
                </select>
              )
            }
          }
        </Query>
      </Layout>
    )
  }
}

export default withRouter(InfoToolbar);
