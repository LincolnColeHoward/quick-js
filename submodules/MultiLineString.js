'use strict'
// imports
let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.position;
// line string
class MultiLineString extends Geometry {

  constructor () {
    super ('MultiLineString');
  }

  add (element, position_index) {
    let isCoord = !!position_index && element instanceof Coordinate;
    let isPosition = !position_index && element instanceof Position;
    if (isCoord) this [POS].at (position_index).add (element);
    if (isPosition) this [POS].add (element);
  }

  remove (element, position_index) {
    let isCoord = !!position_index && element instanceof Coordinate;
    let isPosition = !position_index && element instanceof Position;
    if (isCoord) this [POS].at (position_index).remove (element);
    if (isPosition) this [POS].remove (element);
  }

  at (position_index, coord_index) {
    return this [POS].at (position_index).at (coord_index);
  }

}