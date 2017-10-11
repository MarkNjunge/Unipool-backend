const geolib = require('geolib')

const geoPolyArray = require('./regions')

const location1 = {
    latitude: -1.323212,
    longitude: 36.825356
}

const location2 = {
    latitude: -1.311997,
    longitude: 36.832710
}

const location3 = {
    latitude: -1.309041,
    longitude: 36.813875
}

getRegion(location1)
getRegion(location2)
getRegion(location3)

function getRegion(location) {
    let currentRegion

    // Run a check on the list of longitudes and longitudes in the geopoly array
    geoPolyArray.map(polygon => {
        if (geolib.isPointInside(location, polygon.path))
            currentRegion = polygon.area
    })

    if (!currentRegion) {
        console.log(`${location.latitude}, ${location.longitude} is outside the mapped regions.`)
        return false
    } else {
        console.log(`Lat: ${location.latitude}, Long: ${location.longitude} => ${currentRegion}`)
        return currentRegion
    }
}

module.exports = getRegion