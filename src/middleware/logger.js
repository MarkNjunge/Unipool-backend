const env = require('dotenv')
const chalk = require('chalk')

// function logger() {
//     let args = [].slice.call(arguments);
//     let type;
//     let data;
//     if (args.length === 1) {
//         data = args[0];
//     } else if (args.length === 2) {
//         data = args[0];
//         type = args[1];
//     }
//     if (type) {
//         if (typeof data === 'object') {
//             console.dir(data);
//         } else {
//             console.log(chalk.red(data));
//         }
//     } else {
//         if (typeof data === 'object') {
//             console.dir(data);
//         } else {
//             console.log(chalk.cyan(data));
//         }
//     }
// }

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