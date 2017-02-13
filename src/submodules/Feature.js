let Geometry = require ('./Geometry');
let Point = require ('./Point');
let props = Symbol ();
/**
  * Represents a GeoJSON feature.
  */
class Feature {
  /**
    * Initialize the feature with a geometry.
    * 
    * @param {Geometry} geometry The initial geometry to wrap.
    */
  constructor (geometry) {
    /**
      * The geometry object to wrap.
      */
    this.geometry = geometry;
    /**
      * The bounds for the geometry.
      */
    this.bbox = undefined;
    this [props] = {};
  }
  /**
    * Set the end corner of the bbox.
    */
  set bbox_end (point) {
    if (!(point instanceof Point)) return;
    if (!this.bbox) this.bbox = {};
    this.bbox.end = point;
  }
  /**
    * Set the start corner of the bbox.
    */
  set bbox_start (point) {
    if (!(point instanceof Point)) return;
    if (!this.bbox) this.bbox = {};
    this.bbox.start = point;
  }
  /**
    * Set a property key/value pair.
    * 
    * @param {String} k The key to set.
    * @param {Object} v The value to set.
    * @return {Feature} Returns this object.
    */
  set (k, v) {
    this [props] [k] = v;
    return this;
  }
  /**
    * Un-set a property key/value pair.
    * 
    * @param {String} k The key to un-set.
    * @return {Feature} Returns this object.
    */
  remove (k) {
    delete this [props] [k];
    return this;
  }

  get (k) {
    return this [props] [k];
  }
  /**
    * Equality comparison.
    * 
    * @param {Feature} feature The Feature to compare to.
    * @return {boolean} True if equal, otherwise false.
    **/
  equals (feature) {
    let geo = this.geometry.equals (feature.geometry);
    if (!geo) return false;
    let bbox = this.bbox.end.longitude === feature.bbox.end.longitude
      && this.bbox.end.latitude === feature.bbox.end.latitude
      && this.bbox.start.longitude === feature.bbox.start.longitude
      && this.bbox.start.latitude === feature.bbox.start.latitude;
    if (!bbox) return false;
    for (let k in this [props])
      if (feature.get (k) !== this.get (k))
        return false;
    return true;
  }
  /**
    * @override
    */
  toJSON () {
    let ret = {
      type: 'Feature',
      geometry: this.geometry.toJSON (),
      properties: this [props]
    }
    if (this.bbox)
      ret.bbox = [
        this.bbox.start.longitude,
        this.bbox.start.latitude,
        this.bbox.end.longitude,
        this.bbox.end.latitude
      ]
    return ret;
  }
  /**
    * @override
    */
  toString () {
    return JSON.stringify (this.toJSON (), null, '  ');
  }
}

module.exports = Feature;