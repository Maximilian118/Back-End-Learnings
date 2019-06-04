const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'A GET request'
  });
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.productId,
    quantity: req.quantity,
  };
  res.status(201).json({
    message: 'A POST request',
    createdOrder: order,
  });
});

router.get('/:somevar', (req, res, next) => {
  const id = req.params.somevar;
  if (id === 'specific') {
    res.status(200).json({
      message: 'An ID GET request for a specific order',
      orderId: req.params.somevar
    });
  } else {
    res.status(200).json({
      message: 'An ID GET request',
      orderId: req.params.somevar
    });
  }
});

router.patch('/:somevar', (req, res, next) => {
  const id = req.params.somevar;
  if (id === 'specific') {
    res.status(200).json({
      message: 'You PATCHED a specific order',
      orderId: req.params.somevar
    });
  } else {
    res.status(200).json({
      message: 'You PATCHED an order',
      orderId: req.params.somevar
    });
  }
});

router.delete('/:somevar', (req, res, next) => {
  const id = req.params.somevar;
  if (id === 'specific') {
    res.status(200).json({
      message: 'You DELETED a specific order',
      orderId: req.params.somevar
    });
  } else {
    res.status(200).json({
      message: 'You DELETED all orders you big dumb dumb!',
      orderId: req.params.somevar
    });
  }
});

module.exports = router;