"use strict";

const mongoose = require('mongoose');
const vehicle = require('./vehicle');

const UserSchema = new mongoose.Schema({
    _id: String,
    isValidated: Boolean,
    studentNumber: Number,
    email: String,
    gender: {type: String, enum: ['M', 'F']},
    fullName: String,
    phone: Number,
    userType: {type: String, enum: ['DRIVER', 'RIDER', 'BOTH']},
    vehicles: [vehicle.schema]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    schema: UserSchema,
    model: UserModel
};