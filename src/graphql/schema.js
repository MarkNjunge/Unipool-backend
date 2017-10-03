const {
  makeExecutableSchema
} = require('graphql-tools')
const {
  mergeTypes
} = require('merge-graphql-schemas')

const resolvers = require('./resolver').resolver
const UserTypeDefs = require('./types/user/schema').typeDefs
const VehicleTypeDefs = require('./types/vehicle/schema').typeDefs

const baseTypeDefs = `
schema {
  query: Query
  mutation: Mutation
}
`

const schema = makeExecutableSchema({
  typeDefs: mergeTypes([baseTypeDefs, UserTypeDefs, VehicleTypeDefs]),
  resolvers
})

module.exports = {
  schema
}