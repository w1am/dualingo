import React, { useEffect } from 'react';
import { Styles } from '../../styles';
import styled from 'styled-components';
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const { Messages, Common } = Styles
const { Layouts } = Messages;

const Message = styled.div`
  margin: 0;
  color: white;
  font-size: 14px;
  whitespace: no-wrap;
  display: flex;
  justify-content: space-between;
`

const Notification = ({
  message,
  isOpen,
  link,
  linkText,
  width,
  type
}) => {
  return (
    <Layouts.Content type={type} width={width} className={ isOpen ? 'open' : 'close' }>
      <Message>
        <div>
          <Common.Icons.Default
            icon={type == 'error' ? faTimesCircle : faCheck}
          />
          {message}
        </div>
        {
          (link && linkText) && (
            <Common.Links.Normal
              underline={true}
              type={type}
              to={link}
            >{linkText}
            </Common.Links.Normal>
          )
        }
      </Message>
    </Layouts.Content>
  )
}

export default Notification;
