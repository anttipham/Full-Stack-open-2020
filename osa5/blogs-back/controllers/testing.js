const router = require('express').Router()
const Note = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})
  response.sendStatus(204)
})

module.exports = router
