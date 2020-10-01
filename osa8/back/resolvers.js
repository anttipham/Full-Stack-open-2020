const { PubSub, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: (root) =>
      Book.find({ author: root.id }).countDocuments()
  },
  Book: {
    author: (root) =>
      Author.findById(root.author)
  },
  Query: {
    bookCount: () =>
      Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: (root, args) => {
      let query = Book.find()
      // Kirjailija filtteri
      // let query = Author.find({ })
      // filterBooks = filter(filterBooks, args, 'author')
      if (args.genre) {
        query = query.find({ genres: args.genre })
      }
      return query
    },
    allAuthors: () => Author.find(),
    me: (root, args, context) => context.user
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('not authenticated')
      }
      // Luodaan kirjailija, jos ei ole olemassa
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          author = await newAuthor.save()
        } catch (error) {
          if (error.name === 'ValidationError') {
            throw new UserInputError(
              'Author\'s name must be at least 4 characters long',
              { invalidArgs: { author: args.author } }
            )
          }
        }
      }
      // Luodaan kirja
      args.author = author._id
      const book = new Book({ ...args })
      try {
        await book.save()
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new UserInputError(
            'The title of the book must be at least 2 characters long',
            { invalidArgs: { title: args.title } }
          )
        } else if (error.name === 'MongoError') {
          throw new UserInputError(
            'The book title is already in the database',
            { invalidArgs: { title: args.title } }
          )
        }
        console.error(error.name, error.message)
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('not authenticated')
      }

      // const editAuthor = authors.find(author => author.name === args.name)
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      // try {
      // } catch (error) {
      //   throw new UserInputError(error.message, {
      //     invalidArgs: args
      //   })
      // }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try {
        await user.save()
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new UserInputError(
            'Username must be at least 3 characters long',
            { invalidArgs: { username: args.username } }
          )
        } else if (error.name === 'MongoError') {
          throw new UserInputError(
            'Username already exists',
            { invalidArgs: { username: args.username } }
          )
        }
        console.error(error.name, error.message)
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'fff') {
        throw new UserInputError('wrong credentials')
      }

      const tokenObject = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(tokenObject, process.env.JWT_KEY)
      // const tokenObjectVerify = jwt.verify(token, process.env.JWT_KEY)
      // console.log(tokenObjectVerify)

      return { value: token }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers