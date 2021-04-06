import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';

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
            onChange={props.createBrandInput}
          />
        </InputGroup>
        <Button
          className={'brandsRedactorBtn'}
          onClick={props.createBrand}
          block
        >
          Создать
        </Button>
      </Col>
      <Col md={8}>
        <Row>{props.brands}</Row>
      </Col>
    </Row>
  );
};
