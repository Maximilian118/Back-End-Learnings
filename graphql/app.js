const express = require('express')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const envVariables = require('../envVariables')

const Schemas = require('./graphql/schema/index')
const Resolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()

app.use(express.json())

app.use(isAuth)

app.use('/graphql', graphqlHttp({
  schema: Schemas,
  rootValue: Resolvers,
  graphiql: true
}))

mongoose.connect(`mongodb+srv://${envVariables.MONGO_USER}:${envVariables.MONGO_PASS}@cluster0-vxyav.mongodb.net/${envVariables.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`[app.js] Server Started on port ${PORT}...`))
  })
  .catch(err => { console.log(err) })