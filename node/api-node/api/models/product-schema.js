const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  discount: Number,
  file: String
});

module.exports = mongoose.model('Product', productSchema)