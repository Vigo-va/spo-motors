import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { ControlPanelToggle } from './ControlPanel/ControlPanelToggle';
import { ModalMessage } from '../../components/Modal/ModalMessage';

const axios = require('axios').default;

export const AdminPage = () => {
  // GET DATA
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [items, setItems] = useState([]);

  // POST DATA
  const [brandData, setBrandData] = useState({
    name: '',
  });

  const [modelData, setModelData] = useState({
    name: '',
    yearFrom: '',
    yearTo: '',
    brandName: '',
    brandId: '',
  });

  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: '',
    article: '',
    year: '',
    modelName: '',
    brandName: '',
    modelId: '',
    brandId: '',
  });
  const [itemFiles, setItemFiles] = useState({
    img: '',
  });

  // Current Data
  const [currentBrand, setCurrentBrand] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [currentItem, setCurrentItem] = useState({ img: [] });

  //Pagination, Filter, Search
  const [filter, setFilter] = useState('all');
  const [itemsCount, setItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [article, setArticle] = useState('');

  // Messages
  const [displayMessage, setDisplayMessage] = useState('');
  const [message, setMessage] = useState('');
  const [messageModalShow, setMessageModalShow] = useState(false);

  // toggles
  const [controlPanelToggle, setControlPanelToggle] = useState('');
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  // Brand
  const brandChangeHandler = (event) => {
    return setBrandData({
      ...brandData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const brandDataClear = () => {
    return setBrandData({
      ...brandData,
      name: '',
    });
  };

  const createBrand = async () => {
    try {
      setIsLoading(true);
      setMessageModalShow(true);
      const response = await axios.post('/api/admin/create-brand', brandData);
      setBrands([response.data.brand, ...brands]);
      setMessage(response.data.message);
      setIsLoading(false);
      brandDataClear();
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const deleteBrand = async (event) => {
    try {
      setIsLoading(true);
      setMessageModalShow(true);
      const id = event.currentTarget.value;
      const response = await axios.post('/api/admin/delete-brand', { id });
      setBrands([...brands.filter((item) => item._id !== id)]);
      setMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const onBrandsChange = async (event) => {
    try {
      setIsLoading(true);
      setCurrentBrand({ name: event.value, id: event.id });
      setModelData({ ...modelData, brandName: event.value, brandId: event.id });
      setItemData({ ...itemData, brandName: event.value, brandId: event.id });
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

  // Model
  const modelChangeHandler = (event) => {
    return setModelData({
      ...modelData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const modelDataClear = () => {
    setCurrentBrand(null);
    return setModelData({
      ...modelData,
      name: '',
      yearFrom: '',
      yearTo: '',
      brandName: '',
      brandId: '',
    });
  };

  const createModel = async () => {
    try {
      setIsLoading(true);
      setMessageModalShow(true);
      const response = await axios.post('/api/admin/create-model', modelData);
      setModels([response.data.model, ...models]);
      setMessage(response.data.message);
      setIsLoading(false);
      modelDataClear();
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const deleteModel = async (event) => {
    try {
      setIsLoading(true);
      setMessageModalShow(true);
      const id = event.currentTarget.value;
      const response = await axios.post('/api/admin/delete-model', { id });
      setModels([...models.filter((item) => item._id !== id)]);
      setMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const onModelsChange = async (event) => {
    try {
      setIsLoading(true);
      setCurrentModel({ name: event.value, id: event.id });
      setItemData({ ...itemData, modelName: event.value, modelId: event.id });
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

  // Year
  const onYearsChange = (event) => {
    setCurrentYear(event.value);
    setDisplayMessage('');
    setArticle('');
    return setItemData({ ...itemData, year: event.value });
  };

  // Item
  const itemChangeHandler = (event) => {
    return setItemData({
      ...itemData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onFileChange = (e) => {
    return setItemFiles({ img: e.target.files });
  };

  const itemDataClear = () => {
    setCurrentBrand(null);
    setCurrentModel(null);
    setCurrentYear(null);

    setItemData({
      ...itemData,
      name: '',
      description: '',
      price: '',
      article: '',
      year: '',
      modelName: '',
      brandName: '',
      modelId: '',
      brandId: '',
    });
  };

  const createItem = async () => {
    try {
      setIsLoading(true);
      setMessageModalShow(true);
      const item = await axios.post('/api/admin/create-item', itemData);
      const formData = new FormData();
      for (const key of Object.keys(itemFiles.img)) {
        formData.append('img', itemFiles.img[key]);
      }
      formData.append('id', item.data.item._id);
      const response = await axios.post('/api/admin/upload-img', formData);
      setItems([response.data.item, ...items]);
      setMessage(response.data.message);
      setIsLoading(false);
      itemDataClear();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const deleteItem = async (event) => {
    try {
      setIsLoading(true);
      setModalToggle(false);
      setMessageModalShow(true);
      const id = event.currentTarget.value;
      const response = await axios.post('/api/admin/delete-item', { id });
      setItems([...items.filter((item) => item._id !== id)]);
      setMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };
  // Modals
  const messageModalOnHide = () => {
    setMessageModalShow(false);
    setMessage('');
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
  };

  // toggles
  const changeControlPanelToggle = (event) => {
    setIsLoadingBtn(true);
    console.log(event.target.value);
    setControlPanelToggle(event.target.value);
    setIsLoadingBtn(false);
  };

  // Get data
  const onArticleChange = (event) => {
    setArticle(event.currentTarget.value);
  };

  const getItemByArticle = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/admin/get-item`, {
        params: { article },
      });
      console.log(response.data.message);
      setItems(response.data.items);
      setDisplayMessage('');
      setIsLoading(false);
    } catch (error) {
      setDisplayMessage(error.response.data.message);
      console.log(error.response.data.message);
      setIsLoading(false);
    }
  };

  const getItems = async (event) => {
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
    <>
      <Container className={'App'}>
        <Row>
          <Col md={4} className={'controlPanel'}>
            <Button
              className={'controlPanelBtn'}
              value={'brands'}
              onClick={changeControlPanelToggle}
              disabled={isLoadingBtn}
            >
              {isLoadingBtn ? (
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
              Редактировать марки
            </Button>
          </Col>
          <Col md={4} className={'controlPanel'}>
            <Button
              className={'controlPanelBtn'}
              value={'models'}
              onClick={changeControlPanelToggle}
              disabled={isLoadingBtn}
            >
              {isLoadingBtn ? (
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
              Редактировать модели
            </Button>
          </Col>
          <Col md={4} className={'controlPanel'}>
            <Button
              className={'controlPanelBtn'}
              value={'items'}
              onClick={changeControlPanelToggle}
              disabled={isLoadingBtn}
            >
              {isLoadingBtn ? (
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
              Редактировать товары
            </Button>
          </Col>
          <Col>
            <ControlPanelToggle
              // Data
              brands={brands}
              models={models}
              years={years}
              items={items}
              // Toggles
              toggle={controlPanelToggle}
              // Brand
              brandData={brandData}
              currentBrand={currentBrand}
              brandChangeHandler={brandChangeHandler}
              onBrandsChange={onBrandsChange}
              createBrand={createBrand}
              deleteBrand={deleteBrand}
              // Model
              modelData={modelData}
              currentModel={currentModel}
              modelChangeHandler={modelChangeHandler}
              onModelsChange={onModelsChange}
              createModel={createModel}
              deleteModel={deleteModel}
              // years
              onYearsChange={onYearsChange}
              currentYear={currentYear}
              // Item
              itemData={itemData}
              currentItem={currentItem}
              itemChangeHandler={itemChangeHandler}
              onFileChange={onFileChange}
              createItem={createItem}
              deleteItem={deleteItem}
              // Pagination
              itemsCount={itemsCount}
              currentPage={currentPage}
              // Get data
              getItems={getItems}
              article={article}
              onArticleChange={onArticleChange}
              getItemByArticle={getItemByArticle}
              // Modal
              modalToggle={modalToggle}
              itemModalShow={itemModalShow}
              itemModalClose={itemModalClose}
              // toggle
              isLoading={isLoading}
              // Message
              displayMessage={displayMessage}
            />
            <ModalMessage
              show={messageModalShow}
              isLoading={isLoading}
              message={message}
              onHide={messageModalOnHide}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
