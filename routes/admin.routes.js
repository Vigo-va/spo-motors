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
router.get('/brandsList', async (req, res) => {
  try {
    Brands.find({}, function (err, brands) {
      const brandMap = [];

      brands.forEach(function (brand) {
        brandMap.push(brand);
      });
      res.status(201).json({
        message: 'OK',
        brandMap,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/newBrand', async (req, res) => {
  try {
    const { name } = req.body;

    const brand = new Brands({ name });
    await brand.save();

    res.status(201).json({
      message: 'OK',
      brand,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/deleteBrand', async (req, res) => {
  try {
    const { id } = req.body;

    const brand = await Brands.findById(id);

    if (!brand) {
      res.status(404).json({
        message: 'Selects not found',
      });
    }

    await Brands.deleteOne(brand);
    console.log(brand + 'deleted');
    res.status(201).json({
      message: 'OK',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

//models
router.post('/newModel', async (req, res) => {
  try {
    const { name, brandId, yearFrom, yearTo } = req.body;

    const years = [];
    for (let i = yearFrom; i <= yearTo; i++) {
      years.push(i);
    }

    const model = new Models({ name, brand: brandId, years: years });

    await model.save((err) => {
      if (err) {
        res.send(err);
      }
      res.status(201).json({ message: 'OK', model });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/modelsList:id', async (req, res) => {
  try {
    Models.find({ brand: req.params.id }, function (err, models) {
      const modelMap = [];

      models.forEach(function (model) {
        modelMap.push(model);
      });

      res.status(201).json({
        message: 'OK',
        modelMap,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/modelYears:id', async (req, res) => {
  try {
    Models.findById(req.params.id, function (err, model) {
      const modelYears = [];
      model.years.forEach((year) => {
        modelYears.push(year);
      });
      res.status(201).json({
        message: 'OK',
        modelYears,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/deleteModel', async (req, res) => {
  try {
    const { id } = req.body;

    const model = await Models.findById(id);

    if (!model) {
      res.status(404).json({
        message: 'Model not found',
      });
    }

    await Models.deleteOne(model);
    console.log(model + 'deleted');
    res.status(201).json({
      message: 'OK',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

// items
router.post('/newItem', async (req, res) => {
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
      message: 'OK',
      item,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/upload-img', upload.array('img', 6), async (req, res) => {
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
      message: 'OK',
      item,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong, try again!',
    });
  }
});

router.get('/itemsList:id', async (req, res) => {
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
    res.status(201).json({
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
      res.status(201).json({
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
      res.status(201).json({
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
      res.status(201).json({
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

router.post('/deleteItem', async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const item = await Items.findById(id);

    if (!item) {
      res.status(404).json({
        message: 'Item not found',
      });
    }

    await Items.deleteOne(item);
    console.log(item + 'deleted');
    res.status(201).json({
      message: 'OK',
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
