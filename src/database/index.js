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
        let mongoUrl = ''
        if (process.env.ENVIRONMENT == 'production') {
            mongoUrl = mongoConfig.url
        } else {
            mongoUrl = mongoConfig.localUrl
        }

        mongoose.connect(mongoUrl, connectOptions)
        const db = mongoose.connection

        db.on('error', (reason) => {
            reject(reason)
        })

        db.on('open', () => {
            logger.info('Mongo Connected ' + mongoUrl)
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