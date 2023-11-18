import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, onHide, onConfirm ,body}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className='fs-3'>  Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <span className='fs-6 fw-bold' > {body}  </span>  
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
