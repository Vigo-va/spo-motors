import React, { useCallback, useEffect, useState } from 'react';
import { Brand } from './Selects/Brand';
import { Col, Container, Row } from 'react-bootstrap';
import { Item } from './Items/Item';
import { PaginationComponent } from '../../components/Pagination/PaginationComponent';
import { Model } from './Selects/Model';
import { Years } from './Selects/Years';
import { ItemModal } from '../../components/ItemModal/ItemModal';
import { Loader } from '../../components/Loader/Loader';
const axios = require('axios');

export const CatalogPage = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBrand, setCurrentBrand] = useState({});
  const [currentModel, setCurrentModel] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [currentItem, setCurrentItem] = useState({ img: [] });
  const [filter, setFilter] = useState('all');
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const brandsOnChange = async (e) => {
    setIsLoading(true);
    setCurrentBrand({ name: e.value, id: e.id });
    setFilter('brand');

    const items = await axios.get(`/api/admin/itemsList${e.id}`);
    setItems(items.data.items);
    setItemsCount(items.data.itemsCount);

    const models = await axios.get(`/api/admin/modelsList${e.id}`);
    setModels(models.data.modelMap);
    setCurrentYear(null);
    setCurrentModel(null);
    setIsLoading(false);
  };

  const modelsOnChange = async (e) => {
    setIsLoading(true);
    setCurrentModel({ name: e.value, id: e.id });
    setFilter('model');
    setCurrentPage(1);
    const items = await axios.get('/api/admin/items-list', {
      params: {
        brandId: currentBrand.id,
        modelId: e.id,
        filter: 'model',
        page: 1,
      },
    });

    setItems(items.data.items);
    setItemsCount(items.data.itemsCount);

    const years = await axios.get(`/api/admin/modelYears${e.id}`);
    setYears(years.data.modelYears);
    setCurrentYear(null);
    setIsLoading(false);
  };

  const yearsOnChange = (e) => {
    setCurrentYear(e.value);
  };

  const getItemsList = async (e) => {
    setIsLoading(true);
    let selectedPage = +e.selected + 1;
    setCurrentPage(selectedPage);
    if (filter === 'all') {
      const items = await axios.get('/api/admin/items-list', {
        params: {
          filter: filter,
          page: Number(selectedPage),
        },
      });

      setItems(items.data.items);
      setIsLoading(false);
    }
    if (filter === 'brand') {
      const items = await axios.get('/api/admin/items-list', {
        params: {
          brandId: currentBrand.id,
          filter: filter,
          page: Number(selectedPage),
        },
      });

      setItems(items.data.items);
      setIsLoading(false);
    }
    if (filter === 'model') {
      const items = await axios.get('/api/admin/items-list', {
        params: {
          brandId: currentBrand.id,
          modelId: currentModel.id,
          filter: filter,
          page: Number(selectedPage),
        },
      });

      setItems(items.data.items);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const itemModalShow = (e) => {
    let id = e.currentTarget.id;
    let filtered = items.filter((item) => item._id === id);
    filtered.map((item) => {
      setCurrentItem({
        name: item.name,
        img: item.img,
        description: item.description,
        price: item.price,
        article: item.article,
        brandName: item.brandName,
        modelName: item.modelName,
      });
    });
    console.log(filtered);
    setModalToggle(true);
  };

  const itemModalClose = () => {
    setModalToggle(false);
    console.log(currentItem);
  };

  const itemsList = items.map((item) => {
    return (
      <Item
        key={item.key}
        images={item.img}
        title={item.name}
        description={item.description}
        price={item.price}
        article={item.article}
        brandName={item.brandName}
        modelName={item.modelName}
        id={item._id}
        itemModalShow={itemModalShow}
        isAdmin={false}
      />
    );
  });

  const getData = useCallback(() => {
    axios
      .all([
        axios.get('/api/admin/items-list', {
          params: {
            filter: 'all',
            page: 1,
          },
        }),

        axios.get('/api/admin/brandsList'),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response1);
          setItems(response1.data.items);
          setItemsCount(response1.data.itemsCount);
          setBrands(response2.data.brandMap);
          console.log(response2);
        })
      );
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container className={'catalog'}>
      <Row>
        <Col md={3} className={'catalogFilter'}>
          <Brand
            brands={brands}
            brandsOnChange={brandsOnChange}
            isLoading={isLoading}
          />
          <Model
            models={models}
            modelsOnChange={modelsOnChange}
            currentModel={currentModel}
            isLoading={isLoading}
          />
          <Years
            years={years}
            yearsOnChange={yearsOnChange}
            currentYear={currentYear}
            isLoading={isLoading}
          />
        </Col>
        <Col md={9} className={'catalogItems'}>
          <Row>
            <Col xs={12} className={'paginationBlock'}>
              <PaginationComponent
                itemsCount={itemsCount}
                getItems={getItemsList}
                currentPage={currentPage}
              />
            </Col>
            {isLoading ? <Loader /> : itemsList}
            <ItemModal
              show={modalToggle}
              onHide={itemModalClose}
              item={currentItem}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
