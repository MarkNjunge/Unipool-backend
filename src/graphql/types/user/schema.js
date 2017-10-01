const _ = require('lodash')

const types = `
# A user of the system. Either a driver or a rider.
type User{
  # Id of the user. From Firebase authentication.
  id: String
  
  # Whether the user account has been validated.
  isValidated: Boolean

  # Student number of the user.
  studentNumber: Int

  # Email of the user.
  email: String

  # Full name of the user.
  fullname: String

  # Phone number of the user.
  phone: Int

  # Whether the user is a driver or a rider.
  userType: UserType

  # Vehicles added by the user.
  vehicles: [Vehicle]
}

# A vehicle owned by a user
type Vehicle{
  # The number plate of the car.
  registrationNumber: String

  # Make of the car. e.g. Toyota Prado.
  make: String

  # # Color of the car. In plain text e.g. Red.
  color: String

  # Seating capacity available for passengers.
  capacity: Int
}

# Driver or rider in
enum UserType{
  DRIVER,
  RIDER
}
`

const query = `
type Query {
  # Get a user by their id
  getUser(userId: String): User

  # Get a vehicle by it's registration number
  getVehicle(registrationNumber: String): Vehicle
}
`

const mutation = `
type Mutation {
  # Add a new user to the system
  addUser(id: String!, 
    isValidated: Boolean!, # Will default to false if blank
    studentNumber: Int!, 
    email: String!, 
    fullname: String!, 
    userType: UserType!,
    phone :Int!,
  ): String

  # Change a user's details
  updateUser(id: String!, 
    isValidated: Boolean,
    studentNumber: Int, 
    email: String, 
    fullname:String,
    userType: UserType
    phone:Int
  ): String
  
  addVehicle(userId: String!, registrationNumber: String!, make: String!, color: String!, capacity: Int!): String

  updateVehicle(userId: String!, registrationNumber: String!, make: String, color: String, capacity: Int): String

  deleteVehicle(userId: String!, registrationNumber: String!): String
}
`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}