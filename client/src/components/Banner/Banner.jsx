import React from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';

export const Banner = (props) => {
  return (
    <>
      <Container fluid>
        <Row className={'banner'}>
          <Col md={{ span: 3, offset: 2 }}>
            <h6 className={'bannerTitle'}>Заказать обратный звонок</h6>
          </Col>
          <Col md={5} className={'bannerInputSection'}>
            <InputGroup className={'mb-3 bannerInput'}>
              <FormControl
                placeholder="Введите номер телефона"
                aria-label="Phone number"
              />
              <InputGroup.Append>
                <Button className={'bannerBtn'} variant={'outline-secondary'}>
                  Заказать
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
