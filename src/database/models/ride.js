const mongoose = require('mongoose')
const geoLocation = require('./geolocation')

const PickUp = mongoose.Schema({
    userId: String,
    time: { type: Number, default: 0 },
    location: geoLocation.schema,
    completed: { type: Boolean, default: false }
})

const RideSchema = mongoose.Schema({
    rideId: String,
    driverId: String,
    vehicleRegNo: String,
    startLocation: geoLocation.schema,
    endLocation: geoLocation.schema,
    departureTime: Number,
    pickUps: [PickUp],
    arrivalTime: Number,
    completed: { type: Boolean, default: false }
})

const RideModel = mongoose.model('ride', RideSchema)

const Ride = {
    schema: RideSchema,
    model: RideModel,
    add: function(details) {
        const toAdd = new this.model(details)
        return toAdd.save()
    },
    addPickup: function(details) {
        let toPick = {
            userId: details.userId,
            location: {
                latitude: details.latitude,
                longitude: details.longitude,
                name: details.locationName
            }
        }
        return this.model.findOneAndUpdate(
            { rideId: details.rideId },
            {
                $push: {
                    pickUps: toPick
                }
            },
            { upsert: true }
        )
    },
    removePickUp: function(args) {
        return this.model.findOne({ rideId: args.rideId }, (err, ride) => {
            if (err) {
                return err
            } else {
                const pickUps = ride.pickUps
                pickUps.forEach(element => {
                    if (element.userId == args.userId) {
                        element.remove()
                    }
                }, this)
                ride.pickUps = pickUps
                return ride.save((err, updated) => {
                    if (err) return err

                    return updated
                })
            }
        })
    },
    setPickUpCompleted: function(args) {
        return this.model.findOne({ rideId: args.rideId }, (err, ride) => {
            if (err) {
                return err
            } else {
                const pickUps = ride.pickUps
                pickUps.forEach(element => {
                    if (element.userId == args.userId) {
                        element.completed = true
                        element.time = Date.now()
                        element.location.name = args.locationName
                        element.location.latitude = args.latitude
                        element.location.longitude = args.longitude
                    }
                }, this)
                ride.pickUps = pickUps
                return ride.save((err, updated) => {
                    if (err) return err

                    return updated
                })
            }
        })
    },
    byUser: function(userId) {
        return this.model.find({ user: userId })
    },
    get: function(arg) {
        if (typeof arg === 'object') {
            return this.model.findById(arg.rideId)
        }
        return this.model.findOne(arg)
    },
    update: function(newVersion) {
        if (newVersion.hasOwnProperty('id')) {
            let id = newVersion.id
            return this.model.findByIdAndUpdate(id, newVersion)
        } else {
            throw new Error('Ride Id expected but none was found')
        }
    },
    setRideCompleted: function(args) {
        return this.model.findOne({ rideId: args.rideId }, (err, ride) => {
            ride.endLocation = {
                latitude: args.latitude,
                longitude: args.longitude,
                name: args.locationName
            }
            ride.completed = true
            ride.arrivalTime = Date.now()
            return ride.save((err, updated) => {
                if (err) return err

                return updated
            })
        })
    }
}

module.exports = Ride
