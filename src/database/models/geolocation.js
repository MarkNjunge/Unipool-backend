'use strict'

const mongoose = require('mongoose')

const GeoSchema = mongoose.Schema({
    lat: Number,
    long: Number,
    region: String
})

const GeoModel = mongoose.model('Geolocation', GeoSchema)
const GeoLocation = {
    schema: GeoSchema,
    model: GeoModel
}

module.exports = GeoLocation