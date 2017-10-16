const _ = require('lodash')

const types = `
# A point on the map
  type GeoLocation {
  # Latitude
   latitude: Float!

  # Longitude
   longitude: Float!
}

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
  startLocation: GeoLocation

  # The location the ride was to.
  endLocation: GeoLocation

  # The time the ride started.
  departureTime: Int

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

   # Get all the rides a user has been on
  getRidesByUser(userId: String!): Ride 
    
  # Get all rides based on parameters.
  getAllRides(driverId: String, passengerId: String, vehicleRegNo: String, region: String, completed: Boolean): [Ride]
}
`

const mutation = `
input GeoLoc {
    latitude: Float!
    longitude: Float!
}

type Mutation{
  # Add a new ride.
  addRide(
    driverId: String!, 
    passengers: [String]!, 
    vehicleRegNo: String!, 
    startLocation: GeoLoc!,
    endLocation: GeoLoc!
  ): String

  # Mark an ongoing ride as completed.
  markRideAsCompleted(
    _id: String!
  ): Boolean
}
`

module.exports = _.join([types, query, mutation])