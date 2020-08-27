const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const checkToken = (request) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  // Varmuuden vuoksi tarkistetaan
  if (!decodedToken.id) {
    throw new jwt.JsonWebTokenError('invalid token')
  }

  return decodedToken
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // Tarkistetaan token
  const token = checkToken(request)

  const user = await User.findById(token.id)
  const blog = new Blog({ ...body, user: user._id })
  const result = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = checkToken(request)

  const blog = await Blog.findById(request.params.id)

  // Tarkistetaan, onko blogin lähettäjä oikea
  if (token.id.toString() !== blog.user._id.toString()) {
    return response.sendStatus(401)
  }

  // Onnistuessa poista blogin tiedot käyttäjästä
  const user = await User.findById(token.id)
  user.blogs = user.blogs.filter((userBlogId) => userBlogId.toString() !== blog._id.toString())

  blog.deleteOne()
  user.save()
  response.sendStatus(204)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.sendStatus(204)
})

module.exports = blogsRouter
