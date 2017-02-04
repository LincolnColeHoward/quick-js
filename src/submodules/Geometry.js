let Position = require ('./Position');
let TYPE = Symbol ();
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
  /**
    * Method comparing two Geometries for equality.
    * 
    * @param {Geometry} RHS The geometry to compare to.
    * @return {boolean} True if they are equal, otherwise false.
    */
  equals (RHS) {
    if (this [TYPE] !== RHS [TYPE]) return false;
    return this [POS].equals (RHS [POS]);
  }
  /**
    * @override
    * @return {Geometry} An object containing a type and position. 
    */
  toJSON () {
    return {
      type: this [TYPE],
      coordinates: this [POS].toJSON ()
    }
  }
  toString () {
    return JSON.stringify (this, null, '  ');
  }
}
/** 
  * attach the symbol for coordinates staticly to Geometry interface
  * @property
  */
Geometry.coordinates = POS;
module.exports = Geometry;