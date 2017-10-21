'use strict'

const mongoose = require('mongoose')
const vehicle = require('./vehicle')

const UserSchema = mongoose.Schema({
    _id: String,
    studentNumber: {type: Number, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true, enum: ['M', 'F']},
    fullName: {type: String, required: true},
    phone: {type: Number, required: true},
    vehicles: [vehicle.schema]
})

const UserModel = mongoose.model('User', UserSchema)

const User = {
    schema: UserSchema,
    model: UserModel,
    add: function (details) {
        const newUser = new this.model(details)
        return newUser.save()
    },
    find: function (arg) {
        if (typeof arg === 'object') {
            return this.model.find(arg)
        }
        return this.model.findById(arg)
    },
    getVehicles: function (userId) {
        return new Promise((resolve, reject) => {
            this.model.findById(userId).then(user => {
                resolve(user.vehicles)
            }).catch(err => {
                reject(err)
            })
        })
    },
    delete: function (userId) {
        return this.model.findByIdAndRemove(userId)
    },
    update: function (details) {
        if (details._id) {
            let id = details._id
            delete details._id
            return this.model.findByIdAndUpdate(id, details)
        }
        throw new Error('User Id (_id), expected but none was found')
    }
}

module.exports = User