const config = require('./utils/config')
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

// Tietokanta
logger.info('Connecting to MongoDB')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Successfully connected to MongoDB')
  })
  .catch(error => {
    logger.info('Error connecting to MongoDB:', error.message)
  })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// Sovellus
const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// test
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
