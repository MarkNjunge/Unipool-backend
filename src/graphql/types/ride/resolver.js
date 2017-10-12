const {Ride} = require('../../../database/models');

const resolvers = {
  Query: {
    getRide(_, args) {
      return Ride.get(args)
    },
    getAllRides(_, args) {
      return Ride.get({})
    }
  },
  Mutation: {
    addRide(_, args) {
      return null
    },
    markRideAsCompleted(_, args) {
      return null
    }
  }
}

module.exports = resolvers