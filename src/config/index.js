'use strict'
require('dotenv').config()

module.exports = {
    mongoConfig: {
        url: process.env.MONGODB_URI || ''
    }
}
