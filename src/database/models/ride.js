"use strict";

const mongoose = require('mongoose');
const user = require('./user');
const vehicle = require('./vehicle');

const RideSchema = new mongoose.Schema({
    driver: user.schema,
    users: [String],
    vehicle: vehicle.schema,
    region: String,
    from: String,
    departueTime: Date,
    numberOfPassengers: Number,
    arrived: Boolean
});

const RideModel = mongoose.model('ride', RideSchema);

// get rides per user
function getUserRides(userId) {
    return RideModel.find({user: userId});
}

// get all rides from a particular region
function getRegionalRides(region) {
    return RideModel.find({region: region});
}

// get rides by departure time
function getARide(options) {
    return RideModel.find(options);
}

// update ride [complete, departure time]

function updateRide(options) {
    let id;
    if (options.hasOwnProperty('id')) {
        id = options.id;
        return RideModel.findByIdAndUpdate(id, {options})
    } else {
        throw new Error('Ride Id expected but found none');
    }
}


module.exports = {
    schema: RideSchema,
    model: RideModel
};