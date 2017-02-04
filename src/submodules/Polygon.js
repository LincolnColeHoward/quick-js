let Coordinate = require ('./Coordinate');
let Geometry = require ('./Geometry');
let POS = Geometry.coordinates;
let Position = require ('./Position');
let Point = require ('./Point');
let coords = Symbol ();
/**
  * Implementation of rfc7946 (GeoJSON) Section 3.1.6
  */
class Polygon extends Geometry {
  /**
    * Arguments list is parsed and added. The first element is added as the last element.
    * Minimum 4 arguments required
    * @param {Array <Coordinate|Point>} [arguments] All arguments are added.
    * @throws {Error} Throws error when constructor argument list is smaller than 3.
    */
  constructor () {
    super ('Polygon');
    this [coords] = [];
    Array.from (arguments).forEach ((coord) => {
      this.add (coord);
    });
  }
  /**
    * Add a point to the polygon.
    * @override
    * @param {Point} point The Point to add.
    */
  add (point) {
    this [coords].push (point);
    this.update ();
  }
  /**
    * 
    */
  remove (point) {
    if (!(point instanceof Point)) return;
    for (let i = 0; i < this [coords].length; i++)
      if (point.equals (this [coords] [i])) {
        this [coords].splice (i, 1);
        return update ();
      }
  }
  /**
    * Update the coordinates in the polygon.
    */
  update () {
    if (this [coords].length < 3) return;
    this [POS] = new Position ();
    this [coords].forEach ((point) => {
      this [POS].add (point.toCoordinate ());
    });
    this [POS].add (this [coords] [0].toCoordinate ());
  }
}

module.exports = Polygon;