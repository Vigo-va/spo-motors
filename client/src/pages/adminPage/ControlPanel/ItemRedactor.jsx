import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { PaginationComponent } from '../../../components/Pagination/PaginationComponent';
import { Brand } from '../../CatalogPage/Selects/Brand';
import { Model } from '../../CatalogPage/Selects/Model';
import { Years } from '../../CatalogPage/Selects/Years';

export const ItemRedactor = (props) => {
  return (
    <Row>
      <Col md={4} className={'brandsRedactor'}>
        <h4>Добавить Товар</h4>
        <Brand brands={props.brands} brandsOnChange={props.brandsOnChange} />
        <Model
          models={props.models}
          modelsOnChange={props.modelsOnChange}
          currentModel={props.currentModel}
        />
        <Years
          years={props.years}
          yearsOnChange={props.yearsOnChange}
          currentYear={props.currentYear}
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
            aria-label={'Small'}
            aria-describedby={'inputGroup-sizing-sm'}
            onChange={props.createItemNameInput}
          />
        </InputGroup>
        <InputGroup size={'sm'} className={'mb-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text className={'inputLabel'}>Описание</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            onChange={props.createItemDescriptionInput}
          />
        </InputGroup>
        <InputGroup size={'sm'} className={'mb-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text
              className={'inputLabel'}
              id={'inputGroup-sizing-sm'}
            >
              Цена
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label={'Small'}
            aria-describedby={'inputGroup-sizing-sm'}
            onChange={props.createItemPriceInput}
          />
        </InputGroup>
        <InputGroup size={'sm'} className={'mb-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text
              className={'inputLabel'}
              id={'inputGroup-sizing-sm'}
            >
              Артикул
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label={'Small'}
            aria-describedby={'inputGroup-sizing-sm'}
            onChange={props.createItemArticleInput}
          />
        </InputGroup>
        <form>
          <h3>Добавление фотографий</h3>
          <div className="form-group">
            <input
              type="file"
              formEncType={'multipart/form-data'}
              accept={'image/x-png,image/gif,image/jpeg'}
              multiple
              onChange={props.onFileChange}
            />
          </div>
        </form>
        <Button
          className={'brandsRedactorBtn'}
          onClick={props.createItem}
          block
        >
          Создать
        </Button>
      </Col>
      <Col md={8}>
        <Row>{props.items}</Row>
        <PaginationComponent
          itemsCount={props.itemsCount}
          getItemsByBrand={props.getItemsByBrand}
          currentPage={props.currentPage}
        />
      </Col>
    </Row>
  );
};
