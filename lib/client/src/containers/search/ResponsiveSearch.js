import React, { useState, useEffect, useRef } from 'react';
import { Styles } from '../../styles';
import { Shared } from '../../styles/Shared';
import { Palette } from '../../styles/Palette';
import { Query } from 'react-apollo';
import { Tags } from '../../tags';
import { Link } from 'react-router-dom';
import { formatTextLen } from '../../utils/formatters';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const { Common, Search, Animations } = Styles;
const { Containers, Inputs } = Search;

const Layout = styled.div`
  position: absolute;
  background: white;
  width: 100%;
  z-index: 2;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
  -webkit-box-shadow: ${Shared.Shadows.Common};
  -moz-box-shadow: ${Shared.Shadows.Common};
  box-shadow: ${Shared.Shadows.Common};
`

const Result = styled(Link)`
  display: block;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  transition: 0.1s linear;
  padding: 15px 10px;
  font-size: 14px;
  &:hover {
    color: #000000;
    background: rgba(0, 0, 0, 0.047);
  };
`

const ResponsiveSearch = ({ history, setToggleSearch }) => {
  const [ search, setSearch ] = useState(null);

  const outsideClick = useRef();

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, []);

  const handleClickOutside = event => {
    if (outsideClick.current && !outsideClick.current.contains(event.target)) {
      setSearch(null);
    }
  };

  return (
    <Containers.Responsive>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <Inputs.Res
            placeholder='Search Products...'
            ref={input => input && input.focus()}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                history.push(`/search/${search}`);
                setSearch(null)
                setToggleSearch(false)
              }
            }}
            value={search}
            onChange={e => (setSearch(e.target.value)) }
          />
          <Common.Buttons.Auth
            style={{
              position: 'absolute',
              right: 0,
              padding: 10,
              fontSize: 14,
              borderRadius: '0px 4px 4px 0px',
              border: '1px solid #DDDDDD',
              borderLeft: 0,
              background: Palette.Theme
            }}
          >
            Search
          </Common.Buttons.Auth>
        </div>

        {
          (search !== '' && search) && (
            <Layout ref={outsideClick} autoFocus={true}>
              <Query
                query={Tags.Product.Queries.filterProduct}
                variables={{ search, page: 1, limit:5 }}
              >
                {
                  ({ loading, data }) => {
                    if (loading) return null;
                    const { filterProduct: products } = data;
                    if (products == undefined) {
                      return null
                    } else {
                      if (!products) {
                        return null
                      } else {
                        return (
                          <Animations.Fade>
                            {
                              products.map((product, index) => (
                                <Result
                                  onClick={() => (setSearch(null), setToggleSearch(false))}
                                  to={{ pathname: `/${product.store.username}/product/${product.id}` }}
                                >{formatTextLen(product.title, 5)}</Result>
                              ))
                            }
                          </Animations.Fade>
                        )
                      }
                    }
                  }
                }
              </Query>
            </Layout>
          )
        }
      </div>
    </Containers.Responsive>
  )
}

export default withRouter(ResponsiveSearch);
