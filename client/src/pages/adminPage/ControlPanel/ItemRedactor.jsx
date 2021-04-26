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
  let data;
  if (!props.displayMessage) {
    data = props.items;
  } else {
    data = (
      <Col className={'displayMessage'}>
        <h4>{props.displayMessage}</h4>
      </Col>
    );
  }
  return (
    <Row>
      <Col md={4} className={'itemsRedactor'}>
        <h4 className={'controlPanelTitle'}>Добавить Товар</h4>
        <InputGroup className="mb-3">
          <FormControl
            type={'text'}
            placeholder={'Поиск по артикулу'}
            className={'mr-sm-2 searchInput'}
            value={props.article}
            onChange={props.onArticleChange}
          />
          <InputGroup.Append>
            <Button variant={'searchBtn'} onClick={props.getItemByArticle}>
              <i class="fas fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Brand
          brands={props.brands}
          onBrandsChange={props.onBrandsChange}
          isLoading={props.isLoading}
          currentBrand={props.currentBrand}
        />
        <Model
          models={props.models}
          onModelsChange={props.onModelsChange}
          currentModel={props.currentModel}
          isLoading={props.isLoading}
        />
        <Years
          years={props.years}
          onYearsChange={props.onYearsChange}
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
            name={'name'}
            onChange={props.itemChangeHandler}
            value={props.itemData.name}
          />
        </InputGroup>
        <InputGroup size={'sm'} className={'mb-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text className={'inputLabel'}>Описание</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            name={'description'}
            onChange={props.itemChangeHandler}
            value={props.itemData.description}
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
            name={'price'}
            onChange={props.itemChangeHandler}
            value={props.itemData.price}
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
            name={'article'}
            onChange={props.itemChangeHandler}
            value={props.itemData.article}
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
        <Row>{props.isLoading ? <Loader class={'loader'} /> : data}</Row>

        <ItemModal
          deleteItem={props.deleteItem}
          show={props.modalToggle}
          onHide={props.itemModalClose}
          item={props.currentItem}
          isAdmin={true}
        />
      </Col>
    </Row>
  );
};
