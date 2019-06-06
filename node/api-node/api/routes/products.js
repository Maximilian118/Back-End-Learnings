const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product-schema');

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
  .then(result => {
    if (result) {
      console.log('Current products:');
      console.log(result);
      res.status(200).json({result});
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
  .exec()
  .then(result => {
    if (result) {
      console.log('Products:');
      console.log(result);
      res.status(200).json({result});
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
    res.status(200).json({message: `${id} has been updated to ${JSON.stringify(updateOps)}`});
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
    console.log(`All objects deleted`);
    res.status(200).json({message: `All objects deleted`});
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
    res.status(200).json({message: `Product ${id} was deleted`});
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