"use strict";

const mongoose = require('mongoose');
const vehicle = require('./vehicle');

const UserSchema = new mongoose.Schema({
    _id: String,
    isValidated: {type: Boolean, required: true},
    studentNumber: {type: Boolean, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true, enum: ['M', 'F']},
    fullName: {type: String, required: true},
    phone: {type: Number, required: true},
    region: {type: String, required: true},
    subRegion: {type: String, required: true},
    role: {type: String, required: true, enum: ['DRIVER', 'RIDER', 'BOTH']},
    vehicles: [vehicle.schema]
});

const UserModel = mongoose.model('User', UserSchema);

async function addUser(details) {
    return await UserModel.create(details);
}

function getUsers(options) {
    return UserModel.find(options)
}

async function getUsersVehicles(userId) {
    UserModel.findById(userId).then(data => {
        return data.vehicles;
    })
}

function updateUser(details) {
    return UserModel.findByIdAndUpdate(details.id, details, {upsert: true});
}

function deleteUser(userId) {
    return UserModel.findByIdAndRemove(userId);
}

module.exports = {
    schema: UserSchema,
    model: UserModel
};