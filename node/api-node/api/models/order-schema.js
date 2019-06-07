const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderNum: { type: Number, required: true },
  user: { type: String, required: true },
  loggedIn: { type: Boolean, required: true },
  productsInBasket: { type: Number, required: true },
  basketTotal: { type: Number, required: true },
  paid: { type: Boolean, required: true }
});

module.exports = mongoose.model('Order', orderSchema)