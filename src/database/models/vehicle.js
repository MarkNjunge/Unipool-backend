const mongoose = require('mongoose')

const VehicleSchema = mongoose.Schema({
    registrationNumber: String,
    make: String,
    color: String,
    capacity: Number,
    ownerId: String
})
const VehicleModel = mongoose.model('Vehicle', VehicleSchema)

const Vehicle = {
    schema: VehicleSchema,
    model: VehicleModel,
    add: function (details) {
        return this.model.create(details)
    },
    get: function (details) {
        return this.model.find(details)
    },
    update: function (details) {
        if (details.hasOwnProperty('id')) {
            let id = details.id
            delete details.id
            return this.model.findByIdAndUpdate(id, details)
        } else {
            throw new Error('Vehicle Id expected but none was found')
        }
    },
    delete: function (vehicleId) {
        return this.model.findByIdAndRemove(vehicleId)
    }
}

module.exports = Vehicle