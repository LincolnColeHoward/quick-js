'use strict'
// a list of the modules
let submodules = {
	'less-live-load': require ('./less-live-load')
}
// submodule loader function
module.exports = function Quick (submodule) {
	return submodules [submodule];
}