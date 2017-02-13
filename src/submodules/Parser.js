let types = {
  Point: require ('./Point'),
  MultiPoint: require ('./MultiPoint'),
  LineString: require ('./LineString'),
  MultiLineString: require ('./MultiLineString'),
  Polygon: require ('./Polygon'),
  Feature: require ('./Feature'),
  FeatureCollection: require ('./FeatureCollection')
}
let POS = require ('./Geometry').coordinates;
let Position = require ('./Position');
class GeoParser {
  static parse (obj) {
    if (typeof obj === 'string' || obj instanceof String)
      obj = JSON.parse (obj);
    let type = types [obj.type];
    let ret = new type ();
    if (obj.type === 'FeatureCollection') {
      obj.features.forEach ((feature) => {
        ret.add (GeoParser.parse (feature));
      });
    } else if (obj.type === 'Feature') {
      ret.geometry = GeoParser.parse (obj.geometry);
      if (obj.bbox) {
        ret.bbox_end = new types.Point (obj.bbox.end.longitude, obj.bbox.end.latitude);
        ret.bbox_start = new types.Point (obj.bbox.start.longitude, obj.bbox.start.latitude);
      }
      if (obj.props) {
        for (let k in obj.props) {
          ret.set (k, obj.props [k]);
        }
      }
    } else {
      ret [POS] = Position.parse (obj.coordinates);
    }
    return ret;
  }
}

module.exports = GeoParser;