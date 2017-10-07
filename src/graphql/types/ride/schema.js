const _ = require('lodash')

const types = `
# A carpool ride
type Ride {
  # id of the ride.
  _id: String

  # The driver of the ride.
  driver: User

  # Passengers during the ride.
  passengers: [User]

  # The vehicle used during the ride.
  vehicle: Vehicle

  # The location the ride was from.
  startLocation: Geolocation

  # The location the ride was to.
  endLocation: Geolocation

  # The time the ride started.
  depatureTime: Int

  # The time the ride ended.
  arrivalTime: Int

  # The number of passengers in the ride.
  passengerCount: Int

  # Whether or not the ride has been completed.
  completed: Boolean
}
`

const query = `
type Query{
  # Get a ride by its id
  getRide(rideId: String!): Ride

  # Get all rides based on parameters.
  getAllRides(driverId: String, passengerId: String, vehicleRegNo: String, region: String, completed: Boolean): [Ride]
}
`

const mutation = `
type Mutation{
  # Add a new ride.
  addRide(
    driverId: String!, 
    passengers: [String]!, 
    vehicleRegNo: String!, 
    startLat: Int!,
    startLong: Int!,
    endLat: Int!,
    endLong: Int!
  ): String

  # Mark an ongoing ride as completed.
  markRideAsCompleted(
    arrivalTime: Int!
  ): String
}
`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}