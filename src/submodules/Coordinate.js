'use strict'
let math = require ('mathjs');
let bignumber = math.bignumber;
let add = math.add;
let sub = math.subtract;
let div = math.divide;
let mul = math.multiply;
let latt = Symbol ();
let long = Symbol ();
// convert long/latt to theta/phi
function toRadians (coord) {
  return [coord [long] * math.pi / 180, coord [latt] * math.pi / 180]
}
// a coordinate is a 2 point array
class Coordinate {
  // setup one coordinate
  constructor (longitude = 0, lattitude = 0) {
    this [long] = longitude;
    this [latt] = lattitude;
  }
  // getters and setters
  get longitude () {
    return this [long];
  }
  set longitude (value) {
    this [long] = value;
  }
  get lattitude () {
    return this [latt];
  }
  set lattitude (value) {
    this [latt] = value;
  }
  // calulates the distance between two coordinates
  // distance on unit circle (aka radians)
  // haverstein distance formula
  unitDistance (point) {
    let p1_rad = toRadians (this);
    let p2_rad = toRadians (point);
    let delta_longitude = p1_rad [0] - p2_rad [0];
    let delta_lattitude = p1_rad [1] - p2_rad [1];
    let temp = math.pow (math.sin (delta_longitude / 2), 2);
    temp *=  math.cos (p1_rad [1]) * math.cos (p2_rad [1]);
    temp += math.pow (math.sin (delta_lattitude / 2), 2);
    return math.atan2 (math.sqrt (temp), math.sqrt (1 - temp));
  }
  // true if equal.. otherwise false
  equals (RHS) {
    if (!(RHS instanceof Coordinate)) return false;
    return this [long] === RHS [long] && this [latt] === RHS [latt];
  }

  toJSON () {
    return [this [long], this [latt]];
  }
}
module.exports = Coordinate;