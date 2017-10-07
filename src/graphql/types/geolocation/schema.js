const _ = require('lodash')

const types = `
# A point on the map
type Geolocation {
  # Latitude
  lat: Float

  # Longitude
  long: Float

  # Descriptive name of the location
  region: String
}
`

const query = `
type Query{
  # Get the name of the region the coordinates are located
  getRegion(lat: Float!, long: Float!): Geolocation
}
`

const mutation = `

`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}