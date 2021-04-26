const { Router } = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { Models, Brands, Items, User } = require('../models');

const router = Router();

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

// brands
router.get('/brands-list', async (req, res) => {
  try {
    const brands = await Brands.find({}, function (err, brands) {
      const brandMap = [];

      brands.forEach(function (brand) {
        brandMap.push(brand);
      });
      return brandMap;
    });
    res.status(200).json({
      message: 'OK',
      brands,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/create-brand', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: 'Введите название бренда!',
      });
    }
    const brand = new Brands({ name });
    await brand.save();

    res.status(201).json({
      message: 'Бренд успешно создан!',
      brand,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/delete-brand', async (req, res) => {
  try {
    const { id } = req.body;

    const brand = await Brands.findById(id);

    if (!brand) {
      return res.status(404).json({
        message: 'Марка не найдена!',
      });
    }
    await Brands.deleteOne(brand);
    res.status(200).json({
      message: 'Марка успешно удалена!',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

//models
router.post('/create-model', async (req, res) => {
  try {
    const { name, brandId, yearFrom, yearTo } = req.body;

    const years = [];
    for (let i = Number(yearFrom); i <= Number(yearTo); i++) {
      years.push(i);
    }

    const model = new Models({ name, brand: brandId, years: years });

    await model.save((err) => {
      if (err) {
        return res.status(500).json({
          message: 'Ошибка сервера попробуйте снова!',
        });
      }
      res.status(201).json({
        message: 'Модель успешно создана!',
        model,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/delete-model', async (req, res) => {
  try {
    const { id } = req.body;

    const model = await Models.findById(id);

    if (!model) {
      res.status(404).json({
        message: 'Модель не найдена!',
      });
    }

    await Models.deleteOne(model);
    console.log(model + 'deleted');
    res.status(200).json({
      message: 'Модель успешно удалена!',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/models-list:id', async (req, res) => {
  try {
    const models = await Models.find(
      { brand: req.params.id },
      (err, models) => {
        const modelMap = [];

        models.forEach(function (model) {
          modelMap.push(model);
        });
        return modelMap;
      }
    );

    res.status(200).json({
      message: 'OK',
      models,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/model-years:id', async (req, res) => {
  try {
    const years = await Models.findById(req.params.id);
    const modelYears = [];
    years.years.forEach((year) => {
      modelYears.push(year);
    });

    res.status(200).json({
      message: 'OK',
      modelYears,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

// items
router.post('/create-item', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      article,
      year,
      modelName,
      brandName,
      modelId,
      brandId,
    } = req.body;

    const item = new Items({
      name,
      description,
      price,
      article,
      year,
      modelName,
      brandName,
      model: modelId,
      brand: brandId,
    });

    await item.save();
    res.status(201).json({
      message: 'Товар успешно создан!',
      item,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/upload-img', upload.array('img', 3), async (req, res) => {
  try {
    const { id } = req.body;
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    req.files.map((file) => {
      reqFiles.push(url + '/public/' + file.filename);
    });
    console.log(reqFiles);
    console.log(id);

    const item = await Items.findById(id);
    reqFiles.map((file) => {
      item.img.push(file);
    });
    item.save();
    res.status(201).json({
      message: 'Товар успешно создан!',
      item,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/items-list:id', async (req, res) => {
  try {
    const itemsCount = await Items.countDocuments(
      { brand: req.params.id },
      (err, count) => {
        if (err) {
          console.log(err);
        } else {
          return count;
        }
      }
    );
    const items = await Items.find(
      { brand: req.params.id },
      function (err, items) {
        const itemsMap = [];
        items.forEach(function (item) {
          itemsMap.push(item);
        });
        return itemsMap;
      }
    ).limit(9);
    res.status(200).json({
      message: 'OK',
      items,
      itemsCount,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/get-item', async (req, res) => {
  const { article } = req.query;
  const items = [];
  const item = await Items.findOne({ article });
  console.log(item);
  if (item === null) {
    return res.status(500).json({
      status: false,
      message: 'Товар не найден!',
    });
  } else {
    items.push(item);
    return res.status(200).json({
      status: true,
      message: 'OK!',
      items,
    });
  }
});

router.get('/items-list', async (req, res) => {
  try {
    const { page, filter } = req.query;
    const limitCount = 9;
    const skipCount = page * limitCount - limitCount;

    if (filter === 'all') {
      const itemsCount = await Items.countDocuments({}, (err, count) => {
        if (err) {
          console.log(err);
        } else {
          return count;
        }
      });
      const items = await Items.find({}, function (err, items) {
        const itemsMap = [];
        items.forEach(function (item) {
          itemsMap.push(item);
        });
        return itemsMap;
      })
        .limit(9)
        .skip(skipCount);
      return res.status(200).json({
        message: 'OK',
        items,
        itemsCount,
      });
    }
    if (filter === 'brand') {
      const { brandId } = req.query;
      const itemsCount = await Items.countDocuments(
        { brand: brandId },
        (err, count) => {
          if (err) {
            console.log(err);
          } else {
            return count;
          }
        }
      );
      const items = await Items.find({ brand: brandId }, function (err, items) {
        const itemsMap = [];
        items.forEach(function (item) {
          itemsMap.push(item);
        });
        return itemsMap;
      })
        .limit(9)
        .skip(skipCount);
      return res.status(200).json({
        message: 'OK',
        items,
        itemsCount,
      });
    }
    if (filter === 'model') {
      const { modelId } = req.query;
      const itemsCount = await Items.countDocuments(
        { model: modelId },
        (err, count) => {
          if (err) {
            console.log(err);
          } else {
            return count;
          }
        }
      );
      const items = await Items.find({ model: modelId }, function (err, items) {
        const itemsMap = [];
        items.forEach(function (item) {
          itemsMap.push(item);
        });
        return itemsMap;
      })
        .limit(9)
        .skip(skipCount);
      return res.status(200).json({
        message: 'OK',
        items,
        itemsCount,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/delete-item', async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const item = await Items.findById(id);

    if (!item) {
      return res.status(404).json({
        message: 'Товар не найден!',
      });
    }

    await Items.deleteOne(item);
    console.log(item + 'deleted');
    res.status(200).json({
      message: 'Товар успешно удален!',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'User not found!',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Something went wrong, try again!',
      });
    }
    const token = jwt.sign(
      { username: user.username, userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'OK!' });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

module.exports = router;
