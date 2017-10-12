const merge = require('lodash').merge

const UserResolvers = require('./types/user/resolver')
const VehicleResolvers = require('./types/vehicle/resolver')
const RideResolvers = require('./types/ride/resolver')
const GeolocationResolvers = require('./types/geolocation/resolver')

const resolvers = merge(UserResolvers, VehicleResolvers, RideResolvers, GeolocationResolvers)

module.exports = resolvers
