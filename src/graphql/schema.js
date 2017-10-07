const {
  makeExecutableSchema
} = require('graphql-tools')
const {
  mergeTypes
} = require('merge-graphql-schemas')

const resolvers = require('./resolver').resolver
const UserTypeDefs = require('./types/user/schema').typeDefs
const VehicleTypeDefs = require('./types/vehicle/schema').typeDefs
const RideTypeDefs = require('./types/ride/schema').typeDefs
const GeolocationTypeDefs = require('./types/geolocation/schema').typeDefs

const baseTypeDefs = `
schema {
  query: Query
  mutation: Mutation
}
`

const schema = makeExecutableSchema({
  typeDefs: mergeTypes([baseTypeDefs, UserTypeDefs, VehicleTypeDefs, RideTypeDefs, GeolocationTypeDefs]),
  resolvers
})

module.exports = {
  schema
}