const mongoose = require('mongoose')

const Vehicle = {
    schema: new mongoose.Schema({
        registrationNumber: String,
        make: String,
        color: String,
        capacity: Number,
        ownerId: String
    }),
    model: mongoose.model('vehicle', this.schema),
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