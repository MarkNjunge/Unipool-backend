const _ = require('lodash')

const types = `
# A point on the map
type Geolocation {
  # Latitude
  latitude: Float

  # Longitude
  longitude: Float

  # Descriptive name of the location
  region: String
}
`

const query = `
type Query{
  # Get the name of the region the coordinates are located
  getRegion(latitude: Float!, longitude: Float!): Geolocation
}
`

const mutation = `

`

module.exports = {
  typeDefs: _.join([types, query, mutation])
}