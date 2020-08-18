import React, { useState, useEffect, useRef } from 'react';
import { Styles } from '../../styles';
import SearchIcon from '../../assets/icons/search.png';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Shared } from '../../styles/Shared';
import { Tags } from '../../tags';
import { Link } from 'react-router-dom';
import { formatTextLen } from '../../utils/formatters';
import { withRouter } from 'react-router-dom';

const { Animations } = Styles;
const { Search } = Styles.Navigation;
const { Container, Input, Icon, Button } = Search;

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

const TopNavSearch = ({ history }) => {
  const [ search, setSearch ] = useState('');

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
    <Container>
      <Icon src={SearchIcon} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <Input
            onChange={e => (setSearch(e.target.value)) }
            onKeyPress={e => {
              if (e.key === 'Enter') {
                history.push(`/search/${search}`);
                setSearch(null)
              }
            }}
            value={search}
            placeholder="Search Products..."
          />
          <Button>Search</Button>
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
                                  key={index}
                                  onClick={() => setSearch(null)}
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
    </Container>
  )
}

export default withRouter(TopNavSearch);
