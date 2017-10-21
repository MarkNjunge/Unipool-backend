const mongoose = require('mongoose')
const user = require('./user')
const geoLocation = require('./geolocation')

const PickUp = mongoose.Schema({
    userId: String,
    time: Number,
    location: geoLocation.schema
})

const passengerLimit = val => val.length <= 4

const RideSchema = mongoose.Schema({
    driverId: String,
    vehicleRegNo: String,
    startLocation: geoLocation.schema,
    endLocation: geoLocation.schema,
    departureTime: Number,
    passengers: {
        type: [String],
        // unique: true,
        validate: [passengerLimit, '{PATH} exceeds passenger limit of 4']
    },
    pickUps: [PickUp],
    arrivalTime: Number,
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
                    $push: {pickUp: toPick,
                            passengers: details.userId}
                }, {upsert: true})
    },
    byUser: function (userId) {
        return this.model.find({user: userId})
    },
    get: function (arg) {
        if (typeof arg === 'object') {
            return this.model.findById(arg.rideId)
        }
        return this.model.findOne(arg);
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