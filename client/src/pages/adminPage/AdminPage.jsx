import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { ControlPanelToggle } from './ControlPanel/ControlPanelToggle';

const axios = require('axios').default;

export const AdminPage = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  const [currentBrand, setCurrentBrand] = useState({});
  const [currentModel, setCurrentModel] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [currentItem, setCurrentItem] = useState({ img: [] });

  const [newBrandData, setNewBrandData] = useState({ name: '' });

  const [modelName, setModelName] = useState('');
  const [modelYearFrom, setModelYearFrom] = useState('');
  const [modelYearTo, setModelYearTo] = useState('');

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemArticle, setItemArticle] = useState('');
  const [itemFiles, setItemFiles] = useState({
    img: '',
  });

  const [itemsCount, setItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [controlPanelToggle, setControlPanelToggle] = useState('');
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const createBrandInput = (e) => {
    return setNewBrandData({ name: e.target.value });
  };

  const clearBrandInput = () => {
    return setNewBrandData({ name: '' });
  };

  const createModelInput = (e) => {
    return setModelName(e.target.value);
  };
  const modelYearFromInput = (e) => {
    return setModelYearFrom(e.target.value);
  };
  const modelYearToInput = (e) => {
    return setModelYearTo(e.target.value);
  };

  const clearModelInput = () => {
    setModelName('');
    setModelYearFrom('');
    setModelYearTo('');
  };

  const clearItemsInput = () => {
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemArticle('');
  };

  const createItemNameInput = (e) => {
    return setItemName(e.target.value);
  };
  const createItemDescriptionInput = (e) => {
    return setItemDescription(e.target.value);
  };
  const createItemPriceInput = (e) => {
    return setItemPrice(e.target.value);
  };
  const createItemArticleInput = (e) => {
    return setItemArticle(e.target.value);
  };

  const createBrand = async () => {
    await setIsCreating(true);
    const data = await axios.post('/api/admin/newBrand', newBrandData);
    setBrands([...brands, data.data.brand]);
    setIsCreating(false);
    clearBrandInput();
  };
  const createModel = async () => {
    setIsCreating(true);
    const newModelData = {
      name: modelName,
      yearFrom: +modelYearFrom,
      yearTo: +modelYearTo,
      brandName: currentBrand.name,
      brandId: currentBrand.id,
    };
    const data = await axios.post('/api/admin/newModel', newModelData);
    setModels([...models, data.data.model]);
    setIsCreating(false);
    clearModelInput();
  };
  const createItem = async () => {
    setIsCreating(true);
    const formData = new FormData();

    for (const key of Object.keys(itemFiles.img)) {
      formData.append('img', itemFiles.img[key]);
    }
    const newItemData = {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      article: itemArticle,
      year: currentYear,
      modelName: currentModel.name,
      brandName: currentBrand.name,
      modelId: currentModel.id,
      brandId: currentBrand.id,
    };
    const item = await axios.post('/api/admin/newItem', newItemData);
    formData.append('id', item.data.item._id);
    const data = await axios.post('/api/admin/upload-img', formData);
    setItems([data.data.item, ...items]);
    setIsCreating(false);
    clearItemsInput();
  };

  const deleteBrand = (e) => {
    console.log('deleting');
    axios
      .post('/api/admin/deleteBrand', { id: e.target.value })
      .then((response) => {
        setBrands([...brands.filter((item) => item._id !== e.target.value)]);
        console.log(brands);
      });
  };
  const deleteModel = (e) => {
    console.log('deleting');
    axios
      .post('/api/admin/deleteModel', { id: e.target.value })
      .then((response) => {
        setModels([...models.filter((item) => item._id !== e.target.value)]);
        console.log(models);
      });
  };
  const itemDelete = (e) => {
    console.log('deleting');
    const id = e.currentTarget.value;
    axios.post('/api/admin/deleteItem', { id: id }).then((response) => {
      setItems([...items.filter((item) => item._id !== id)]);
      setModalToggle(false);
    });
  };

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

  const changeControlPanelToggle = (e) => {
    setIsLoadingBtn(true);
    console.log(e.target.value);
    setControlPanelToggle(e.target.value);
    setIsLoadingBtn(false);
  };
  const itemModalShow = (e) => {
    let id = e.currentTarget.id;
    let filtered = items.filter((item) => item._id === id);
    filtered.map((item) => {
      setCurrentItem({
        id: item._id,
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
  };

  const onFileChange = (e) => {
    return setItemFiles({ img: e.target.files });
  };

  const getItems = async (e) => {
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
              brands={brands}
              models={models}
              years={years}
              items={items}
              toggle={controlPanelToggle}
              brandData={newBrandData}
              modelName={modelName}
              modelYearFrom={modelYearFrom}
              modelYearTo={modelYearTo}
              itemName={itemName}
              itemDescription={itemDescription}
              itemPrice={itemPrice}
              itemArticle={itemArticle}
              currentBrandName={currentBrand.name}
              createBrandInput={createBrandInput}
              createModelInput={createModelInput}
              modelYearFromInput={modelYearFromInput}
              modelYearToInput={modelYearToInput}
              createItemNameInput={createItemNameInput}
              createItemDescriptionInput={createItemDescriptionInput}
              createItemPriceInput={createItemPriceInput}
              createItemArticleInput={createItemArticleInput}
              createBrand={createBrand}
              deleteBrand={deleteBrand}
              createModel={createModel}
              deleteModel={deleteModel}
              createItem={createItem}
              itemDelete={itemDelete}
              brandsOnChange={brandsOnChange}
              modelsOnChange={modelsOnChange}
              yearsOnChange={yearsOnChange}
              onFileChange={onFileChange}
              itemsCount={itemsCount}
              getItems={getItems}
              currentPage={currentPage}
              currentModel={currentModel}
              currentYear={currentYear}
              itemModalShow={itemModalShow}
              modalToggle={modalToggle}
              itemModalClose={itemModalClose}
              currentItem={currentItem}
              isLoading={isLoading}
              isCreating={isCreating}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
