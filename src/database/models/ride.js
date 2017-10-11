const mongoose = require('mongoose')
const user = require('./user')
const vehicle = require('./vehicle')
const geolocation = require('./geolocation')

const RideSchema = mongoose.Schema({
    _id: String,
    driver: user.schema,
    passengers: [String],
    vehicle: vehicle.schema,
    startLocation: geolocation.schema,
    endLocation: geolocation.schema,
    departureTime: Date,
    arrivalTime: Date,
    passengerCount: Number,
    completed: Boolean
})

const RideModel = mongoose.model('ride', RideSchema)

const Ride = {
    schema: RideSchema,
    model: RideModel,
    add: function (details) {
        return this.model.create(details)
    },
    byUser: function (userId) {
        return this.model.find({user: userId})
    },
    byRegion: function (region) {
        return this.model.find({region: region})
    },
    get: function (details) {
        if (typeof details === 'object') {
            return this.model.find(details)
        } else {
            throw new Error('Expected an object but received:', typeof details)
        }
    },
    update: function (newVersion) {
        if (newVersion.hasOwnProperty('id')) {
            let id = newVersion.id
            delete newVersion.id
            return this.model.findByIdAndUpdate(id, newVersion)
        } else {
            throw new Error('Ride Id expected but none was found')
        }
    },
    markComplete: function (rideId) {
        return this.model.findByIdAndUpdate(rideId, {
            completed: true,
            arrivalTime: Date.now()
        })
    }
}

module.exports = Ride