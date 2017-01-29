'use strict'
let math = require ('mathjs');
let bignumber = math.bignumber;
let add = math.add;
let sub = math.subtract;
let div = math.divide;
let mul = math.multiply;
let latt = Symbol ();
let long = Symbol ();
/**
  * Basic construct of geographic coodinates. (longitude/latitude)
  */
class Coordinate {
  /**
    * Initialize longitude and latitude.
    * 
    * @param {Number} [longitude=0] The initial longitude.
    * @param {Number} [latitude=0] The initial latitude.
    */
  constructor (longitude = 0, latitude = 0) {
    this [long] = longitude;
    this [latt] = latitude;
  }
  /**
    * Convert the longitude and latitude to radians.
    * 
    * @return {Object} value A new wrapper object.
    * @return {Number} value.longitude The longitude in radians.
    * @return {Number} value.latitude The latitude in radians.
    */
  toRadians () {
    return {
      longitude: this [long] * math.pi / 180,
      latitude: this [latt] * math.pi / 180
    }
  }
  // calulates the distance between two coordinates
  // distance on unit circle (aka radians)
  // haverstein distance formula
  unitDistance (point) {
    let p1_rad = toRadians (this);
    let p2_rad = toRadians (point);
    let delta_longitude = p1_rad [0] - p2_rad [0];
    let delta_latitude = p1_rad [1] - p2_rad [1];
    let temp = math.pow (math.sin (delta_longitude / 2), 2);
    temp *=  math.cos (p1_rad [1]) * math.cos (p2_rad [1]);
    temp += math.pow (math.sin (delta_latitude / 2), 2);
    return math.atan2 (math.sqrt (temp), math.sqrt (1 - temp));
  }
  /**
    * Equivalence test between coordinates.
    * 
    * @param {Coordinate} RHS The coordinate to compare to.
    * @return {boolean} True if the coordinates are equal.
    */
  equals (RHS) {
    if (!(RHS instanceof Coordinate)) return false;
    return this [long] === RHS [long] && this [latt] === RHS [latt];
  }
  /** @override */
  toJSON () {
    return [this [long], this [latt]];
  }
}
module.exports = Coordinate;