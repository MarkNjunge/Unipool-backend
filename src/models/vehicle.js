const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    registrationNumber: String,
    make: String,
    color: String,
    capacity: Number
});

const vehicleModel = mongoose.model('vehicle', VehicleSchema);

module.exports = {
    schema: VehicleSchema,
    model: vehicleModel
};