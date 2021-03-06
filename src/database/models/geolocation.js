'use strict'

const mongoose = require('mongoose')

const GeoSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String
})

const GeoModel = mongoose.model('GeoLocation', GeoSchema)
const GeoLocation = {
    schema: GeoSchema,
    model: GeoModel,
    mapLocation(arg) {
        return (arg.latitude && arg.longitude) ?
            {latitude: arg.latitude, longitude: arg.longitude, name: arg.name || ''} :
            (arg.hasOwnProperty('location')) ? arg.location :
                false
    }
}

module.exports = GeoLocation