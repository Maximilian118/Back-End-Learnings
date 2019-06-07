const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, './node/api-node/uploads')},
  filename: (req, file, cb) => {cb(null, file.originalname)}
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
    console.log('File was not stored. Valid formats: JPG, PNG')
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

const Product = require('../models/product-schema');

// POST a product
router.post('/', upload.single('file'), (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    productName: req.body.productName,
    price: req.body.price,
    discount: req.body.discount,
    file: req.file.originalname
  });
  product.save()
  .then(result => {
    const obj = {
      message: 'Handled POST request to /products',
      product: { 
        _id: result._id,
        productName: result.productName, 
        price: result.price,
        discount: result.discount
      },
      file: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        filePath: req.file.path
      },
      request: {
        type: 'GET PATCH DELETE',
        url: `http://localhost:4000/products/${result._id}`
      }
    }
    console.log(obj);
    res.status(201).json(obj);
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({error: err.message});
  });
});

// GET all products
router.get('/', (req, res, next) => {
  Product.find()
  .select('_id productName price discount file')
  .exec()
  .then(result => {
    if (result) {
      const response = {
        count: result.length,
        products: result.map(obj => {
          return {
            product: {
              _id: obj._id,
              productName: obj.productName, 
              price: obj.price,
              discount: obj.discount
            },
            file: {
              fileName: obj.file
            },
            request: {
              type: 'GET PATCH DELETE',
              url: `http://localhost:4000/orders/${obj._id}`
            }
          }
        })
      };
      console.log(result);
      res.status(200).json({response});
    } else {
      console.log('No products found yo');
      res.status(404).json({message: 'No products found yo'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

// GET product by ID
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('_id productName price discount file')
  .exec()
  .then(result => {
    if (result) {
      console.log(result);
      res.status(200).json({
        product: result,
        request: {
          type: 'GET PATCH DELETE',
          url: `http://localhost:4000/products/${result._id}`
        }
      });
    } else {
      console.log('No product entry for that ID yo');
      res.status(404).json({message: 'No product entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  });
});

// PATCH / update a product
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({_id: id} , {$set: updateOps})
  .exec()
  .then(result => {
    if (result) {
    console.log(`${id} has been updated to ${JSON.stringify(updateOps)}`);
    res.status(200).json({
      message: `${id} has been updated to ${JSON.stringify(updateOps)}`,
      request: {
        type: 'GET DELETE',
        url: `http://localhost:4000/products/${id}`
      }
    });
    } else {
      console.log('No product entry for that ID yo');
      res.status(404).json({message: 'No product entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

// DELETE all products
router.delete('/all', (req, res, next) => {
  Product.deleteMany()
  .exec()
  .then(result => {
    if (result) {
    console.log('All products deleted');
    res.status(200).json({
      message: 'All products deleted',
      request: {
        type: 'POST',
        url: `http://localhost:4000/products`,
        body: {
          productName: 'String',
          price: 'Number',
          discount: 'Number'
        }
      }
    });
    } else {
      console.log('No products found yo');
      res.status(404).json({message: 'No products found yo'})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  });
});

// DELETE product bt ID
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({_id: id})
  .exec()
  .then(result => {
    if (result) {
    console.log(`Product ${id} was deleted`);
    res.status(200).json({
      message: `Product ${id} was deleted`,
      request: {
        type: 'POST',
        url: `http://localhost:4000/products`,
        body: {
          productName: 'String',
          price: 'Number',
          discount: 'Number'
        }
      }
    });
    } else {
      console.log('No product entry for that ID yo');
      res.status(404).json({message: 'No product entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

module.exports = router;