const Event = require('../../models/event-schema')
const Bookings = require('../../models/bookings-schema')
const { returnWithAts, returnWithCreator } = require('./shared/utility')

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not Authenticated!')
    }
    try {
      const bookings = await Bookings.find()
      return bookings.map(booking => {
        return returnWithAts(booking)
      })
    } catch (err) { throw err }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not Authenticated!')
    }
    const event = await Event.findOne({ _id: args.eventId })
    const booking = new Bookings({
      event: event,
      user: req.userId
    })
    const res = await booking.save()
    return returnWithAts(res)
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not Authenticated!')
    }
    try {
      const booking = await Bookings.findById(args.bookingId).populate('event')
      if (!booking) {
        throw new Error('No Booking by that ID')
      }
      const event = returnWithCreator(booking.event)
      await Bookings.deleteOne({ _id: args.bookingId })
      return event
    } catch (err) { throw err }
  }
}