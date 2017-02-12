let types = {
  Point: require ('./Point'),
  MultiPoint: require ('./MultiPoint'),
  LineString: require ('./LineString'),
  MultiLineString: require ('./MultiLineString'),
  Polygon: require ('./Polygon'),
  Feature: require ('./Feature')
}
let POS = require ('./Geometry').coordinates;
let Position = require ('./Position');
class GeoParser {
  static parse (obj) {
    if (typeof obj === 'string' || obj instanceof String)
      obj = JSON.parse (obj);
    let type = types [obj.type];
    let ret = new type ();
    if (obj.type === 'Feature') {
      console.log (obj.geometry);
      ret.geometry = GeoParser.parse (obj.geometry);
    } else {
      ret [POS] = Position.parse (obj.coordinates);
    }
    return ret;
  }
}

module.exports = GeoParser;