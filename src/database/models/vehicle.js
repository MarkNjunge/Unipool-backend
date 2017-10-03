const mongoose = require('mongoose');
const user = require('./user');

const VehicleSchema = new mongoose.Schema({
    registrationNumber: String,
    make: String,
    color: String,
    capacity: Number,
    ownerId: String
});

const VehicleModel = mongoose.model('vehicle', VehicleSchema);

async function addVehicle(details) {
    return await VehicleModel.create(details)
}

/**
 * @param {Object} details an object containing the necessary details
 * */

function getVehicle(details) {
    if (typeof details !== 'object' && !Array.isArray(details)) {
        throw new Error(`Received parameter of type ${typeof details} instead of Object`);
    }
    return VehicleModel.find(details)
}

/**
 * @param {String} id The vehicles Id
 * */

function deleteVehicle(id) {
    return VehicleModel.findByIdAndRemove(id);
}

module.exports = {
    schema: VehicleSchema,
    model: VehicleModel
};