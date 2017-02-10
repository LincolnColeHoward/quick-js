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