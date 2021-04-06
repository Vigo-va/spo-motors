import React from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

export const ContactsPage = (props) => {
  return (
    <>
      <div className={'formBlock'}>
        <Container>
          <Row>
            <Col md={6}>
              <h1>Контакты</h1>
            </Col>
            <Col md={{ span: 5, offset: 1 }}>
              <h1 className={'formTitle'}>форма обратной связи</h1>
            </Col>
            <Col md={6}>
              <p>Адрес: 117447 Москва, ул. Ебанная, д.10</p>
              <p>Номер телефона: +7(999) 999-99-99</p>
              <p>Email: ebanii@gmail.com</p>
            </Col>
            <Col md={{ span: 5, offset: 1 }} className={'submitForm'}>
              <Form>
                <Form.Group>
                  <Form.Label>Имя</Form.Label>
                  <Form.Control type="text" placeholder="Введите Имя" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control type="text" placeholder="+7(***) ***-**-**" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>интересующий товар/задать вопрос</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Сообщение"
                  />
                </Form.Group>
                <Button
                  className={'formBtn'}
                  variant={'outline-secondary'}
                  type={'submit'}
                  block
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    </>
  );
};
