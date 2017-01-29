'use strict'
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.coordinates;
let Point = require ('./Point');
/**
  * Implementation of rfc7946 (GeoJSON) Section 3.1.4
  * 
  * LineStrings are multiple coordinate geometry objects that form a line.
  */
class LineString extends Geometry {
  /**
    * LineStrings need a minimum of two coordinates.
    * 
    * @param {Array <Coordinate|Point>} arguments All arguments are parsed and added. All must be
    * coordinate type and at least two must be present.
    * @throws {Error} Throws error when less than two arguments are provided.
    * @throws {TypeError} Throws error when constructor argument is not Coordiante or Point type
    */
  constructor () {
    super ('LineString');
    if (arguments.length < 2)
      throw new Error ('LineString constructor requires at least two arguments');
    Array.from (arguments).forEach ((coord) => {
      this.add (coord);
    });
  }
  /**
    * Add another coordinate to the line
    * 
    * @param {Coordinate|Point} coord The coordinate to add.
    */
  add (coord) {
    if (coord instanceof Coordinate) {
      this [POS].add (coord);
    } else if (coord instanceof Point) {
      this [POS].add (coord.toCoordinate ());
    } else {
      throw new TypeError ('LineString can only add Coordinate or Point type');
    }
  }
}
module.exports = LineString