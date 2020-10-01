const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const schemas = require('./schemas')
const resolvers = require('./resolvers')
const User = require('./models/user')
require('dotenv').config()

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.info('Successfully connected to MongoDB')
  })
  .catch(error => {
    console.info('Error connecting to MongoDB:', error.message)
  })

// const authors = []
// const books = []

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      var tokenObject = jwt.verify(auth.substring(7), process.env.JWT_KEY)
      // console.log(tokenObject)
      const user = await User.findOne({
        _id: tokenObject.id,
        username: tokenObject.username
      })
      // console.log(user)
      return { user }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})