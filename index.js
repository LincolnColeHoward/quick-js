'use strict'
// a list of the modules
let submodules = {
	'less-live-load': require ('./submodules/less-live-load'),
	'form-data-body-parser': require ('./submodules/multipart-body-parser'),
  'geo-json': {
    Geometry: require ('./submodules/Geometry'),
    Coordinate: require ('./submodules/Coordinate'),
    Position: require ('./submodules/Position')
  },
  'join-js': require ('./submodules/join-js'),
  'client-library': require ('express').static ('client side')
}
// submodule loader function
module.exports = function Quick (submodule) {
	return submodules [submodule];
}