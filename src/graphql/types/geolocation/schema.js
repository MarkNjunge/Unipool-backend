const _ = require('lodash')

const types = `
# A point on the map
type Geolocation {
  # Latitude
  lat: Int

  # Longitude
  long: Int

  # Descriptive name of the location
  region: String
}
`

const query = `
type query{
  # Get the name of the region the coordinates are located
  getRegion(lat: Int!, long: Int!): Geolocation
}
`

const mutation = `

`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}