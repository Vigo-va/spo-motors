import React from 'react';
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { PaginationComponent } from '../../../components/Pagination/PaginationComponent';
import { Brand } from '../../CatalogPage/Selects/Brand';
import { Model } from '../../CatalogPage/Selects/Model';
import { Years } from '../../CatalogPage/Selects/Years';
import { ItemModal } from '../../../components/ItemModal/ItemModal';
import { Loader } from '../../../components/Loader/Loader';

export const ItemRedactor = (props) => {
  return (
    <Row>
      <Col md={4} className={'itemsRedactor'}>
        <h4 className={'controlPanelTitle'}>Добавить Товар</h4>
        <Brand
          brands={props.brands}
          brandsOnChange={props.brandsOnChange}
          isLoading={props.isLoading}
        />
        <Model
          models={props.models}
          modelsOnChange={props.modelsOnChange}
          currentModel={props.currentModel}
          isLoading={props.isLoading}
        />
        <Years
          years={props.years}
          yearsOnChange={props.yearsOnChange}
          currentYear={props.currentYear}
          isLoading={props.isLoading}
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
            value={props.itemName}
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
            value={props.itemDescription}
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
            value={props.itemPrice}
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
            value={props.itemArticle}
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
        <Button className={'controlPanelBtn'} onClick={props.createItem} block>
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
        <PaginationComponent
          itemsCount={props.itemsCount}
          getItems={props.getItems}
          currentPage={props.currentPage}
        />
        <Row>{props.isLoading ? <Loader /> : props.items}</Row>

        <ItemModal
          itemDelete={props.itemDelete}
          show={props.modalToggle}
          onHide={props.itemModalClose}
          item={props.currentItem}
          isAdmin={true}
        />
      </Col>
    </Row>
  );
};
