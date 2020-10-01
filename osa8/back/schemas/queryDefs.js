const { gql } = require('apollo-server')

const queryDefs = gql`
  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
`

module.exports = queryDefs