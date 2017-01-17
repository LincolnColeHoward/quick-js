'use strict'
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.coordinates;
/**
	* Implementation of rfc7946 (GeoJSON) Section 3.1.2
	* 
	* Points are single coordinate geometry objects.
	*/
class Point extends Geometry {
	/**
		* Initializes the longitude and lattitude.
		* 
		*	@param {number} [longitude=0] The initial longitude.
		*	@param {number} [lattitude=0] The initial lattitude.
		*/
	constructor (longitude = 0, lattitude = 0) {
		super ('Point');
		this [POS].add (new Coordinate (longitude, lattitude));
	}
	get longitude () {
		return this [POS].at (0).longitude;
	}
	set longitude (value) {
		this [POS].at (0).longitude = value;
	}
	get lattitude () {
		return this [POS].at (0).lattitude;
	}
	set lattitude (value) {
		this [POS].at (0).lattitude = value;
	}
}

module.exports = Point;