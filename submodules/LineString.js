'use strict'
// imports
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.position;
// line string
class LineString extends Geometry {

  constructor () {
    super ('LineString');
    if (arguments.length < 2)
      throw new Error ('LineString constructor must have two coordinates arguments');
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
    if (this [POS].size === 2)
      throw new Error ('cannot remove coordinates from LineString as it must have two coordinates');
    this [POS].remove (coord);
  }

  at (index) {
    return this [POS].at (index);
  }

}