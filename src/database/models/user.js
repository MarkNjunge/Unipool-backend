'use strict'

const mongoose = require('mongoose')
const vehicle = require('./vehicle')

const User =  {
    schema: new mongoose.Schema({
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
    }),
    model: mongoose.model('User', this.schema),
    add: function (details) {
        return this.model.create(details)
    },
    findOne: function (userId) {
        return this.model.findById(userId)
    },
    findMany: function (details) {
        return this.model.find(details)
    },
    getVehicles: async function (userId) {
        this.model.findById(userId).then(user => {
            return user.vehicles
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

module.exports = User;