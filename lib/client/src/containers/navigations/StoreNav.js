import React from 'react';
import { Styles } from '../../styles';
import { Query } from 'react-apollo';
import { Tags } from '../../tags';
import { withRouter } from 'react-router-dom';
const { Common, StoreNav: Nav } = Styles;
const { Containers, Wrappers, Links } = Nav;
const { Page: { Queries } } = Tags;

const StoreNav = ({ data, loading, match: { params: { name }, url }, setActiveTab }) => {
  if (loading) {
    return null
  } else {
    const { findCurrentMerchant: merchant } = data;
    return (
      <Containers.Nav>
        <Query query={Queries.getPages} variables={{ storeId: merchant.id }}>
          {
            ({ loading, data }) => {
              if (loading) return null;
              const { getPages } = data;
              return (
                <Wrappers.Nav>
                  <Links.Nav
                    activeClassName='onActive'
                    onClick={() => setActiveTab('All')}
                    to={{ pathname: `/store/${name}/All` }}
                  >All
                  </Links.Nav>
                  {
                    getPages.map((page, index) => (
                      <Links.Nav
                        activeClassName='onActive'
                        onClick={() => setActiveTab(page)}
                        key={index}
                        to={{ pathname: `/store/${name}/${page}` }}
                      >{page}
                      </Links.Nav>
                    ))
                  }
                </Wrappers.Nav>
              )
            }
          }
        </Query>
      </Containers.Nav>
    )
  }
}

export default withRouter(StoreNav);
