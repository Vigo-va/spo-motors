import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Loader } from '../../../components/Loader/Loader';

export const BrandsRedactor = (props) => {
  return (
    <Row>
      <Col md={4} className={'brandsRedactor'}>
        <h4>Добавить Марку</h4>
        <InputGroup size={'sm'} className={'mb-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text
              className={'inputLabel'}
              id={'inputGroup-sizing-sm'}
            >
              Название
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label={'Small'}
            aria-describedby={'inputGroup-sizing-sm'}
            name={'name'}
            value={props.brandData.name}
            onChange={props.brandChangeHandler}
          />
        </InputGroup>
        <Button
          className={'controlPanelBtn'}
          onClick={props.createBrand}
          disabled={props.isLoading}
          block
        >
          Создать
        </Button>
      </Col>
      <Col md={8}>
        <Row>
          {props.isLoading ? <Loader class={'loader'} /> : props.brands}
        </Row>
      </Col>
    </Row>
  );
};
