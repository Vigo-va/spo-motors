import React from 'react';
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
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
            value={props.brandData.name}
            onChange={props.createBrandInput}
          />
        </InputGroup>
        <Button
          className={'controlPanelBtn'}
          onClick={props.createBrand}
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
        <Row>{props.isLoading ? <Loader /> : props.brands}</Row>
      </Col>
    </Row>
  );
};
