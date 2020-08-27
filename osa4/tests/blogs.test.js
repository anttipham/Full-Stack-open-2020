const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_testhelper')
const userHelper = require('./user_testhelper')
const app = require('../app')

const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let token = 'bearer '
beforeAll(async () => {
  await User.deleteMany({})

  await api
    .post('/api/users')
    .send(userHelper.usersNormal[0])

  const response = await api
    .post('/api/login')
    .send(userHelper.usersNormal[0])
  token += response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('http-get', () => {
  test('mongo has the right amount of blogs and is json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog has id field', async () => {
    const response = await api.get('/api/blogs')

    response.body.map((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('http-post when db has user', () => {
  test('post works', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(helper.newBlog)
      .expect(201)
    expect(response.body.title).toBe(helper.newBlog.title)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogs.map((blog) => blog.title)
    expect(titles).toContain(helper.newBlog.title)
  })

  test('default value of likes is 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogWithMissingLikes)
      .set('Authorization', token)
    expect(response.body.likes).toBe(0)
  })

  test('status 400 when missing title', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithMissingTitle)
      .set('Authorization', token)
      .expect(400)
  })

  // HUOM: Tehtävänannossa lukee "title JA url",
  // mutta luulen, että tässä tarkoitetaan "title TAI url",
  // joten tein tehtävän tällä tavalla
  test('status 400 when missing url', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithMissingUrl)
      .set('Authorization', token)
      .expect(400)
  })

  test('unauthorized when no token given', async () => {
    await api
      .post('/api/blogs')
      .send(helper.anotherNewBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})