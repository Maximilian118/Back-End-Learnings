const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderNum: Number,
  user: String,
  loggedIn: Boolean,
  productsInBasket: Number,
  basketTotal: Number,
  paid: Boolean
});

module.exports = mongoose.model('Order', orderSchema)