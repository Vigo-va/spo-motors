import React, { useCallback, useEffect, useState } from 'react';
import { Brand } from './Selects/Brand';
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  InputGroup,
} from 'react-bootstrap';
import { Item } from './Items/Item';
import { PaginationComponent } from '../../components/Pagination/PaginationComponent';
import { Model } from './Selects/Model';
import { Years } from './Selects/Years';
import { ItemModal } from '../../components/ItemModal/ItemModal';
import { Loader } from '../../components/Loader/Loader';
const axios = require('axios');

export const CatalogPage = () => {
  // GET DATA
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [items, setItems] = useState([]);

  // Current
  const [currentBrand, setCurrentBrand] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [currentItem, setCurrentItem] = useState({ img: [] });

  // Pagination, filter, search
  const [itemsCount, setItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [article, setArticle] = useState('');

  // message
  const [displayMessage, setDisplayMessage] = useState('');

  //toggles
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onBrandsChange = async (event) => {
    try {
      setIsLoading(true);
      setCurrentBrand({ name: event.value, id: event.id });
      setDisplayMessage('');
      setArticle('');
      setFilter('brand');

      const items = await axios.get(`/api/admin/items-list${event.id}`);
      setItems(items.data.items);
      setItemsCount(items.data.itemsCount);

      const models = await axios.get(`/api/admin/models-list${event.id}`);
      setModels(models.data.models);
      setCurrentYear(null);
      setCurrentModel(null);
      setIsLoading(false);
    } catch (error) {
      // setMessage(error.models.data.message);
      setIsLoading(false);
    }
  };
  const onModelsChange = async (event) => {
    try {
      setIsLoading(true);
      setCurrentModel({ name: event.value, id: event.id });
      setDisplayMessage('');
      setArticle('');
      setFilter('model');
      setCurrentPage(1);
      const items = await axios.get('/api/admin/items-list', {
        params: {
          brandId: currentBrand.id,
          modelId: event.id,
          filter: 'model',
          page: 1,
        },
      });
      setItems(items.data.items);
      setItemsCount(items.data.itemsCount);

      const years = await axios.get(`/api/admin/model-years${event.id}`);
      setYears(years.data.modelYears);
      setCurrentYear(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onYearsChange = (event) => {
    setCurrentYear(event.value);
    setDisplayMessage('');
    setArticle('');
  };

  const getItemsList = async (event) => {
    try {
      setIsLoading(true);
      let selectedPage = +event.selected + 1;
      setCurrentPage(selectedPage);
      if (filter === 'all') {
        const items = await axios.get('/api/admin/items-list', {
          params: {
            filter: filter,
            page: Number(selectedPage),
          },
        });
        console.log(items.data.items);

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
        console.log(items.data.items);

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
        console.log(items.data.items);
        setItems(items.data.items);
        setIsLoading(false);
      }
    } catch (error) {
      setDisplayMessage('Товары не найдены!');
      setIsLoading(false);
    }
  };

  const itemModalShow = (event) => {
    const id = event.currentTarget.id;
    const filtered = items.filter((item) => item._id === id);
    filtered.map((item) => {
      return setCurrentItem({
        id: item._id,
        name: item.name,
        img: item.img,
        description: item.description,
        year: item.year,
        price: item.price,
        article: item.article,
        brandName: item.brandName,
        modelName: item.modelName,
      });
    });
    setModalToggle(true);
  };

  const itemModalClose = () => {
    setModalToggle(false);
    console.log(currentItem);
  };

  let itemsList;

  if (displayMessage) {
    itemsList = (
      <Col className={'displayMessage'}>
        <h4>{displayMessage}</h4>
      </Col>
    );
  } else {
    itemsList = items.map((item) => {
      return (
        <Item
          key={item.key}
          images={item.img}
          title={item.name}
          description={item.description}
          price={item.price}
          year={item.year}
          article={item.article}
          brandName={item.brandName}
          modelName={item.modelName}
          id={item._id}
          itemModalShow={itemModalShow}
          isAdmin={false}
        />
      );
    });
  }

  const onArticleChange = (event) => {
    setArticle(event.currentTarget.value);
  };

  const getItemByArticle = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/admin/get-item`, {
        params: { article },
      });
      setItems(response.data.items);
      setDisplayMessage('');
      setIsLoading(false);
    } catch (error) {
      setDisplayMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const getData = useCallback(() => {
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
    axios.get('/api/admin/brands-list').then((response) => {
      setBrands(response.data.brands);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container className={'catalog'}>
      <Row>
        <Col md={3} className={'catalogFilter'}>
          <InputGroup className="mb-3">
            <FormControl
              type={'text'}
              placeholder={'Поиск по артикулу'}
              className={'mr-sm-2 searchInput'}
              value={article}
              onChange={onArticleChange}
            />
            <InputGroup.Append>
              <Button variant={'searchBtn'} onClick={getItemByArticle}>
                <i class="fas fa-search"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3"></InputGroup>

          <Brand
            brands={brands}
            onBrandsChange={onBrandsChange}
            isLoading={isLoading}
            currentBrand={currentBrand}
          />
          <Model
            models={models}
            onModelsChange={onModelsChange}
            currentModel={currentModel}
            isLoading={isLoading}
          />
          <Years
            years={years}
            onYearsChange={onYearsChange}
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
            {isLoading ? <Loader class={'loader'} /> : itemsList}
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
