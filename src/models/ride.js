"use strict";

const mongoose = require('mongoose');
const user = require('./user');
const vehicle = require('./vehicle');

const RideSchema = new mongoose.Schema({
    driver: user.schema,
    users: [user.schema],
    vehicle: vehicle.schema,
    from: String,
    departueTime: Date,
    numberOfPassengers: Number,
    arrived: Boolean,
});

const RideModel = mongoose.model('ride', RideSchema);

module.exports = {
    schema: RideSchema,
    model: RideModel
};