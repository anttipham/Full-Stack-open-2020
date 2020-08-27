const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./user_testhelper')
const app = require('../app')

const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('user db', () => {
  describe('http-post', () => {
    test('works normally 1', async () => {
      const usersBefore = await User.countDocuments({})

      await api
        .post('/api/users')
        .send(helper.usersNormal[0])
        .expect(201)

      const usersAfter = await User.countDocuments({})
      expect(usersAfter).toBe(usersBefore + 1)
    })

    test('works normally 2', async () => {
      const usersBefore = await User.countDocuments({})

      await api
        .post('/api/users')
        .send(helper.usersNormal[1])
        .expect(201)

      const usersAfter = await User.countDocuments({})
      expect(usersAfter).toBe(usersBefore + 1)
    })

    test('works normally 3', async () => {
      const usersBefore = await User.countDocuments({})

      await api
        .post('/api/users')
        .send(helper.usersNormal[2])
        .expect(201)

      const usersAfter = await User.countDocuments({})
      expect(usersAfter).toBe(usersBefore + 1)
    })

    test('username can\'t be too short', async () => {
      await api
        .post('/api/users')
        .send(helper.userShortUsername)
        .expect(400)
    })

    test('password can\'t be too short', async () => {
      const response = await api
        .post('/api/users')
        .send(helper.userShortPassword)
        .expect(400)
      expect(response.body).toEqual({
        error: 'length of a password must be at least 3'
      })
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})