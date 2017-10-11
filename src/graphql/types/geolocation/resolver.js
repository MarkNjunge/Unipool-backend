const {geolocation} = require('../../../database/models/geolocation');
const resolvers = {
  Query: {
    getRegion(_, args) {
      return geolocation.getRegion(args);
    }
  }
}

module.exports = {
  resolvers
}