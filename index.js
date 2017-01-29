'use strict'
// a list of the modules
let submodules = {
	'less-live-load': require ('./src/submodules/less-live-load'),
	'form-data-body-parser': require ('./src/submodules/multipart-body-parser'),
  'geo-json': {
    Geometry: require ('./src/submodules/Geometry'),
    Coordinate: require ('./src/submodules/Coordinate'),
    Position: require ('./src/submodules/Position'),
    Point: require ('./src/submodules/Point'),
    MultiPoint: require ('./src/submodules/MultiPoint'),
    LineString: require ('./src/submodules/LineString'),
    MultiLineString: require ('./src/submodules/MultiLineString')
  },
  'join-js': require ('./src/submodules/join-js'),
  'client-library': require ('express').static ('src/client side')
}
// submodule loader function
module.exports = function Quick (submodule) {
	return submodules [submodule];
}
