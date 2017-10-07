"use strict";
const env = require('dotenv').config();
const chalk = require('chalk');

function logger() {
    let args = [].slice.call(arguments);
    let type;
    let data;
    if (args.length === 1) {
        data = args[0];
    } else if (args.length === 2) {
        data = args[0];
        type = args[1];
    }
    if (type) {
        if (typeof data === 'object') {
            console.dir(data);
        } else {
            console.log(chalk.red(data));
        }
    } else {
        if (typeof data === 'object') {
            console.dir(data);
        } else {
            console.log(chalk.cyan(data));
        }
    }
}

module.exports = {
    log: logger
};