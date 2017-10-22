const chalk = require('chalk')

const logger = {
    log(message) {
        console.log(`Log: ${message}`)
    },
    error(message) {
        console.log(`${chalk.bgRed('Error')}: ${message}`)
    },
    info(message) {
        console.log(`${chalk.bgGreen('info')}: ${message}`)
    },
    debug(message) {
        console.log(`${chalk.bgBlue('debug')}: ${message}`)
    },
    warn(message) {
        console.log(`${chalk.bgYellow('warn')}: ${message}`)
    }
}

module.exports = logger