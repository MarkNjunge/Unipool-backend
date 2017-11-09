const mongoose = require('mongoose')

const VehicleSchema = mongoose.Schema({
    registrationNumber: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    make: String,
    color: String,
    capacity: Number
})
const VehicleModel = mongoose.model('Vehicle', VehicleSchema)

const Vehicle = {
    schema: VehicleSchema,
    model: VehicleModel,
    add: function(details) {
        let newVehicle = new this.model(details)
        return newVehicle.save()
    },
    find: function(arg) {
        return this.model.findOne({
            registrationNumber: arg.registrationNumber
        })
    },
    findAll: function(userId) {
        if (userId == undefined) {
            return this.model.find({})
        } else {
            return this.model.find({ userId })
        }
    },
    update: function(args) {
        return this.model.findOne(
            { registrationNumber: args.registartionNumber },
            (err, res) => {
                res.make = args.make ? args.make : res.make
                res.capacity = args.capacity ? args.capacity : res.capacity
                res.color = args.color ? args.color : res.color

                return res.save()
            }
        )
    },
    delete: function(registrationNumber) {
        return this.model.remove({ registrationNumber }).exec()
    }
}

module.exports = Vehicle
