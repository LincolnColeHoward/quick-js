'use strict'
// import and symbols
let Position = require ('./Position');
let TYPE = Symbol ();
let POS = Symbol ();
class Geometry {
  // defualt for any geometry object
  constructor (type) {
    this [TYPE] = type;
    this [POS] = new Position ();
  }
  // accessor for type attribute
  get type () {
    return this [TYPE];
  }
  // override the toJSON to actually do what we want!
  toJSON () {
    return {
      type: this [TYPE],
      coordinates: this [POS].toJSON ()
    }
  }
}

module.exports = Geometry;