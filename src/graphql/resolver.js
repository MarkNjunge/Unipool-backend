const merge = require('lodash').merge

const UserResolvers = require('./types/user/resolver').resolvers
const VehicleResolvers = require('./types/vehicle/resolver').resolvers

const resolvers = merge(UserResolvers, VehicleResolvers)

module.exports = {
  resolvers
}