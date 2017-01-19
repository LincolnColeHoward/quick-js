'use strict'
// imports
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.position;
// MultiPoint
class MultiPoint extends Geometry {
  // constructor override adds all coordinate arguments
  constructor () {
    super ('MultiPoint');
    Array.from (arguments).forEach ((coord) => {
      if (coord instanceof Coordinate)
        this [POS].add (coord);
    });
  }
  add () {
    Array.from (arguments).forEach ((coord) => {
      if (coord instanceof Coordinate)
        this [POS].add (coord);
    });
  }
  remove (coord) {
    this [POS].remove (coord);
  }
  at (index) {
    return this [POS].at (index);
  }
}

module.exports = MultiPoint;