'use strict'
// a list of the modules
let submodules = {
	'less-live-load': require ('./src/submodules/less-live-load'),
	'form-data-body-parser': require ('./src/submodules/multipart-body-parser'),
  'geo-json': require ('./src/submodules/GeoJSON'),
  'join-js': require ('./src/submodules/join-js'),
  'client-library': require ('express').static ('src/client side')
}
// submodule loader function
module.exports = function Quick (submodule) {
	return submodules [submodule];
}