const _ = require('lodash')

const types = `
type ScheduledRide {
  # The id of the ride
  _id: String!

  # The user who has scheduled the ride
  user: User!

  # The start location of the ride
  startLocation: GeoLocation!

  # The end location of the ride
  endLocation: GeoLocation!

  # The time the ride is scheduled for
  time: Float!

  # The driver who will fulfil the ride. 
  # Is null if no driver is going to fulfil the request.
  driver: User
}
`

const query = `
type Query {
  getAllScheduledRides: [ScheduledRide]
  
  getScheduledRidesForUser(userId: String!): [ScheduledRide]
}
`

const mutation = `
type Mutation {
  addScheduledRide(userID: String!, startLocation: GeoLocationInput!, endLocation: GeoLocationInput!): String
  
  deleteScheduledRide(rideId: String!): String
  
  setScheduledRideDriver(rideId: String!, driverId: String!): String
}
`

module.exports = _.join([types, query, mutation])
