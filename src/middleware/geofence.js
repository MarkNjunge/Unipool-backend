"use strict";

const geolib = require('geolib');
const {geoPolyArray} = require('../../config');
module.exports = function (location) {
    let currentRegion;
    if (location.lattitude && location.longitude) {
        // run a check on the list of longitudes and longitudes in geopoly
        geoPolyArray.map(polygon => {
            if (geolib.isPointInside(location, polygon.path))
                currentRegion = polygon.area;
        });
        if (!currentRegion) {
            // message user that application is not in there region yet
        } else {
            return currentRegion;
        }
    } else {
        // inform caller of invalid location points
    }
};