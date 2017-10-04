const mongoose = require('mongoose');

function _vehicles() {
    this.schema = new mongoose.Schema({
        registrationNumber: String,
        make: String,
        color: String,
        capacity: Number,
        ownerId: String
    });
    this.model = mongoose.model('vehicle', VehicleSchema);
}

const Vehicles = Object.create(_vehicles.prototype, {
    add: async function (details) {
        return await this.model.create(details);
    },
    get: function (details) {
        return this.model.find(details)
    },
    update: function (details) {
        if (details.hasOwnProperty('id')) {
            let id = details.id;
            delete details.id;
            return this.model.findByIdAndUpdate(id, details)
        } else {
            throw new Error('Vehicle Id expected but none was found');
        }
    },
    delete: function (vehicleId) {
        return this.model.findByIdAndRemove(vehicleId);
    }
});

module.exports = {
    Vehicles
};