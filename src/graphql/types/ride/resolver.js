const { Ride, User, Vehicle } = require('../../../database/models')
const resolvers = {
    Query: {
        getRide(_, args) {
            return Ride.get(args)
        },
        getRidesByUser(_, args) {
            return Ride.getByUser(args.userId)
        },
        getAllRides(_, args) {
            return Ride.getAll()
        }
    },
    Mutation: {
        startRide(_, args) {
            args.depatureTime = Date.now()
            return Ride.add(args)
        },
        addPickup(_, args) {
            return Ride.addPickup(args)
        },
        removePickUp(_, args) {
            return Ride.removePickUp(args)
        },
        setPickUpCompleted(_, args) {
            return Ride.setPickUpCompleted(args)
        },
        markRideAsCompleted(_, args) {
            return Ride.setRideCompleted(args)
        }
    },
    Ride: {
        driver(ride) {
            return User.find(ride.driverId)
        },
        vehicle(ride) {
            return Vehicle.find(ride.vehicleRegNo)
        }
    }
}

module.exports = resolvers
