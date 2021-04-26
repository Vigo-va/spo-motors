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

  const models = props.models.map((model, i) => {
    if (!model) {
      return <h1> No data </h1>;
    }
    return (
      <Col key={i} md={2} className={'brandsRedactorItem'}>
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
        key={item._id}
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
      />
    );
  });
  if (props.toggle === 'brands') {
    return (
      <BrandsRedactor
        brands={brands}
        brandData={props.brandData}
        brandChangeHandler={props.brandChangeHandler}
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
        modelData={props.modelData}
        modelChangeHandler={props.modelChangeHandler}
        onBrandsChange={props.onBrandsChange}
        currentBrand={props.currentBrand}
        createModel={props.createModel}
        isLoading={props.isLoading}
        isCreating={props.isCreating}
      />
    );
  }
  if (props.toggle === 'items') {
    return (
      <ItemRedactor
        // Data
        brands={props.brands}
        models={props.models}
        years={props.years}
        items={items}
        itemChangeHandler={props.itemChangeHandler}
        itemData={props.itemData}
        onBrandsChange={props.onBrandsChange}
        onModelsChange={props.onModelsChange}
        onYearsChange={props.onYearsChange}
        onFileChange={props.onFileChange}
        createItem={props.createItem}
        deleteItem={props.deleteItem}
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
        article={props.article}
        getItemByArticle={props.getItemByArticle}
        onArticleChange={props.onArticleChange}
        currentBrand={props.currentBrand}
        displayMessage={props.displayMessage}
      />
    );
  }
  return <></>;
};
