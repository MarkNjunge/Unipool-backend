'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const connectOptions = {
    useMongoClient: true,
    keepAlive: 1,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 30000
}
const logger = require('../middleware/logger')

const {
    mongoConfig
} = require('../config')

function init() {
    return new Promise((resolve, reject) => {
        let mongoUrl = mongoConfig.url

        mongoose.connect(mongoUrl, connectOptions)
        const db = mongoose.connection

        db.on('error', (reason) => {
            reject(reason)
        })

        db.on('open', () => {
            logger.info('Connected to database')
            resolve()
        })

        db.on('disconnected', () => {
            logger.warn('Disconnected from mongo', true)
        })
    })
}

module.exports = {
    init
}