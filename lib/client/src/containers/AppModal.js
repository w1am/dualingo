import React, { useEffect, useRef } from 'react';
import { Styles } from '../styles';
import Close from '../assets/icons/close.png';
import ButtonLoader from '../components/loaders/ButtonLoader';

const { Modal, Common } = Styles;

const AppModal = ({
  loading,
  header,
  placeholder,
  isOpen,
  modalAction,
  buttonAction,
  cancelAction,
  width,
  children,
  disableClick,
  style,
  conditions
}) => {
  const outsideClick = useRef();

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, []);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '10px';
  } else {
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = 'unset';
  }

  const handleClickOutside = event => {
    if (!disableClick && outsideClick.current && !outsideClick.current.contains(event.target)) {
      modalAction(false);
    }
  };

  return (
    <div>
      <Modal.ModalContent width={width} className={isOpen ? "fadeIn" : "fadeOut"} ref={outsideClick}>
        <Modal.Toolbar.Layout>
          <Modal.Toolbar.Header>{header}</Modal.Toolbar.Header>
          <Modal.Icons.Close onClick={() => (modalAction(false), cancelAction())} src={Close} />
        </Modal.Toolbar.Layout>
        <div style={{ padding: '10px 20px' }}>
          <div style={{ overflowY: 'scroll', maxHeight: '70vh' }}>
            { children }
          </div>
          <p style={{ textAlign: 'right', display: 'block', margin: 0, marginTop: 20 }}>
            <Common.Buttons.Cancel onClick={cancelAction}>Cancel</Common.Buttons.Cancel>

            {
              style == 'danger' ? (
                <Common.Buttons.Delete disabled={conditions()} onClick={buttonAction}>
                  <ButtonLoader color="primary" placeholder={placeholder} loading={loading} />
                </Common.Buttons.Delete>
              ) : (
                <Common.Buttons.Auth disabled={conditions()} onClick={buttonAction}>
                  <ButtonLoader color="primary" placeholder={placeholder} loading={loading} />
                </Common.Buttons.Auth>
              )
            }
          </p>
        </div>
      </Modal.ModalContent>
      <Modal.ClickWrapper className={isOpen ? "fadeIn" : "fadeOut"} />
    </div>
  )
}

export default AppModal;
