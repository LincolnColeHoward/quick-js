'use strict'
// create a point
let Geometry = require ('./Geometry');
let POS = Geometry.position;
let Coordinate = require ('./Coordinate');
let coord = Symbol ();
class Point extends Geometry {

  constructor (long, latt) {
    super ('Point');
    this [coord] = new Coordinate (long, latt);
    this [POS].add (this [coord]);
  }

  set longitude (value) {
    this [coord].longitude = value;
  }
  get longitude () {
    return this [coord].longitude;
  }
  set lattitude (value) {
    this [coord].lattitude = value;
  }
  get lattitude () {
    return this [coord].lattitude;
  }

}

module.exports = Point;