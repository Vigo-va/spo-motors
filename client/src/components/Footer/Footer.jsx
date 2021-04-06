import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const Footer = (props) => {
  return (
    <>
      <>
        <footer className={'footer'}>
          <Container>
            <Row>
              <Col>© {new Date().getFullYear()} (c) pizdec naxuy</Col>
            </Row>
          </Container>
        </footer>
      </>
    </>
  );
};
