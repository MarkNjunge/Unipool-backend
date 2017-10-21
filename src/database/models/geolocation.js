'use strict'

const mongoose = require('mongoose')

const GeoSchema = mongoose.Schema({
    lat: Number,
    long: Number,
    name: String
})

const GeoModel = mongoose.model('Geolocation', GeoSchema)
const GeoLocation = {
    schema: GeoSchema,
    model: GeoModel,
    mapLocation(arg) {
        return (arg.latitude && arg.longitude) ?
            {lat: arg.latitude, long: arg.longitude, name: arg.name || ''} :
            (arg.hasOwnProperty('location')) ? arg.location :
                false
    }
}

module.exports = GeoLocation