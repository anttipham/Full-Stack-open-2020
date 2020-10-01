const mutationDefs = require('./mutationDefs')
const queryDefs = require('./queryDefs')
const typeDefs = require('./typeDefs')

const schemas = [typeDefs, queryDefs, mutationDefs]

module.exports = schemas