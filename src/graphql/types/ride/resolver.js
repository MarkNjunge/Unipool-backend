const resolvers = {
  Query: {
    getRide(_, args) {
      return null
    },
    getAllRides(_, args) {
      return null
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

module.exports = {
  resolvers
}