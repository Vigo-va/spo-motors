import React, { useCallback, useEffect, useState } from 'react';
import { Brand } from './Selects/Brand';
import { Col, Container, Row } from 'react-bootstrap';
import { Item } from './Items/Item';
import { PaginationComponent } from '../../components/Pagination/PaginationComponent';
import { Model } from './Selects/Model';
import { Years } from './Selects/Years';
const axios = require('axios');

export const CatalogPage = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBrand, setCurrentBrand] = useState({});
  const [currentModel, setCurrentModel] = useState({});
  const [currentYear, setCurrentYear] = useState('');
  const [filter, setFilter] = useState('brand');

  const brandsOnChange = (e) => {
    setCurrentBrand({ name: e.value, id: e.id });
    setFilter('brand');
    axios.get(`/api/admin/itemsList${e.id}`).then((response) => {
      setItems(response.data.items);
      setItemsCount(response.data.itemsCount);
    });
    axios.get(`/api/admin/modelsList${e.id}`).then((response) => {
      setModels(response.data.modelMap);
    });
  };

  const modelsOnChange = (e) => {
    setCurrentModel({ name: e.value, id: e.id });
    setFilter('model');
    setCurrentPage(1);
    axios
      .get('/api/admin/items-list', {
        params: {
          brandId: currentBrand.id,
          modelId: e.id,
          filter: 'model',
          page: 1,
        },
      })
      .then((response) => {
        setItems(response.data.items);
        setItemsCount(response.data.itemsCount);
      });
    return axios.get(`/api/admin/modelYears${e.id}`).then((response) => {
      setYears(response.data.modelYears);
      setCurrentYear(null);
      console.log(years);
    });
  };

  const yearsOnChange = (e) => {
    setCurrentYear(e.value);
  };

  const getItemsList = (e) => {
    try {
      console.log(e.target.innerText);
      setCurrentPage(Number(e.target.innerText));
      axios
        .get('/api/admin/items-list', {
          params: {
            brandId: currentBrand.id,
            modelId: currentModel.id,
            filter: filter,
            page: Number(e.target.innerText),
          },
        })
        .then((response) => {
          setItems(response.data.items);
        });
    } catch (e) {}
  };

  const itemsList = items.map((item) => {
    return (
      <Item
        images={item.img}
        title={item.name}
        description={item.description}
        price={item.price}
        article={item.article}
        id={item._id}
        isAdmin={false}
      />
    );
  });

  const getItems = useCallback(async () => {
    try {
      axios
        .get('/api/admin/items-list', {
          params: {
            filter: 'all',
            page: 1,
          },
        })
        .then((response) => {
          setItems(response.data.items);
          setItemsCount(response.data.itemsCount);
        });
    } catch (e) {}
  }, []);
  const getBrands = useCallback(async () => {
    try {
      await axios.get('/api/admin/brandsList').then((response) => {
        setBrands(response.data.brandMap);
      });
    } catch (e) {}
  }, []);

  useEffect(() => {
    getBrands();
    getItems();
  }, [getBrands, getItems]);

  return (
    <Container className={'catalog'}>
      <Row>
        <Col md={3} className={'catalogFilter'}>
          <Brand brands={brands} brandsOnChange={brandsOnChange} />
          <Model
            models={models}
            modelsOnChange={modelsOnChange}
            currentModel={currentModel}
          />
          <Years
            years={years}
            yearsOnChange={yearsOnChange}
            currentYear={currentYear}
          />
        </Col>
        <Col md={9} className={'catalogItems'}>
          <Row>
            {itemsList}
            <PaginationComponent
              itemsCount={itemsCount}
              getItemsByBrand={getItemsList}
              currentPage={currentPage}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
