const {User} = require('../../../database/models')

const resolvers = {
    Query: {
        getUser(_, args) {
            return User.find(args.userId)
        },
        getVehicle(_, args) {
            return User.getVehicles(args.registrationNumber)
        }
    },
    Mutation: {
        addUser(_, args) {
            return User.add(args)
        },
        updateUser(_, args) {
            return User.update(args)
        },
        deleteUser(_, args) {
            return User.delete(args._id)
        }
    }
}

module.exports = resolvers