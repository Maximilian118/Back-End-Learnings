const Event = require('../../../models/event-schema')
const User = require('../../../models/user-schema')

const dateToString = date => new Date(date).toISOString()

const events = async eventIds => { // Fetch an event by _id
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
      return returnWithCreator(event)
    })
  } catch (err) { throw err }
}

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId)
    return returnWithCreator(event)
  } catch (err) { throw err }
}

const user = async userId => { // Fetch a user by _id
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    }
  } catch (err) { throw err }
}

const returnWithCreator = event => {
  return {
    ...event._doc,
    creator: user.bind(this, event._doc.creator)
  }
}

const returnWithAts = booking => {
  return {
    ...booking._doc,
    event: singleEvent.bind(this, booking._doc.event),
    user: user.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

exports.dateToString = dateToString
exports.returnWithCreator = returnWithCreator
exports.returnWithAts = returnWithAts
