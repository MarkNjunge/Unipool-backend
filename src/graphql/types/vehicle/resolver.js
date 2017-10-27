const { Vehicle, User } = require('../../../database/models')

const resolvers = {
    Query: {
        getVehicle(_, args) {
            console.log(args)
            return Vehicle.find(args)
        }
    },
    Mutation: {
        addVehicle(_, args) {
            return Vehicle.add(args)
        },
        updateVehicle(_, args) {
            return Vehicle.update(args)
        },
        deleteVehicle(_, args) {
            return null
        }
    },
    Vehicle: {
        owner(val) {
            return User.find(val.userId)
        }
    }
}

module.exports = resolvers
