'use strict'
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.coordinates;
let LINES = Symbol ();
let LineString = require ('./LineString');
let Position = require ('./Position');
/**
  * Implementation of rfc7946 (GeoJSON) Section 3.1.5
  * 
  * MultiLineStrings are multiple coordinate array geometry objects that form lines.
  */
class MultiLineString extends Geometry {
  /**
    * MultiLineStrings can be created with any number of LineStrings.
    * 
    * @param {Array <LineString>} arguments All arguments are parsed and added. All must be
    * coordinate type and at least two must be present.
    */
  constructor () {
    super ('MultiLineString');
    this [LINES] = [];
    Array.from (arguments).forEach ((line) => {
      this.add (line);
    });
  }
  /**
    * Add another coordinate to the line
    * 
    * @param {LineString} coord The coordinate to add.
    */
  add (line) {
    if (line instanceof LineString)
      this [LINES].push (line);
  }
  /**
    * Update this object with the correct positions.
    */
  update () {
    this [POS] = new Position ();
    this [LINES].forEach ((line) => {
      this [POS].add (line [POS]);
    });
  }
}
module.exports = MultiLineString