const {Vehicle, User} = require('../../../database/models')

const resolvers = {
    Query: {
        getVehicle(_, args) {
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
    }
}

module.exports = resolvers