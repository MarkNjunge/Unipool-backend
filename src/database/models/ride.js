"use strict";

const mongoose = require('mongoose');
const user = require('./user');
const vehicle = require('./vehicle');

function _rides() {
    this.schema = new mongoose.Schema({
        driver: user.schema,
        users: [String],
        vehicle: vehicle.schema,
        region: String,
        from: String,
        departureTime: Date,
        numberOfPassengers: Number,
        arrived: Boolean
    });
    this.model = mongoose.model('ride', RideSchema);
}

const Rides = Object.create(_rides.prototype, {
    byUser: function (userId) {
        return this.model.find({user: userId});
    },
    byRegion: function (region) {
        return this.model.find({region: region});
    },
    of: function (details) {
        if (typeof details === 'object') {
            return this.model.find(details);
        } else {
            throw new Error('Expected an object but received:', typeof details)
        }
    },
    update: function (newVersion) {
        if (newVersion.hasOwnProperty('id')) {
            let id = newVersion.id;
            delete newVersion.id;
            return this.model.findByIdAndUpdate(id, newVersion)
        } else {
            throw new Error('Ride Id expected but none was found');
        }
    }
});

module.exports = {
    Rides
};