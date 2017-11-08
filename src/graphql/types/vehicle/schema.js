const _ = require('lodash')

const types = `
# A vehicle owned by a user
type Vehicle{
  # The number plate of the car.
  registrationNumber: String

  # Make of the car. e.g. Toyota Prado.
  make: String

  # Color of the car. In plain text e.g. Red.
  color: String

  # Seating capacity available for passengers.
  capacity: Int

  # Owner of the vehicle
  owner: User
}
`

const query = `
type Query {
  # Get a vehicle by it's registration number.
  getVehicle(registrationNumber: String!): Vehicle
  
  # Get all vehicles
  getAllVehicles: [Vehicle]
  
  owner(userId: String!): User
}
`

const mutation = `
type Mutation {
  addVehicle(userId: String!, registrationNumber: String!, make: String!, color: String!, capacity: Int!): String

  updateVehicle(registrationNumber: String!, make: String, color: String, capacity: Int): String

  deleteVehicle(registrationNumber: String!): String
}
`

module.exports = _.join([types, query, mutation])
