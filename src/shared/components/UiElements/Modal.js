import React from 'react';

import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Modal.css';
const MyVerticallyCenteredModal = props =>{
    return (
      <React.Fragment>
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter"centered>
          <Modal.Header>
            <div className="headerDiv">
              {props.title}
              <button type="button" onClick={props.onHide} className="btn-close"><FontAwesomeIcon icon={faTimes} /></button>
          </div>
          </Modal.Header>
            <Modal.Body>
              {props.children}
            </Modal.Body>
          </Modal>
      </React.Fragment>
    );
  };

  
  export default MyVerticallyCenteredModal;
