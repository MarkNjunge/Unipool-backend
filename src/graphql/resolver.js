const merge = require('lodash').merge

const UserResolvers = require('./types/user/resolver')
const VehicleResolvers = require('./types/vehicle/resolver')
const RideResolvers = require('./types/ride/resolver')
const RideRequestResolvers = require('./types/ride-request/resolver')
const ScheduledRideResolvers = require('./types/scheduled-ride/resolver')
const ManagerResolvers = require('./types/manager/resolver')

const resolvers = merge(
    UserResolvers,
    VehicleResolvers,
    RideResolvers,
    RideRequestResolvers,
    ScheduledRideResolvers,
    ManagerResolvers
)

module.exports = resolvers
