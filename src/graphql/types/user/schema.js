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

  # M or F
  gender: Gender

  # Default location of the user.
  location: Geolocation

  # Whether the user is a driver or a rider.
  role: Role

  # Vehicles added by the user.
  vehicles: [Vehicle]
}

# Driver or rider
enum Role{
  DRIVER,
  RIDER
}

# Gender of the user
enum Gender{
  M,
  F
}
`

const query = `
type Query {
  # Get a user by their id
  getUser(userId: String!): User

  # Get a vehicle by it's registration number
  getVehicle(registrationNumber: String!): Vehicle
}
`

const mutation = `
type Mutation {
  # Add a new user to the system
  addUser(
    id: String!, 
    isValidated: Boolean!, # Will default to false if blank
    studentNumber: Int!, 
    email: String!, 
    fullname: String!, 
    gender: Gender,
    phone :Int!,
    defaultLat: Float!,
    defaultLong: Float!,
    role: Role!,
  ): String

  # Change a user's details
  updateUser(
    id: String!, 
    isValidated: Boolean,
    studentNumber: Int, 
    email: String, 
    fullname:String,
    gender: Gender,
    phone:Int,
    defaultLat: Float,
    defaultLong: Float,
    role: Role
  ): String
}
`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}