import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, onHide ,body}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className='fs-3'>  Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <span className='fs-6 fw-bold' > {body}  </span>  
      </Modal.Body>

    </Modal>
  );
};

export default MessageModal;
