import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = (props) => {
  return (
    <>
      <Spinner animation="border" role="status" className={'loader'} />
    </>
  );
};
