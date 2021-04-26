import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ModalMessage } from '../../components/Modal/ModalMessage';

export const ContactsPage = (props) => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    message: '',
  });

  const [result, setResult] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const phoneMask = (e) => {
    let val = e.currentTarget.value;
    console.log(val);
    val = val.replace(/ /gm, '');
    let num = `${val.substring(0, 3)} ${val.substring(3, 6)} ${val.substring(
      6,
      8
    )} ${val.substring(8, 10)}`;
    num = num.trim();
    setForm({ ...form, phoneNumber: num });
    console.log(num);
  };

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      setIsFetching(true);
      setModalShow(true);
      const response = await axios.post('/api/contacts/send-email', {
        ...form,
      });
      console.log(response);
      setResult(response.data);
      setIsFetching(false);
      setForm({ ...form, name: '', phoneNumber: '', message: '' });
    } catch (e) {
      setResult({
        success: false,
        message: 'что-то пошло не так, попробуйте снова!',
      });
      setIsFetching(false);
      setForm({ ...form, name: '', phoneNumber: '', message: '' });
    }
  };
  return (
    <>
      <div className={'formBlock'}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={'contactsBlock'}>
                <h1>Контакты</h1>
                <p>Адрес: Люберцы, улица Гоголя, 9А</p>
                <p>Номер телефона: +7 (916) 912-12-37</p>
                <p>Email: spomotors@gmail.com</p>
              </div>
            </Col>
            <Col md={{ span: 5, offset: 1 }}>
              <h1 className={'formTitle'}>форма обратной связи</h1>
              <Form>
                <Form.Group>
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type={'text'}
                    name={'name'}
                    placeholder={'Введите Имя'}
                    onChange={changeHandler}
                    value={form.name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control
                    type={'text'}
                    name={'phoneNumber'}
                    placeholder={'+7(***) ***-**-**'}
                    onChange={phoneMask}
                    value={`${form.phoneNumber}`}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>интересующий товар/задать вопрос</Form.Label>
                  <Form.Control
                    as={'textarea'}
                    rows={3}
                    placeholder={'Сообщение'}
                    name={'message'}
                    onChange={changeHandler}
                    value={form.message}
                  />
                </Form.Group>
                <Button
                  className={'formBtn'}
                  variant={'outline-secondary'}
                  type={'submit'}
                  onClick={sendEmail}
                  block
                >
                  Отправить
                </Button>
              </Form>
              <ModalMessage
                show={modalShow}
                isLoading={isFetching}
                message={result.message}
                onHide={() => setModalShow(false)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
