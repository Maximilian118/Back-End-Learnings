const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order-schema');

// POST order
router.post('/', (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    orderNum: req.body.orderNum,
    user: req.body.user,
    loggedIn: req.body.loggedIn,
    productsInBasket: req.body.productsInBasket,
    basketTotal: req.body.basketTotal,
    paid: req.body.paid
  });
  order.save()
  .then(result => {
    console.log('Handled POST request to /orders:');
    console.log(result);
    res.status(201).json({
      message: 'Handled POST request to /orders',
      orderCreated: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

// GET all orders
router.get('/', (req, res, next) => {
  Order.find()
  .exec()
  .then(result => {
    if (result) {
      console.log('Current orders:');
      console.log(result);
      res.status(200).json({result});
    } else {
      console.log('No orders found yo');
      res.status(404).json({message: 'No orders found yo'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
})

// GET order by ID
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
  .exec()
  .then(result => {
    if (result) {
      console.log('Current orders:');
      console.log(result);
      res.status(200).json({result});
    } else {
      console.log('No order entry for that ID yo');
      res.status(404).json({message: 'No order entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

// PATCH an order
router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  };
  Order.updateOne({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
    if (result) {
      console.log(`${id} has been updated to ${JSON.stringify(updateOps)}`);
      res.status(200).json({message: `${id} has been updated to ${JSON.stringify(updateOps)}`});
    } else {
      console.log('No order entry for that ID yo');
      res.status(404).json({message: 'No order entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err});
  });
});

// DELETE all orders
router.delete('/all', (req, res, next) => {
  Order.deleteMany()
  .exec()
  .then(result => {
    if (result) {
      console.log(`All orders deleted`);
      res.status(200).json({message: `All orders deleted`});
    } else {
      console.log('No orders found yo');
      res.status(404).json({message: 'No orders found yo'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err});
  });
});

// DELETE order by ID
router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({_id: id})
  .exec()
  .then(result => {
    if (result) {
      console.log(`Order ${id} was deleted`);
      res.status(200).json({message: `Order ${id} was deleted`});
    } else {
      console.log('No order entry for that ID yo');
      res.status(404).json({message: 'No order entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err});
  });
});

module.exports = router;