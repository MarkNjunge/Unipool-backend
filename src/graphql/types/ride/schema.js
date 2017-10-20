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

  # The time the ride started.
  departureTime: Int

  # The vehicle used during the ride.
  vehicle: Vehicle

  # The location the ride was from.
  startLatitude: Float!
  startLongitude: Float!
  
  # The location the ride was to.
  endLatitude: Float!
  endLongitude: Float!

  # Pickups done during the ride.
  pickUps: [Pickup]

  # The time the ride ended.
  arrivalTime: Int

  # Whether or not the ride has been completed.
  completed: Boolean
}

# Details for a passenger picked up during a ride.
type Pickup {
  # The user
  user: User

  # The time the user was picked up
  time: Int

  # The location
  latitude: Float!
  longitude: Float!
}
`

const query = `
type Query{
  # Get a ride by its id
  getRide(rideId: String!): Ride

   # Get all the rides a user has been on
  getRidesByUser(userId: String!): Ride 
    
   # Get all rides based on parameters.
  getAllRides(driverId: String,
       passengerId: String,
       vehicleRegNo: String, 
       region: String,
       completed: Boolean): [Ride]
   # Obtain the drivers details 
  driver(driverId: String!): User
  # Obtain the vehicles details
  vehicle(vehicleRegNo: String!): Vehicle
}
`

const mutation = `
type Mutation{
  # Add a new ride.
  startRide(
    driverId: String!,
    vehicleRegNo: String!, 
    startLatitude: Float!,
    startLongitude: Float!,
    departureTime: Int!
  ): String

  # Add a user to pick up
  addPickup(
    rideId: String!,
    userId: String!
    latitude: Float!,
    longitude: Float!,
    time: Int!
  ): String

  # Mark an ongoing ride as completed.
  markRideAsCompleted(
    _id: String!,
    latitude: Float!,
    longitude: Float!
  ): Boolean
}
`

module.exports = _.join([types, query, mutation])