const ip = require('ip');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const formatError = require('apollo-errors').formatError;
const {
    graphqlExpress,
    graphiqlExpress
} = require('graphql-server-express');

require('dotenv').config();

const {
    log
} = require('./middleware/logger');

const Database = require('./database');

const Schema = require('./graphql/schema').schema;

// Get port from run command or default to 3000
const PORT = process.argv[2] ? process.argv[2] : 3000;

const app = express();

Promise.resolve()
    .then(() => {
        return Database.init();
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
        // Redirect from index page to graphiql
        app.use('/', (req, res) => {
            res.redirect('/graphiql')
        })
    })
    .then(() => {
        log(chalk.cyan('Starting server...'));
        app.listen(PORT, () => {
            log(`Server successfully started on ${ip.address()}:${PORT}`)
        })
    })
    .catch(reason => {
        log('Failed to start: ' + reason, true);
    });