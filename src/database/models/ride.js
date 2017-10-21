const mongoose = require('mongoose')
const user = require('./user')
const geoLocation = require('./geolocation')

const PickUp = mongoose.Schema({
    rideId: String,
    userId: String,
    time: Number,
    location: geoLocation.schema
})

const passengerLimit = val => val.length <= 4

const RideSchema = mongoose.Schema({
    driverId: String,
    vehicleRegNo: String,
    startLatitude: Number,
    startLongitude: Number,
    endLatitude: Number,
    endLongitude: Number,
    departureTime: Number,
    passengers: {
        type: [String],
        // unique: true,
        validate: [passengerLimit, '{PATH} exceeds passenger limit of 4']
    },
    PickUpLocs: [PickUp],
    arrivalTime: Number,
    passengerCount: {type: Number, default: 0},
    completed: {type: Boolean, default: false}
})

const RideModel = mongoose.model('ride', RideSchema)

const Ride = {
    schema: RideSchema,
    model: RideModel,
    add: function (details) {
        const toAdd = new this.model(details)
        return toAdd.save()
    },
    addPickup: function (details) {
            let toPick = {
                userId: details.userId,
                time: details.time,
                location: geoLocation.mapLocation(details)
            }
            return this.model.findOneAndUpdate({_id: details.rideId},
                {
                    $push: {PickUpLocs: toPick,
                            passengers: details.userId},
                    $inc: {passengerCount: 1}
                }, {upsert: true})
    },
    byUser: function (userId) {
        return this.model.find({user: userId})
    },
    get: function (details) {
        if (typeof details === 'object') {
            return this.model.findById(details.rideId)
        }
    },
    update: function (newVersion) {
        if (newVersion.hasOwnProperty('id')) {
            let id = newVersion.id
            return this.model.findByIdAndUpdate(id, newVersion)
        } else {
            throw new Error('Ride Id expected but none was found')
        }
    },
    isComplete: function (rideId) {
        return this.model.findByIdAndUpdate(rideId, {
            completed: true,
            arrivalTime: Date.now()
        })
    }
}

module.exports = Ride