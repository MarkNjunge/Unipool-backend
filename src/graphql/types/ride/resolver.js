const {Ride, User, Vehicle} = require('../../../database/models')
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
        vehicle(val) {
            console.log(val);
            return Vehicle.find(val.vehicleRegNo)
        }
    }
}

module.exports = resolvers