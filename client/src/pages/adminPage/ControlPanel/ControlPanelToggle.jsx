import React from 'react';
import { Button, Col, ListGroup } from 'react-bootstrap';
import { Item } from '../../CatalogPage/Items/Item';
import { BrandsRedactor } from './BrandsRedactor';
import { ModelRedactor } from './ModelRedactor';
import { ItemRedactor } from './ItemRedactor';

export const ControlPanelToggle = (props) => {
  const brands = props.brands.map((brand) => {
    return (
      <Col md={2} key={brand._id} className={'brandsRedactorItem'}>
        <p> {brand.name || 'Название бренда'} </p>
        <Button variant={'link'} value={brand._id} onClick={props.deleteBrand}>
          Удалить
        </Button>
      </Col>
    );
  });

  const models = props.models.map((model) => {
    if (!model) {
      return <h1> No data </h1>;
    }
    return (
      <Col md={2} className={'brandsRedactorItem'}>
        <p> {model.name || 'Название бренда'} </p>

        {model.years.length > 0 ? (
          <ListGroup>
            <ListGroup.Item>{model.years[0]}</ListGroup.Item>
            <ListGroup.Item>
              {model.years[model.years.length - 1]}
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <ListGroup>
            <ListGroup.Item>От</ListGroup.Item>
            <ListGroup.Item>до</ListGroup.Item>
          </ListGroup>
        )}

        <Button variant={'link'} value={model._id} onClick={props.deleteModel}>
          Удалить
        </Button>
      </Col>
    );
  });

  const items = props.items.map((item) => {
    return (
      <Item
        images={item.img}
        title={item.name}
        description={item.description}
        price={item.price}
        article={item.article}
        modelName={item.modelName}
        brandName={item.brandName}
        id={item._id}
        isAdmin={true}
        itemModalShow={props.itemModalShow}
        itemDelete={props.itemDelete}
      />
    );
  });
  if (props.toggle === 'brands') {
    return (
      <BrandsRedactor
        brands={brands}
        brandData={props.brandData}
        createBrandInput={props.createBrandInput}
        createBrand={props.createBrand}
        isLoading={props.isLoading}
        isCreating={props.isCreating}
      />
    );
  }
  if (props.toggle === 'models') {
    return (
      <ModelRedactor
        brands={props.brands}
        models={models}
        brandsOnChange={props.brandsOnChange}
        modelName={props.modelName}
        modelYearFrom={props.modelYearFrom}
        modelYearTo={props.modelYearTo}
        createModelInput={props.createModelInput}
        modelYearFromInput={props.modelYearFromInput}
        modelYearToInput={props.modelYearToInput}
        createModel={props.createModel}
        isLoading={props.isLoading}
        isCreating={props.isCreating}
      />
    );
  }
  if (props.toggle === 'items') {
    return (
      <ItemRedactor
        brands={props.brands}
        models={props.models}
        years={props.years}
        items={items}
        itemName={props.itemName}
        itemDescription={props.itemDescription}
        itemPrice={props.itemPrice}
        itemArticle={props.itemArticle}
        brandsOnChange={props.brandsOnChange}
        modelsOnChange={props.modelsOnChange}
        yearsOnChange={props.yearsOnChange}
        onFileChange={props.onFileChange}
        createItemNameInput={props.createItemNameInput}
        createItemDescriptionInput={props.createItemDescriptionInput}
        createItemPriceInput={props.createItemPriceInput}
        createItemArticleInput={props.createItemArticleInput}
        createItem={props.createItem}
        itemDelete={props.itemDelete}
        itemsCount={props.itemsCount}
        getItems={props.getItems}
        currentPage={props.currentPage}
        currentModel={props.currentModel}
        currentYear={props.currentYear}
        modalToggle={props.modalToggle}
        itemModalClose={props.itemModalClose}
        currentItem={props.currentItem}
        isLoading={props.isLoading}
        isCreating={props.isCreating}
      />
    );
  }
  return <></>;
};
