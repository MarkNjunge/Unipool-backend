const _ = require('lodash')

const types = `
# Return type of a successful login or registration.
# Used to authorize the current user.
type AuthenticationReturn{
  # Token to be used for requests that require authorization. Passed in the header as Authorization: 'token'
  token: String

  # The time (epoch time in seconds) at which the token was created.
  created: Int

  # The time (epoch time in seconds) at which the token expires.
  expires: Int
}
`

const mutation = `
type Mutation {
  # Register a new user. Email is unique.
  register(username: String!, password: String!): AuthenticationReturn

  # Login a user.
  login(username: String!, password: String!): AuthenticationReturn
}
`

module.exports = _.join([types, mutation])
