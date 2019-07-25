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

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
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
  rootValue: { // Resolvers
    events: () => { // Query
      return Event.find()
        .then(events => {
          return events.map(event => {
            console.log(`[app.js] ${event._doc.title} Queried...`)
            return { ...event._doc }
          })
        })
        .catch(err => { throw err })
    },
    createEvent: args => { // Mutation
      const event = new Event({ // From mongoose event-schema
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5d34cf7e6e3066517de7204a'
      })
      let createdEvent
      return event.save()
        .then(res => {
          console.log(`[app.js] ${res.title} mutated... \n ${res}`)
          createdEvent = { ...res._doc }
          return User.findById('5d34cf7e6e3066517de7204a')
        })
        .then(user => {
          if (!user) {
            throw new Error('User not found')
          }
          user.createEvents.push(event)
          return user.save()
        })
        .then(res => {
          return createdEvent
        })
        .catch(err => { throw err })
      return event
    },
    createUser: args => { // Mutation
      return User.findOne({ email: args.userInput.email })
        .then(user => {
          if (user) {
            throw new Error('User already exists')
          }
          return bcrypt.hash(args.userInput.password, 12)
        }).then(hashedPass => {
          const user = new User({
            email: args.userInput.email,
            password: hashedPass,
          })
          return user.save()
            .then(res => {
              console.log(`[app.js] ${res.title} mutated... \n ${res}`)
              return { ...res._doc, password: null }
            })
            .catch(err => { throw err })
        })
        .catch(err => { throw err })
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