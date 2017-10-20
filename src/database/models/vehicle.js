const mongoose = require('mongoose')

const VehicleSchema = mongoose.Schema({
    registrationNumber: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    make: String,
    color: String,
    capacity: Number,
})
const VehicleModel = mongoose.model('Vehicle', VehicleSchema)

const Vehicle = {
    schema: VehicleSchema,
    model: VehicleModel,
    add: function (details) {
        return this.model.create(details)
    },
    find: function (arg) {
        this.model.find(arg).then((res) => console.log(res))
        return this.model.find(arg)
    },
    update: function (details) {
        if (details.hasOwnProperty('userId')) {
            return this.model.findByIdAndUpdate(details.userId, details)
        } else {
            throw new Error('Vehicle Id expected but none was found')
        }
    },
    delete: function (vehicleId) {
        return this.model.findByIdAndRemove(vehicleId)
    }
}

module.exports = Vehicle