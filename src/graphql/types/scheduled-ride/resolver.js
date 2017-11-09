const { ScheduledRide, User } = require('../../../database/models')

const resolvers = {
    Query: {
        getAllScheduledRides(_, args) {
            return ScheduledRide.getAll()
        },
        getScheduledRidesForUser(_, args) {
            return ScheduledRide.getForUser(args.userId)
        },
        getScheduledRideById(_, args) {
            return ScheduledRide.getById(args.rideId)
        }
    },
    Mutation: {
        addScheduledRide(_, args) {
            return ScheduledRide.add(args)
        },
        deleteScheduledRide(_, args) {
            return ScheduledRide.delete(args.rideId)
        },
        setScheduledRideDriver(_, args) {
            return ScheduledRide.setDriver(args.rideId, args.driverId)
        }
    },
    ScheduledRide: {
        user(scheduledRide) {
            return User.find(scheduledRide.userId)
        },
        driver(scheduledRide) {
            return User.find(scheduledRide.driverId)
        }
    }
}

module.exports = resolvers
