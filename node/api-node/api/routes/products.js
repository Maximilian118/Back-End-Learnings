const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// POST a product
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Handled POST request to /products',
      createdProduct: result,
    });
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({error: err.message});
  });
});

// GET all products
router.get('/', (req, res, next) => {
  Product.find() 
  .exec()
  .then(docs => {
    console.log(docs);
    if (docs) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({message: 'No objects found yo'});
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
  .exec()
  .then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json({doc});
    } else {
      res.status(404).json({message: 'No entry for ID'})
    }
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({error: err.message})
  });
});

// PATCH / update a product
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id} , {$set: updateOps})
  .exec()
  .then(result => {
    console.log(`${id} has been updated`);
    res.status(200).json(result);
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
    console.log(`All objects were deleted`);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  });
});

// DELETE a product
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({_id: id})
  .exec()
  .then(result => {
    console.log(`${id} was deleted`);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

module.exports = router;