const mongoose = require('mongoose')

const VehicleSchema = mongoose.Schema({
    registrationNumber: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    make: String,
    color: String,
    capacity: Number
})
const VehicleModel = mongoose.model('Vehicle', VehicleSchema)

const Vehicle = {
    schema: VehicleSchema,
    model: VehicleModel,
    add: function(details) {
        let newVehicle = new this.model(details)
        return newVehicle.save()
    },
    find: function(arg) {
        return this.model.findOne({
            registrationNumber: arg.registrationNumber
        })
    },
    findAll: function(userId) {
        return this.model.find({
            userId
        })
    },
    update: function(details) {
        if (details.hasOwnProperty('userId')) {
            return this.model.findByIdAndUpdate(details.userId, details)
        } else {
            throw new Error('Vehicle Id expected but none was found')
        }
    },
    delete: function(vehicleId) {
        return this.model.findByIdAndRemove(vehicleId)
    }
}

module.exports = Vehicle
