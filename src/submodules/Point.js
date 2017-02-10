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
		* Initializes the longitude and latitude.
		* 
		*	@param {number} [longitude=0] The initial longitude.
		*	@param {number} [latitude=0] The initial latitude.
		*/
	constructor (longitude = 0, latitude = 0) {
		super ('Point');
		this [POS].add (new Coordinate (longitude, latitude));
	}
	/**
		* get longitude
		*/
	get longitude () {
		return this [POS].at (0).longitude;
	}
	/**
		* set longitude
		*/
	set longitude (value) {
		this [POS].at (0).longitude = value;
	}
	/**
		* set latitude
		*/
	get latitude () {
		return this [POS].at (0).latitude;
	}
	/**
		* set latitude
		*/
	set latitude (value) {
		this [POS].at (0).latitude = value;
	}
	/**
		* Return this point as a Coordinate type.
		* 
		* @return {Coordinate} This point as a coordinate type.
		*/
	toCoordinate () {
		return new Coordinate (this.longitude, this.latitude);
	}
	/**
		* Parse either a string or json object as a point.
		* 
		* @param obj {Object|String} obj The point to parse.
		* @return {Point} The parsed point.
		*/
	static parse (obj) {
  	if (typeof obj === 'string' || obj instanceof String)
      obj = JSON.parse (obj);
    if (!obj.type === 'point') return;
    return new Point (obj.coordinates [0], obj.coordinates [1]);
	}
}
module.exports = Point;