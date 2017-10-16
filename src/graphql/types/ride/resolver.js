const {Ride} = require('../../../database/models')

const resolvers = {
    Query: {
        getRide(_, args) {
            return Ride.get(args)
        },
        getRidesByUser(_, args) {
            return Ride.byUser(args)
        },
        getAllRides(_, args) {
            return Ride.get(args)
        }
    },
    Mutation: {
        startRide(_, args) {
            return Ride.add(args)
        },
        markRideAsCompleted(_, args) {
            return Ride.isComplete(args._id)
        }
    }
}

module.exports = resolvers