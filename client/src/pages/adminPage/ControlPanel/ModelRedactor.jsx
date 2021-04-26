import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Brand } from '../../CatalogPage/Selects/Brand';
import { Loader } from '../../../components/Loader/Loader';

export const ModelRedactor = (props) => {
  return (
    <Row>
      <Col md={4} className={'modelRedactor'}>
        <h4 className={'controlPanelTitle'}>Добавить Модель</h4>
        <Brand
          brands={props.brands}
          onBrandsChange={props.onBrandsChange}
          currentBrand={props.currentBrand}
        />
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
            name={'name'}
            onChange={props.modelChangeHandler}
            value={props.modelData.name}
          />
        </InputGroup>
        <InputGroup size={'sm'} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text className={'inputLabel'}>
              Год от и до
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name={'yearFrom'}
            onChange={props.modelChangeHandler}
            value={props.modelData.yearFrom}
          />
          <FormControl
            name={'yearTo'}
            onChange={props.modelChangeHandler}
            value={props.modelData.yearTo}
          />
        </InputGroup>
        <Button
          className={'controlPanelBtn'}
          onClick={props.createModel}
          disabled={props.isLoading}
          block
        >
          Создать
        </Button>
      </Col>
      <Col md={8}>
        <Row>
          {props.isLoading ? <Loader class={'loader'} /> : props.models}
        </Row>
      </Col>
    </Row>
  );
};
