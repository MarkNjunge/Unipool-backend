const merge = require('lodash').merge

const UserResolvers = require('./types/user/resolver').resolvers
const VehicleResolvers = require('./types/vehicle/resolver').resolvers
const RideResolvers = require('./types/ride/resolver').resolvers
const GeolocationResolvers = require('./types/geolocation/resolver').resolvers

const resolvers = merge(UserResolvers, VehicleResolvers, RideResolvers, GeolocationResolvers)

module.exports = {
  resolvers
}