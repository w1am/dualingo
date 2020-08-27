import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Styles } from '../../styles';
import { Query } from 'react-apollo';
import { Tags } from '../../tags';
import { withRouter, NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
const { Common, StoreNav: Nav } = Styles;
const { Containers, Wrappers, Links } = Nav;
const { Page: { Queries } } = Tags;
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { loadImage } from '../../utils/imageFormatter';

const StoreHeader = styled.h3`
  margin-bottom: 0px;
`
const StoreAddress = styled(Link)`
  margin-top: 5px;
  font-size: 14px;
  display: block;
  color: rgba(0, 0, 0, 0.5);
`
const Layout = styled.div`
  border: 1px solid #EBEBEB;
  // background: #F9F9F9;
  background: #FFFFFF;
  display: block;
`
const Wrapper = styled.div`
  // background: #F9F9F9;
  background: #FFFFFF;
  border: 1px solid #EBEBEB;
  border-bottom: 0px;
  display: flex;
`
const Container = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 100%;
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  };
  ::-webkit-scrollbar-thumb {
    background: transparent; 
  }
`
const Arrow = styled.button`
  border: 0px;
  // background: #F9F9F9;
  background: #FFFFFF;
  color: #777777;
  cursor: pointer;
  padding: 0px 20px;
  border: none;
  outline: none;
  &::focus {
    border: none;
    outline: none;
    outline-style: none;
  };
  &:hover {
    color: black;
  };
`
const Button = styled(NavLink)`
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 0px;
  min-width: 100px;
  text-align: center;
  text-decoration: none;
  color: #777777;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    color: black;
  };
  ::after {
    border-bottom: 3px solid transparent;
    display: block;
    content: '';
    height: 1px;
    position: relative;
    top: 14px;
    transform: scaleX(0);
  };
  &.onActive {
    color: black;
    ::after {
      border-bottom: 3px solid #777777;
      display: block;
      content: '';
      height: 1px;
      position: relative;
      top: 14px;
      transform: scaleX(1);
      transition: transform 200ms ease-in-out;
    };
  }
`

const StoreNav = ({ data, loading, match: { params: { name }, url }, setActiveTab }) => {

  const scrollRef = useRef();

  const scrollLeft = () => {
    const container = scrollRef.current;
    container.scrollLeft += 50;
  }

  const scrollRight = () => {
    const container = scrollRef.current;
    container.scrollLeft -= 50;
  }

  if (loading) {
    return null
  } else {
    const { findCurrentMerchant: merchant } = data;
    return (
      <Fragment>
        <Wrapper>
          <Common.Assets.Store src={loadImage(name, 'logo', true, false)} />
          <div style={{ margin: 'auto 0' }}>
            <StoreHeader>{merchant.companyName}</StoreHeader>
            <StoreAddress to={{ pathname: `/merchant/${name}/location` }}>
              {merchant.address}
            </StoreAddress>
          </div>
        </Wrapper>
        <Layout>
          <Query query={Queries.getPages} variables={{ storeId: merchant.id }}>
            {
              ({ loading, data }) => {
                if (loading) return null;
                const { getPages } = data;
                return (
                  <div style={{ display: 'flex' }}>
                    <Arrow onClick={() => scrollRight()}>
                      <Common.Icons.Default style={{ padding: 0 }} icon={faChevronLeft} />
                    </Arrow> 
                    <Container ref={scrollRef}> 
                      <Button
                        activeClassName='onActive' 
                        onClick={() => setActiveTab('All')} 
                        to={{ pathname: `/store/${name}/All` }} 
                      >All 
                      </Button> 
                      { 
                        getPages.map((page, index) => ( 
                          <Button
                            activeClassName='onActive' 
                            onClick={() => setActiveTab(page)} 
                            key={index} 
                            to={{ pathname: `/store/${name}/${page}` }} 
                          >{page} 
                          </Button> 
                        )) 
                      } 
                    </Container> 
                    <Arrow onClick={() => scrollLeft()}>
                      <Common.Icons.Default style={{ padding: 0 }} icon={faChevronRight} />
                    </Arrow> 
                  </div>
                ) 
              } 
            } 
          </Query> 
        </Layout>
      </Fragment>
    )
  }
}

export default withRouter(StoreNav);
