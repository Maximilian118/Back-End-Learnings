const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const productRouts = require('./api/routes/products');
const orderRouts = require('./api/routes/orders');
const cluster_PW = require('./max-cluster-key');

mongoose.connect(`mongodb+srv://Max:${cluster_PW}@express-api-vxyav.mongodb.net/test?retryWrites=true&w=majority`, { 
  useNewUrlParser: true // connect to mongoDB
});

app.use(morgan('dev')); // CLI Logger

app.use(express.urlencoded({extended: true}));  // body-parser
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
    return res.status(200).json({});
  };
  next();
});

app.use('/products', productRouts); // Routs
app.use('/orders', orderRouts);

app.use((req, res, next) => { // Error filters
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { 
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app; // Export to Server