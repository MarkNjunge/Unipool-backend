const mongoose = require('mongoose')
const geoLocation = require('./geolocation')

const RideRequestSchema = mongoose.Schema({
    userId: { type: String, unique: true },
    startLocation: geoLocation.schema,
    endLocation: geoLocation.schema,
    requestTime: Number
})

const RideRequestModel = mongoose.model('riderequest', RideRequestSchema)

const RideRequest = {
    schema: RideRequestSchema,
    model: RideRequestModel,
    add: function(args) {
        args.requestTime = Date.now()
        const toAdd = new this.model(args)
        return toAdd.save()
    },
    findByUser: function(userId) {
        return this.model.findOne({ userId })
    },
    findAll: function(endLocation) {
        return this.model.find({ endLocation })
    },
    remove: function(userId) {
        return this.model.remove({ userId })
    }
}

module.exports = RideRequest
