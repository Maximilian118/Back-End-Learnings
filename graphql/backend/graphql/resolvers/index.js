const eventsResolvers = require('./events-resolvers')
const bookingsResolvers = require('./bookings-resolvers')
const authResolvers = require('./auth-resolvers')

const rootResolver = {
  ...eventsResolvers,
  ...bookingsResolvers,
  ...authResolvers
}

module.exports = rootResolver