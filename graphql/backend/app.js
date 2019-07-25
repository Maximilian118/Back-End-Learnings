const express = require('express')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const envVariables = require('../../envVariables')

const Schemas = require('./graphql/schema/index')
const Resolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use('/graphql', graphqlHttp({
  schema: Schemas,
  rootValue: Resolvers,
  graphiql: true
}))

mongoose.connect(`mongodb+srv://${envVariables.MONGO_USER}:${envVariables.MONGO_PASS}@cluster0-vxyav.mongodb.net/${envVariables.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`[app.js] Server Started on port ${PORT}...`))
  })
  .catch(err => { console.log(err) })