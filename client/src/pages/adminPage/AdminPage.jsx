import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ControlPanelToggle } from './ControlPanel/ControlPanelToggle';

const axios = require('axios').default;

export const AdminPage = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('brand');
  const [filteredItems, setFilteredItems] = useState([]);

  const [currentBrand, setCurrentBrand] = useState({});
  const [currentModel, setCurrentModel] = useState({});
  const [currentYear, setCurrentYear] = useState('');

  const [newBrandData, setNewBrandData] = useState({});
  // const [newModelData, setNewModelData] = useState({});

  const [modelName, setModelName] = useState('');
  const [modelYearFrom, setModelYearFrom] = useState(Number);
  const [modelYearTo, setModelYearTo] = useState(Number);

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

  const createBrandInput = (e) => {
    return setNewBrandData({ name: e.target.value });
  };

  const createModelInput = (e) => {
    return setModelName(e.target.value);
  };
  const modelYearFromInput = (e) => {
    return setModelYearFrom(Number(e.target.value));
  };
  const modelYearToInput = (e) => {
    return setModelYearTo(Number(e.target.value));
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

  const createBrand = () => {
    console.log(newBrandData);
    axios.post('/api/admin/newBrand', newBrandData).then((response) => {
      console.log(response);
      setBrands([...brands, response.data.brand]);
    });
  };
  const createModel = () => {
    const newModelData = {
      name: modelName,
      yearFrom: modelYearFrom,
      yearTo: modelYearTo,
      brandName: currentBrand.name,
      brandId: currentBrand.id,
    };

    axios.post('/api/admin/newModel', newModelData).then((response) => {
      console.log(response);
      setModels([...models, response.data.model]);
    });
  };
  const createItem = () => {
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
      modelId: currentModel.id,
      brandId: currentBrand.id,
    };
    axios.post('/api/admin/newItem', newItemData).then((response) => {
      console.log(response);
      formData.append('id', response.data.item._id);
      axios.post('/api/admin/upload-img', formData).then((response) => {
        console.log(response);
        setItems([...items, response.data.item]);
        setFilteredItems([...filteredItems, response.data.item]);
      });
    });
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
      setFilteredItems([...filteredItems.filter((item) => item._id !== id)]);
      console.log(items);
    });
  };

  const brandsOnChange = (e) => {
    setCurrentBrand({ name: e.value, id: e.id });
    setFilter('brand');
    axios.get(`/api/admin/itemsList${e.id}`).then((response) => {
      setItems(response.data.items);
      setFilteredItems(response.data.items);
      setItemsCount(response.data.itemsCount);
      console.log(response.data.item);
      console.log(response.data.itemsCount);
    });
    axios.get(`/api/admin/modelsList${e.id}`).then((response) => {
      setModels(response.data.modelMap);
      console.log(response.data.modelMap);
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
        console.log(response.data.items);
        setItems(response.data.items);
        setItemsCount(response.data.itemsCount);
        setFilteredItems(response.data.items);
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

  const changeControlPanelToggle = (e) => {
    console.log(e.target.value);
    return setControlPanelToggle(e.target.value);
  };

  const onFileChange = (e) => {
    return setItemFiles({ img: e.target.files });
  };

  const getItemsByBrand = (e) => {
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
          setFilteredItems(response.data.items);
        });
    } catch (e) {}
  };

  const getBrands = useCallback(() => {
    try {
      axios.get('/api/admin/brandsList').then((response) => {
        setBrands(response.data.brandMap);
      });
    } catch (e) {}
  }, []);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  return (
    <>
      <Container className={'App'}>
        <Row>
          <Col md={12} className={'controlPanel'}>
            <Button
              className={'controlPanelBtn'}
              value={'brands'}
              onClick={changeControlPanelToggle}
            >
              Редактировать марки
            </Button>
            <Button
              className={'controlPanelBtn'}
              value={'models'}
              onClick={changeControlPanelToggle}
            >
              Редактировать модели
            </Button>
            <Button
              className={'controlPanelBtn'}
              value={'items'}
              onClick={changeControlPanelToggle}
            >
              Редактировать товары
            </Button>
          </Col>
          <Col>
            <ControlPanelToggle
              brands={brands}
              models={models}
              years={years}
              items={items}
              filteredItems={filteredItems}
              toggle={controlPanelToggle}
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
              getItemsByBrand={getItemsByBrand}
              currentPage={currentPage}
              currentModel={currentModel}
              currentYear={currentYear}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
