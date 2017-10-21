const {Ride, User, Vehicle, GeoLocation} = require('../../../database/models')
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
        addPickup(_, args) {
            return Ride.addPickup(args)
        },
        markRideAsCompleted(_, args) {
            return Ride.isComplete(args._id)
        }
    },
    Ride: {
        driver(ride) {
            return User.find(ride.driverId)
        },
        vehicle(ride) {
            return Vehicle.find(ride.vehicleRegNo)
        },
        passengers(ride) {
            return User.find({
                _id: {
                    $in: ride.passengers
                }
            })
        }
    }
}

module.exports = resolvers