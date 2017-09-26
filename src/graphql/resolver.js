const merge = require('lodash').merge

const UserResolvers = require('./types/user/resolver').resolvers

const resolvers = merge(UserResolvers)

module.exports = {
  resolvers
}