const mongoose = require('mongoose')
const geoLocation = require('./geolocation')

const ScheduledRideSchema = mongoose.Schema({
    rideId: String,
    userId: String,
    startLocation: geoLocation.schema,
    endLocation: geoLocation.schema,
    depatureTime: Number,
    driverId: String
})

const ScheduledRideModel = mongoose.model('scheduled_ride', ScheduledRideSchema)

const ScheduledRide = {
    schema: ScheduledRideSchema,
    model: ScheduledRideModel,
    add: function(args) {
        const toAdd = new this.model(args)
        return toAdd.save()
    },
    getById: function(rideId) {
        return this.model.findOne({ rideId })
    },
    getForUser: function(userId) {
        return this.model.find({ userId })
    },
    getAll: function() {
        return this.model.find({})
    },
    setDriver: function(rideId, driverId) {
        return this.model.findOne({ rideId }, (err, res) => {
            if (err) return err

            res.driverId = driverId
            res.save(err => {
                if (err) return err
            })
        })
    },
    delete: function(rideId) {
        return this.model.findOneAndRemove({ rideId }, (err, res) => {
            if (err) return err

            return 'Deleted'
        })
    }
}

module.exports = ScheduledRide
