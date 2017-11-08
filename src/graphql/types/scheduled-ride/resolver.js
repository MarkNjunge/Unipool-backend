const resolvers = {
    Query: {
        getAllScheduledRides(_, args) {
            return null
        },
        getScheduledRidesForUser(_, args) {
            return null
        }
    },
    Mutation: {
        addScheduledRide(_, args) {
            return null
        },
        deleteScheduledRide(_, args) {
            return null
        },
        setScheduledRideDriver(_, args) {
            return null
        }
    },
    ScheduledRide: {
        user(scheduledRide) {
            return null
        },
        driver(scheduledRide) {
            return null
        }
    }
}

module.exports = resolvers
