import React, { useState, Fragment } from 'react';
import { Styles } from '../styles';
import { Tags } from '../tags';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import StoreProductItem from '../components/StoreProductItem';
import Skeleton from 'react-loading-skeleton';
import { faChevronRight, faChevronLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Modal from '../containers/AppModal';
import styled from 'styled-components';
import Loading from 'react-loading';
import { useMutation } from '@apollo/react-hooks';
import Banner from '../assets/banner.png';

const { Common, Table, ButtonSelector, Animations, Features } = Styles;
const { Wrapper } = ButtonSelector;

const StoreFeatures = ({ match: { params: { name } } }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Common.Headers.Page>Features</Common.Headers.Page>
      <Features.Image src={Banner} />

      <br />
      <Common.Headers.Page>Benefits</Common.Headers.Page>
      <Features.Container>
        <Features.Layout>
          <Common.Headers.Identifier>Growth</Common.Headers.Identifier>
          <Common.Description
            style={{ marginBottom: 0 }}
          >We help companies reach large audiences using social media techniques and make people interested in your
            products or services.
          </Common.Description>
        </Features.Layout>

        <Features.Layout>
          <Common.Headers.Identifier>Connect</Common.Headers.Identifier>
          <Common.Description
            style={{ marginBottom: 0 }}
          >Social media is one of the few marketing strategies that allow you to connect directly with your audiences.
            With our unique marketing strategies, you'll be able to offer better customer service and get to know them better
          </Common.Description>
        </Features.Layout>

        <Features.Layout>
          <Common.Headers.Identifier>Brand</Common.Headers.Identifier>
          <Common.Description
            style={{ marginBottom: 0 }}
          >Building your brand is vital and the ability to post organic content allows you to build a connection
            with your audience leading to more conversations by people.
          </Common.Description>
        </Features.Layout>
      </Features.Container>

      <br />
      <Common.Buttons.Eco>
        Sign me up!
      </Common.Buttons.Eco>
    </div>
  )
}

export default withRouter(StoreFeatures);
