const Event = require('../../models/event-schema')
const User = require('../../models/user-schema')
const { dateToString, returnWithCreator } = require('./shared/utility')

module.exports = {
  events: async () => { // Query
    try {
      const events = await Event.find()
      return events.map(event => {
        console.log(`[app.js] ${event._doc.title} Queried...`)
        return returnWithCreator(event)
      })
    } catch (err) { throw err }
  },
  createEvent: async (args, req) => { // Mutation
    if (!req.isAuth) {
      throw new Error('Not Authenticated!')
    }
    const event = new Event({ // From mongoose event-schema
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId
    })
    try {
      const res = await event.save()
      console.log(`[app.js] createEvent... \n ${res}`)
      const creator = await User.findById(req.userId)
      console.log(creator)
      if (!creator) {
        throw new Error('User not found')
      }
      creator.createdEvents.push(event)
      await creator.save()
      return returnWithCreator(res)
    } catch (err) { throw err }
  }
}