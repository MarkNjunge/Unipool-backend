'use strict';

const mongoose = require('mongoose');
const connectOptions = {
    promiseLibrary: global.Promise,
    useMongoClient: true
};

const {
    mongoConfig
} = require('../../config');

function init() {
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
    init
};