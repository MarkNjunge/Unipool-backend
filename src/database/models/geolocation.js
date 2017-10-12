'use strict'

const mongoose = require('mongoose')
const geofence = require('../../middleware/geofence')

const GeoSchema = mongoose.Schema({
    lat: Number,
    long: Number,
    region: String
})

const GeoModel = mongoose.model('Geolocation', GeoSchema)
const GeoLocation = {
    schema: GeoSchema,
    model: GeoModel,
    getRegion: function (location) {
        if (location.hasOwnProperty('lat') && location.hasOwnProperty('long')) {
            return geofence(location)
        }
    }
}

module.exports = GeoLocation