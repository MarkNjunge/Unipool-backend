const _ = require('lodash')

const types = `
type User{
  
}
`

const query = `
type Query {
  
}
`

const mutation = `
type Mutation {
  
}
`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}