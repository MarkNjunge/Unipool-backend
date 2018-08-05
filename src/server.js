const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const formatError = require('apollo-errors').formatError
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const expressPlayground = require('graphql-playground-middleware-express')
    .default

const logger = require('./middleware/logger')

const Database = require('./database')

const Schema = require('./graphql/schema')

// Get port from run command or default to 3000
const PORT = process.argv[2] ? process.argv[2] : 3000

const app = express()

app.use(cors())

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
        app.use(
            '/graphql',
            bodyParser.json(),
            graphqlExpress(() => ({
                formatError,
                schema: Schema
            }))
        )
    })
    .then(() => {
        // Add endpoint for graphiql
        app.use(
            '/graphiql',
            bodyParser.json(),
            graphiqlExpress({
                endpointURL: '/graphql'
            })
        )
    })
    .then(() => {
        app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
    })
    .then(() => {
        app.use(express.static(__dirname + '/public'))
    })
    .then(() => {
        logger.info('Starting server...')
        app.listen(PORT, () => {
            logger.info(`Server successfully started on port ${PORT}`)
        })
    })
    .catch(reason => {
        logger.error('Failed to start: ' + reason, true)
    })
