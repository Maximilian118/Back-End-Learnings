const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const productRouts = require('./api/routes/products');
const orderRouts = require('./api/routes/orders');
const userRouts = require('./api/routes/users');

// connect to mongoDB
mongoose.connect("mongodb+srv://Max:" + process.env.Max_PW + "@express-api-vxyav.mongodb.net/test?retryWrites=true&w=majority", { 
  useNewUrlParser: true, useCreateIndex: true
});

app.use(morgan('dev')); // CLI Logger
app.use('/uploads', express.static('node/api-node/uploads')); // file paths
app.use(express.urlencoded({extended: true}));  // body-parser
app.use(express.json());

// CORS error management 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
    return res.status(200).json({});
  };
  next();
});

// Routs
app.use('/products', productRouts);
app.use('/orders', orderRouts);
app.use('/users', userRouts);

// Error filters
app.use((req, res, next) => {
  const err = new Error('Non existent URL');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { 
  res.status(err.status || 500);
  res.json({error: {message: err.message}});
  console.log(err.message);
});

// Export to Server
module.exports = app;