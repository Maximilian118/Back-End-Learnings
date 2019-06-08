const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order-schema');
const checkAuth = require('../auth/check-auth');

// POST order
router.post('/', checkAuth, (req, res, next) => {
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
      orderCreated: {
        _id: result._id,
        orderNum: result.orderNum,
        user: result.user,
        loggedIn: result.loggedIn,
        productsInBasket: result.productsInBasket,
        basketTotal: result.basketTotal,
        paid: result.paid,
        request: {
          type: 'GET PATCH DELETE',
          url: `http://localhost:4000/products/${result._id}`
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

// GET all orders
router.get('/', checkAuth, (req, res, next) => {
  Order.find()
  .select('_id orderNum user loggedIn productsInBasket basketTotal paid')
  .exec()
  .then(result => {
    if (result) {
      const response = {
        count: result.length,
        orders: result.map(obj => {
          return {
            _id: obj._id,
            orderNum: obj.orderNum,
            user: obj.user,
            loggedIn: obj.loggedIn,
            productsInBasket: obj.productsInBasket,
            basketTotal: obj.basketTotal,
            paid: obj.paid,
            request: {
              type: 'GET PATCH DELETE',
              url: `http://localhost:4000/orders/${obj._id}`
            }
          }
        })
      };
      console.log(response);
      res.status(200).json({response});
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
router.get('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
  .select('_id orderNum user loggedIn productsInBasket backsetTotal paid')
  .exec()
  .then(result => {
    if (result) {
      console.log('Order:');
      console.log(result);
      res.status(200).json({
        order: result,
        request: {
          type: 'GET PATCH DELETE',
          url: `http://localhost:4000/orders/${result._id}`
        }
      });
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
router.patch('/:orderId', checkAuth, (req, res, next) => {
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
      res.status(200).json({
        message: `${id} has been updated to ${JSON.stringify(updateOps)}`,
        request: {
          type: 'GET DELETE',
          url: `http://localhost:4000/orders/${id}`
        }
      });
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
router.delete('/all', checkAuth, (req, res, next) => {
  Order.deleteMany()
  .exec()
  .then(result => {
    if (result) {
      console.log('All orders deleted');
      res.status(200).json({
        message: 'All orders deleted',
        request: {
          type: 'POST',
          url: `http://localhost:4000/orders`,
          body: {
            orderNum: 'Number',
            user: 'String',
            loggedIn: 'Boolean',
            productsInBasket: 'Number',
            basketTotal: 'Number',
            paid: 'Boolean'
          }
        }
      });
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
router.delete('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({_id: id})
  .exec()
  .then(result => {
    if (result) {
      console.log(`Order ${id} was deleted`);
      res.status(200).json({
        message: `Order ${id} was deleted`,
        request: {
          type: 'POST',
          url: `http://localhost:4000/orders`,
          body: {
            orderNum: 'Number',
            user: 'String',
            loggedIn: 'Boolean',
            productsInBasket: 'Number',
            basketTotal: 'Number',
            paid: 'Boolean'
          }
        }
      });
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