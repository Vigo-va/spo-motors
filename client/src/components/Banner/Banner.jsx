import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { ModalMessage } from '../Modal/ModalMessage';

export const Banner = (props) => {
  const [form, setForm] = useState({ phoneNumber: '' });
  const [result, setResult] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const sendRequest = async (e) => {
    try {
      e.preventDefault();
      setIsFetching(true);
      setModalShow(true);
      const response = await axios.post('/api/contacts/send-request', {
        ...form,
      });
      console.log(response);
      setResult(response.data);
      setIsFetching(false);
      setForm({ ...form, phoneNumber: '' });
    } catch (e) {
      setResult({
        success: false,
        message: 'что-то пошло не так, попробуйте снова!',
      });
      setIsFetching(false);
      setForm({ ...form, phoneNumber: '' });
    }
  };
  return (
    <>
      <Container fluid>
        <Row className={'banner'}>
          <Col md={{ span: 3, offset: 2 }}>
            <h6 className={'bannerTitle'}>Заказать обратный звонок</h6>
          </Col>
          <Col md={5} className={'bannerInputSection'}>
            <InputGroup className={'mb-3 bannerInput'}>
              <InputMask mask={'+7(999)999-99-99'} />
              {/*<FormControl*/}
              {/*  placeholder={'Введите номер телефона'}*/}
              {/*  aria-label={'Phone number'}*/}
              {/*  name={'phoneNumber'}*/}
              {/*  value={form.phoneNumber}*/}
              {/*  onChange={changeHandler}*/}
              {/*/>*/}
              <InputGroup.Append>
                <Button
                  className={'bannerBtn'}
                  variant={'outline-secondary'}
                  onClick={sendRequest}
                >
                  Заказать
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <ModalMessage
              show={modalShow}
              isFetching={isFetching}
              result={result}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
