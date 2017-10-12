const ip = require('ip')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const formatError = require('apollo-errors').formatError
const {
    graphqlExpress,
    graphiqlExpress
} = require('graphql-server-express')

require('dotenv').config()

const logger = require('./middleware/logger')

const Database = require('./database')

const Schema = require('./graphql/schema')

// Get port from run command or default to 3000
const PORT = process.argv[2] ? process.argv[2] : 3000

const app = express()

Promise.resolve()
    .then(() => {
        return Database.init()
    })
    .then(() => {
        // Endpoint for docs
        app.use('/docs', (req, res) => {
            res.sendFile(path.join(__dirname, './public/documentation.html'))
        })
    })
    .then(() => {
        // Setup graphql
        app.use('/graphql', bodyParser.json(), graphqlExpress(() => ({
            formatError,
            schema: Schema
        })))
    })
    .then(() => {
        // Add endpoint for graphiql
        app.use('/graphiql', bodyParser.json(), graphiqlExpress({
            endpointURL: '/graphql'
        }))
    })
    .then(() => {
        app.use('/', (req, res) => {
            res.sendFile(path.join(__dirname, './public/index.html'))
        })
    })
    .then(() => {
        logger.info('Starting server...')
        app.listen(PORT, () => {
            logger.info(`Server successfully started on ${ip.address()}:${PORT}`)
        })
    })
    .catch(reason => {
        logger.error('Failed to start: ' + reason, true)
    })