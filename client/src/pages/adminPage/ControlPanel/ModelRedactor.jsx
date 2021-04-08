import React from 'react';
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Brand } from '../../CatalogPage/Selects/Brand';
import { Loader } from '../../../components/Loader/Loader';

export const ModelRedactor = (props) => {
  return (
    <Row>
      <Col md={4} className={'modelRedactor'}>
        <h4 className={'controlPanelTitle'}>Добавить Модель</h4>
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
            value={props.modelName}
          />
        </InputGroup>
        <InputGroup size={'sm'} className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text className={'inputLabel'}>
              Год от и до
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={props.modelYearFromInput}
            value={props.modelYearFrom}
          />
          <FormControl
            onChange={props.modelYearToInput}
            value={props.modelYearTo}
          />
        </InputGroup>
        <Button
          className={'controlPanelBtn'}
          onClick={props.createModel}
          disabled={props.isCreating}
          block
        >
          {props.isCreating ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            ''
          )}
          Создать
        </Button>
      </Col>
      <Col md={8}>
        <Row>{props.isLoading ? <Loader /> : props.models}</Row>
      </Col>
    </Row>
  );
};
