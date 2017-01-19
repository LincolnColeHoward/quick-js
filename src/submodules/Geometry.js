'use strict'
// import and symbols
/**
  * Geometry objects depend on position.
  */
let Position = require ('./Position');
/**
  * Symbol to abstract type
  */
let TYPE = Symbol ();
/**
  * Symbol to abstract coordinates
  */
let POS = Symbol ();
/**
  * Abstract type representing GeoJSON objects. rfc7946 (GeoJSON) Section 3
  * 
  * @Interface
  */
class Geometry {
  /** 
    * Geometry constructor sets type and an empty position.
    * 
    * @param {String} type The type of GeoJSON object it is. These are listed in rfc7946 (GeoJSON) Section 3.1
    */
  constructor (type="") {
    this [TYPE] = type;
    this [POS] = new Position ();
  }
  /** accessor for type attribute */
  get type () {
    return this [TYPE];
  }
  /** @override */
  toJSON () {
    return {
      type: this [TYPE],
      coordinates: this [POS].toJSON ()
    }
  }
}
/** attach the symbol for coordinates staticly to Geometry interface */
Geometry.coordinates = POS;
/** export the geometry interface */
module.exports = Geometry;