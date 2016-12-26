'use strict'
// a list of the modules
let submodules = {
	'less-live-load': require ('./submodules/less-live-load'),
	'form-data-body-parser': require ('./submodules/multipart-body-parser')
}
// submodule loader function
module.exports = function Quick (submodule) {
	return submodules [submodule];
}