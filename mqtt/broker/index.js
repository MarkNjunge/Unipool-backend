const ip = require('ip');
const mosca = require('mosca');
const {mqttConfig} = require('./../../config');
const mongo = require('../../src/database');

let settings = {
    port: mqttConfig.port
};

let server = new mosca.Server(settings);

server.on('clientConnected', (client) => {
    console.log(`client connected: ${client.id}`);
});

function initBroker() {
    return new Promise((resolve, reject) => {
        server.on('ready', () => {
            console.log(`Broker running on mqtt://${ip.address()}:${mqttConfig.port}`);
            resolve()
        });
    })
}

module.exports = {
    initBroker
};

