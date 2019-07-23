const express = require('express')
const mongoose = require('mongoose')

// Exports a middleware function that takes incoming requests and funnels them through a Graphql query parser
// and automatically forward them to the right Resolvers.
const graphqlHttp = require('express-graphql')

// Allows us to add a schema.
const { buildSchema } = require('graphql')

// Initialize express with app.js.
const app = express()

// Parses all the data received in the body of requests from strings to objects.
app.use(express.json())

const events = []

// Graphql endpoint. 2nd arg = our middleware function.
app.use('/graphql', graphqlHttp({
  // Our schema definition.
  // Query = Get Data.
  // Mutate = Change Data.

  // [] = return a list. String = return a string. ! = Cannot return Null.
  // events: [String!]! === return a list of strings. The strings cannot be null and the list cannot be null.

  // createEvent(name: String): String === Method that expects a value, the type of the value and returns a string.

  // schema { 
  //   query: rootQuery // Bundle all of the Queries in type rootQuery
  //   mutation: rootMutation // Bundle all of the Mutations in type rootMutation
  // }
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
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
    }

    schema { 
      query: rootQuery
      mutation: rootMutation
    }
  `),

  // An obj that has all of the Resolver functions in it.
  // Resolver functions need to match out Schema endpoints by name.
  rootValue: {
    events: () => {
      return events
    },
    createEvent: args => {
      const event = {
        _id: Math.random().toString(),
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: args.eventInput.date,
      }
      events.push(event)
      return event
    }
  },

  graphiql: true // Gives us a special URL we can visit where we get a UI where we can test the API
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-vxyav.mongodb.net/test?retryWrites=true&w=majority`)
  .then(() => {
    // Constant PORT contains data entered by user in CLI (process.env.PORT)
    // OR if no port data is entered PORT contains 3000.
    const PORT = process.env.PORT || 3000

    // When app.js is executed app.js will 'listen' and render data from port 3000.
    // AKA (start the server on port 3000).
    app.listen(PORT, () => console.log(`[App.js] Server Started on port ${PORT}...`))
  })
  .catch(err => {
    console.log(err)
  })

// // If page loads on url path of '/' then return res.send('Hello World!').
// app.get('/', (req, res, next) => {
//   res.send('Hello World!')
// })