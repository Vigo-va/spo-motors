import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Brand } from '../../CatalogPage/Selects/Brand';

export const ModelRedactor = (props) => {
  return (
    <Row>
      <Col md={4}>
        <h4>Добавить Модель</h4>
        <Brand brands={props.brands} brandsOnChange={props.brandsOnChange} />
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
            aria-describedby={'inputGroup-sizing-sm'}
            onChange={props.createModelInput}
          />
        </InputGroup>
        <InputGroup size={'sm'} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text className={'inputLabel'}>
              Год от и до
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl onChange={props.modelYearFromInput} />
          <FormControl onChange={props.modelYearToInput} />
        </InputGroup>
        <Button
          className={'brandsRedactorBtn'}
          onClick={props.createModel}
          block
        >
          Создать
        </Button>
      </Col>
      <Col md={8}>
        <Row>{props.models}</Row>
      </Col>
    </Row>
  );
};
