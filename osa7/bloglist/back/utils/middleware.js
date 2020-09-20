const logger = require('./logger')

// Token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

// Virheenkäsittelijä
const errorHandler = (error, request, response, next) => {
  logger.error(error.name, '\t', error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    // Poistaa virheviestin alkukohdan, jossa ei lue mitään oleellista
    const firstColon = error.message.indexOf(':')
    const secondColon = error.message.indexOf(':', firstColon + 1)
    return response.status(400).json({ error: error.message.substring(secondColon + 2) })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or malformed' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  errorHandler
}