import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Loader } from '../Loader/Loader';

export const ModalMessage = (props) => {
  return (
    <>
      <Modal {...props} size={'sm'} centered>
        <Modal.Body className={'modalMessageBody'}>
          <div className={'messageBlock'}>
            {props.isLoading ? <Loader /> : <h6>{props.message}</h6>}
          </div>
          <Button
            className={'modalMessageBtn'}
            disabled={props.isLoading}
            onClick={props.onHide}
          >
            Закрыть
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
