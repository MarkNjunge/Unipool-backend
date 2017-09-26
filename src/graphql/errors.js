const createError = require('apollo-errors').createError

module.exports = {
  BasicError: createError('Error', {
    message: 'An error has ocurred'
  })
}