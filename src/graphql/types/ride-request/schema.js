const _ = require('lodash')

const types = `
# A request made by a user for a ride
type RideRequest {
  # The user who requested the ride
  user: User!

  # The location the user would like to start from
  startLocation: GeoLocation!

  # The location the user would like to stop
  endLocation: GeoLocation!

  # The time the ride was requested
  requestTime: Float!
}
`

const query = `
type Query {
  # Find all requests based on the end location
  getAllRequests: [RideRequest]!

  # Find the current request made by a user
  getRequestsByUser(userId: String!): RideRequest
}
`

const mutation = `
type Mutation {
  # Add a pickup request
  addRequest(userId: String!, startLocation: GeoLocationInput!, endLocation: GeoLocationInput!): String!

  # Remove a request
  removeRequest(userId: String!): String!
}
`

module.exports = _.join([types, query, mutation])
