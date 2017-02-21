let Feature = require ('./Feature');
let features = Symbol ();
let type = Symbol ();

class FeatureCollection {
  constructor () {
    this [features] = [];
  }
  size () {
    return this [features].length;
  }
  add (feature) {
    if (feature instanceof Feature)
      this [features].push (feature)
    return this;
  }
  remove (feature) {
    if (feature instanceof Feature)
      for (let i = 0; i < this.size (); i++)
        if (feature.equals (this [features] [i]))
          this [features].splice (i, 1);
    return this;
  }
  get (index) {
    return this [features] [index];
  }
  forEach (cb) {
    this [features].forEach (cb);
  }
  toJSON () {
    return {
      type: 'FeatureCollection',
      features: this [features]
    }
  }
}

module.exports = FeatureCollection;