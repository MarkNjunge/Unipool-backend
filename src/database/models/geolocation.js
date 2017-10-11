'use strict'

const mongoose = require('mongoose')
const geofence = require('../../middleware/geofence')

const Geolocation =  {
    schema: new mongoose.Schema({
        lat: Number,
        long: Number,
        regoin: String
    }),
    model: mongoose.model('geolocation', this.schema),
    getRegion: function (location) {
        if (location.hasOwnProperty('lat') && location.hasOwnProperty('long')) {
            return geofence(location)
        }
    }
}

module.exports = Geolocation