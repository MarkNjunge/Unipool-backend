const {Geolocation} = require('../../../database/models/')
const resolvers = {
    Query: {
        getRegion(_, args) {
            return Geolocation.getRegion(args)
        }
    }
}

module.exports = {
    resolvers
}