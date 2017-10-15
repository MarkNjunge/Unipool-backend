'use strict'

const mongoose = require('mongoose')
const connectOptions = {
    promiseLibrary: global.Promise,
    useMongoClient: true
}
const logger = require('../middleware/logger')

const {
    mongoConfig
} = require('../config')

function init() {
    return new Promise((resolve, reject) => {
        // const mongoUrl = mongoConfig.localUrl
        const mongoUrl = mongoConfig.url
        mongoose.connect(mongoUrl, connectOptions)
        const db = mongoose.connection

        db.on('error', (reason) => {
            reject(reason)
        })

        db.on('open', () => {
            logger.info('Mongo Connected')
            resolve()
        })

        db.on('disconnected', () => {
            logger.warn('Disconnected from mongo', true)
        })
    })
}

module.exports = {
    init,

}