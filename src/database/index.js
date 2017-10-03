'use strict';

const mongoose = require('mongoose');
const connectOptions = {
    promiseLibrary: global.Promise
};

const {
    mongoConfig
} = require('../../config');

function initMongo() {
    return new Promise((resolve, reject) => {
        const mongoUrl = mongoConfig.url;
        mongoose.connect(mongoUrl, connectOptions);
        const db = mongoose.connection;

        db.on('error', (reason) => {
            reject(reason);
        });

        db.on('open', () => {
            console.log('Mongo Connected');
            resolve();
        });

        db.on('disconnected', () => {
            console.log('Disconnected from mongo');
        })
    })
}

module.exports = {
    initMongo
};