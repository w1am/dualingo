import React from 'react';
import { Styles } from '../styles';
import styled from 'styled-components';
import Close from '../assets/icons/close.png';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
const { Common, Modal, Animations } = Styles;

const Layout = styled.div`
  background: ${props => props.type == 'normal' ? '#e3ebf9' : '#FBE3E6'};
  padding: 10px 20px;
  border: 1px solid ${props => props.type == 'normal' ? '#c9d6ed' : '#E7B8BB'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Header = styled.p`
  margin: 0;
  font-size: 14px;
  color: #24292e;
`

const Notification = ({ children, type }) => {
  return (
    <Animations.FadeIn>
      <Layout type={type}>
        <div style={{ display: 'flex'}}>
          <Common.Icons.Default
            style={{ color: type == 'normal' ? '#90a7ce' : '#C16869', fontSize: 14 }}
            icon={faExclamationTriangle}
          />
          <Header>{children}</Header>
        </div>
      </Layout>
    </Animations.FadeIn>
  )
}

export default Notification;
