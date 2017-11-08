const {
    makeExecutableSchema,
    addMockFunctionsToSchema
} = require('graphql-tools')
const { mergeTypes } = require('merge-graphql-schemas')

const mocks = require('./mocks')

const resolvers = require('./resolver')
const UserTypeDefs = require('./types/user/schema')
const VehicleTypeDefs = require('./types/vehicle/schema')
const RideTypeDefs = require('./types/ride/schema')
const RideRequestTypeDefs = require('./types/ride-request/schema')
const ScheduledRideTypeDefs = require('./types/scheduled-ride/schema')

const baseTypeDefs = `
schema {
  query: Query
  mutation: Mutation
}
`

const schema = makeExecutableSchema({
    typeDefs: mergeTypes([
        baseTypeDefs,
        UserTypeDefs,
        VehicleTypeDefs,
        RideTypeDefs,
        RideRequestTypeDefs,
        ScheduledRideTypeDefs
    ]),
    resolvers
})

// addMockFunctionsToSchema({schema, mocks})

module.exports = schema
