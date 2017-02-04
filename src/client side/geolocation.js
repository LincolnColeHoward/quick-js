'use strict'
/**
  * A GeoJSON wrapper for browser geolocation api.
  * @param {Function} cb Handle 
  */
function geo (cb) {
  navigator.geolocation.getCurrentPosition ((position) => {
    cb (null, new Point (position.coords.longitude, position.coords.latitude));
  }, () => {
    cb ('error');
  });
}

module.exports = geo;