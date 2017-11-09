const { RideRequest, User } = require('../../../database/models')

const resolvers = {
    Query: {
        getAllRequests(_, args) {
            return RideRequest.findAll()
        },
        getRequestsByUser(_, args) {
            return RideRequest.findByUser(args.userId)
        }
    },
    Mutation: {
        addRequest(_, args) {
            return RideRequest.add(args)
        },
        removeRequest(_, args) {
            return RideRequest.remove(args.userId)
        }
    },
    RideRequest: {
        user(rideRequest) {
            return User.find(rideRequest.userId)
        }
    }
}

module.exports = resolvers
