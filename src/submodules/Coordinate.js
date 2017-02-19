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
    this.longitude = longitude;
    this.latitude = latitude;
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
      longitude: this.longitude * math.pi / 180,
      latitude: this.latitude * math.pi / 180
    }
  }
  /**
    * Equivalence test between coordinates.
    * 
    * @param {Coordinate} RHS The coordinate to compare to.
    * @return {boolean} True if the coordinates are equal.
    */
  equals (RHS) {
    if (!(RHS instanceof Coordinate)) return false;
    return this.longitude === RHS.longitude && this.latitude === RHS.latitude
  }
  /** @override */
  toJSON () {
    return [this.latitude, this.longitude];
  }
  toString () {
    return JSON.stringify (this, null, '  ');
  }
}
module.exports = Coordinate;