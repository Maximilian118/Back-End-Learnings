const express = require('express')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const envVariables = require('../../envVariables')
const bcrypt = require('bcryptjs')

const Event = require('../models/event-schema')
const User = require('../models/user-schema')

const app = express()

app.use(express.json())

// const user = userId => {
//   return User.findById(userId)
//   .then(user => {
//     return {...user._doc}
//   })
//   .catch(err => {throw: err})
// }

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input UserInput {
      email: String!
      password: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type rootQuery {
      events: [Event!]!
      users: [User!]!
    }

    type rootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema { 
      query: rootQuery
      mutation: rootMutation
    }
  `),
  // Resolvers. This is where we put the logic for out schemas specified in root types.
  rootValue: {
    events: () => { // Query
      // Populate is a method provided by mongoose that will populate a specified field.
      // Populate knows where to get find the data with the ref key used in the schema.
      return Event.find().populate('creator')
        .then(events => {
          return events.map(event => {
            console.log(`[app.js] ${event._doc.title} Queried...`)
            return { ...event._doc }
          })
        })
        .catch(err => { throw err })
    },
    createEvent: args => { // Mutation
      const event = new Event({ // Instantiate schema from Mongoose event-schema.js.
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5d35bc309b5816571eaf0099'
      })
      let createdEvent
      return event.save() // Upload event with specified data via args to Database.
        .then(res => {
          console.log(`[app.js] ${res.title} mutated... \n ${res}`)
          createdEvent = { ...res._doc } // createdEvent = event data.
          return User.findById('5d35bc309b5816571eaf0099') // return user data with this _id.
        })
        .then(user => { // With the now returned user data, 
          if (!user) { // if there isn't a user of that _id,
            throw new Error('User not found') // stop function execution and return an error.
          }
          user.createdEvents.push(event) // Push the event to the createdEvents Arr of that user.
          return user.save() // Mutate that user with new data.
        })
        .then(res => {
          return createdEvent // Return the variable with event data information.
        })
        .catch(err => { throw err })
      return event
    },
    createUser: args => { // Mutation
      return User.findOne({ email: args.userInput.email }) // Look for a user with the entered email in the Database.
        .then(user => {
          if (user) { // If there already is a user of that email in the Database,
            throw new Error('User already exists') // Throw an error.
          }
          return bcrypt.hash(args.userInput.password, 12) // If there isn't, return a hashed version of user input.
        }).then(hashedPass => {
          const user = new User({ // Instantiate schema from Mongoose user-schema.js.
            email: args.userInput.email,
            password: hashedPass, // Pass hashed password as password for the new User.
          })
          return user.save() // Save the user to the Database.
            .then(res => {
              console.log(`[app.js] ${res.title} mutated... \n ${res}`)
              return { ...res._doc, password: null } // Spread the object with User data and represent password as null.
            })
            .catch(err => { throw err }) // If user.save fails throw an error.
        })
        .catch(err => { throw err }) // If then.hashedPass fails throw an error.
    }
  },

  graphiql: true
}))

mongoose.connect(`mongodb+srv://${envVariables.MONGO_USER}:${envVariables.MONGO_PASS}@cluster0-vxyav.mongodb.net/${envVariables.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`[app.js] Server Started on port ${PORT}...`))
  })
  .catch(err => { console.log(err) })