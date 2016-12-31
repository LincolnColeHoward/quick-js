'use strict'
let Coordinate = require ('./Coordinate');
let arr = Symbol ();
// a set of coordinates
class Position {
  constructor () {
    this [arr] = [];
  }
  // append a coordinate to a position index
  // if no position is provided, assume 0
  add (coord, position) {
    let pos = !!position;
    if (coord instanceof Coordinate) {
      if (pos) {
        this [arr][pos].push (coord);
      } else {
        this [arr].push (coord);
      }
    } else if (coord instanceof Position) {
      this [arr].push (coord);
    } else {
      throw new Error ('added points must be "coordinate" or "position" type');
    }
  }
  // remove all instances of provided coordinate in a position
  remove (coord) {
    if (coord instanceof Coordinate) {
      for (let i = 0; i < this.length; i++)
        if (coord.equals (this [i]))
          this.splice (i, 1);
    } else {
      throw new Error ('can only remove "coordinate" or "position" types');
    }
  }

  toJSON () {
    if (this [arr].length === 1 && this [arr] [0] instanceof Coordinate)
      return this [arr] [0].toJSON ();
    let ret = [];
    this [arr].forEach ((el) => {
      ret.push (el.toJSON ());
    });
    return ret;
  }
}

module.exports = Position