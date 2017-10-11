'use strict'

const mongoose = require('mongoose')
const vehicle = require('./vehicle')

const UserSchema = mongoose.Schema({
    _id: String,
    studentNumber: {type: Boolean, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true, enum: ['M', 'F']},
    fullName: {type: String, required: true},
    phone: {type: Number, required: true},
    region: {type: String, required: true},
    subRegion: {type: String, required: true},
    role: {type: String, required: true, enum: ['DRIVER', 'RIDER', 'BOTH']},
    vehicles: [vehicle.schema]
})

const UserModel = mongoose.model('User', UserSchema);

const User = {
    schema: UserSchema,
    model: UserModel,
    add: function (details) {
        return this.model.create(details)
    },
    findOne: function (userId) {
        return this.model.findById(userId)
    },
    findMany: function (details) {
        return this.model.find(details)
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
        if (details.hasOwnProperty('id')) {
            let id = details.id
            delete details.id
            return this.model.findByIdAndUpdate(id, details)
        } else {
            throw new Error('User Id expected but none was found')
        }
    }
}

module.exports = User