const { Manager } = require('../../../database/models')

const resolvers = {
    Mutation: {
        register(_, args) {
            return Manager.register(args.username, args.password)
        },
        login(_, args) {
            return Manager.login(args.username, args.password)
        }
    }
}

module.exports = resolvers
