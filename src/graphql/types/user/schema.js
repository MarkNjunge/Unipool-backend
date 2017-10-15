const _ = require('lodash')

const types = `
# A user of the system. Either a driver or a rider.
type User{
  # Id of the user. From Firebase authentication.
  id: String

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

  # Vehicles added by the user.
  vehicles: [Vehicle]
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
    studentNumber: Int!, 
    email: String!, 
    fullname: String!, 
    gender: Gender,
    phone :Int!
  ): String

  # Change a user's details
  updateUser(
    id: String!, 
    studentNumber: Int, 
    email: String, 
    fullname:String,
    gender: Gender,
    phone:Int
  ): String
}
`

module.exports = _.join([types, query, mutation])