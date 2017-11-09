const { Ride, User, Vehicle } = require('../../../database/models')
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
