let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.coordinates;
let Point = require ('./Point');
/**
	* Implementation of rfc7946 (GeoJSON) Section 3.1.3
	*/
class MultiPoint extends Geometry {
	/**
		* Arguments list is parsed and added.
		* 
		* @param {Array <Coordinate|Point>} [arguments] All arguments are added.
    * @throws {TypeError} Throws error when constructor argument is not Coordiante type
		*/
	constructor () {
		super ('MultiPoint');
		Array.from (arguments).forEach ((coord) => {
			this.add (coord);
		})
	}
	/**
		* Retrtieve a single Point at a specific index.
		* 
		* @param {Number} index The point to select.
		*	@return {Point} The found point.
		*/
	at (index) {
		return this [POS].at (index);
	}
	/**
		* Adds a Coordinate or Point to this.
		* 
		* @param {Point} coord The Point to add.
    * @throws {TypeError} Throws error when constructor argument is not Point type
		*/
	add (coord) {
		if (coord instanceof Point) {
			this.add (coord.toCoordinate ());
		} else {
			throw new TypeError ('MultiPoint can only add Coordinate or Point type');
		}
	}
	/**
		* Remove a coordinate or point from this.
		* 
		* @param {Coordinate|Point} coord The coordinate to remove.
		*/
	remove (coord) {
		if (coord instanceof Coordinate)
			this [POS].remove (coord);
	}
}
module.exports = MultiPoint;