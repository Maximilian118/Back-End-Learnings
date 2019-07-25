const mongoose = require('mongoose')

const bookingsSchema = mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }) // gives us createdAt and updatedAt

module.exports = mongoose.model('Bookings', bookingsSchema)