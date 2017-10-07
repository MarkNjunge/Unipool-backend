"use strict";

const mongoose = require('mongoose');

function _geolocation() {
    this.schema = new mongoose.Schema({
        lat: Number,
        long: Number,
        regoin: String
    });
    this.model = mongoose.model('geolocation', this.schema);
}

const Geolocation = Object.create(_geolocation.prototype, {
    
});

module.exports = {
  geolocation: Geolocation
};