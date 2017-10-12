const getRegion = require('./../../../middleware/geofence/')
const errors = require('./../../errors')

const resolvers = {
    Query: {
        getRegion(_, args) {
            const location = {
                latitude: args.latitude,
                longitude: args.longitude
            }
            
            const region = getRegion(location)

            if (!region) {
                throw new errors.LocationNotMapped
            } else {
                location.region = region
                return location
            }
        }
    }
}

module.exports = resolvers