'use strict'
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.coordinates;
// GeoJSON MultiPoint
module.exports = class MultiPoint extends Geometry {
	constructor () {
		super ('MultiPoint');
	}
	add (coord) {
		if (coord instanceof Coordinate)
			this [POS].add (coord);
	}
	at () {

	}
	remove (coord) {
		if (coord instanceof Coordinate)
			this [POS].remove (coord);
	}
}