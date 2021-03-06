const createError = require('apollo-errors').createError

module.exports = {
    BasicError: createError('Error', {
        message: 'An error has occurred'
    }),
    LocationNotMapped: createError('Location not mapped', {
        message: 'The coordinates provided are not in any mapped location.'
    })
}
