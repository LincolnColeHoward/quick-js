(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/**
  * A GeoJSON wrapper for browser geolocation api.
  * @param {Function} cb Handle 
  */

function geo(cb) {
  navigator.geolocation.getCurrentPosition(position => {
    cb(null, new Point(position.coords.longitude, position.coords.latitude));
  }, () => {
    cb('error');
  });
}

module.exports = geo;

},{}],2:[function(require,module,exports){
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
  constructor(longitude = 0, latitude = 0) {
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
  toRadians() {
    return {
      longitude: this.longitude * math.pi / 180,
      latitude: this.latitude * math.pi / 180
    };
  }
  /**
    * Equivalence test between coordinates.
    * 
    * @param {Coordinate} RHS The coordinate to compare to.
    * @return {boolean} True if the coordinates are equal.
    */
  equals(RHS) {
    if (!(RHS instanceof Coordinate)) return false;
    return this.longitude === RHS.longitude && this.latitude === RHS.latitude;
  }
  /** @override */
  toJSON() {
    return [this.longitude, this.latitude];
  }
  toString() {
    return JSON.stringify(this, null, '  ');
  }
}
module.exports = Coordinate;

},{}],3:[function(require,module,exports){
(function (global){
global.Point = require('./Point');
global.MultiPoint = require('./MultiPoint');
global.LineString = require('./LineString');
global.MultiLineString = require('./MultiLineString');
global.Polygon = require('./Polygon');
global.geo = require('../client side/geolocation');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../client side/geolocation":1,"./LineString":5,"./MultiLineString":6,"./MultiPoint":7,"./Point":8,"./Polygon":9}],4:[function(require,module,exports){
/**
  * Geometry objects depend on position.
  */
let Position = require('./Position');
/**
  * Symbol to abstract type
  */
let TYPE = Symbol();
/**
  * Symbol to abstract coordinates
  */
let POS = Symbol();
/**
  * Abstract type representing GeoJSON objects. rfc7946 (GeoJSON) Section 3
  * 
  * @Interface
  */
class Geometry {
  /** 
    * Geometry constructor sets type and an empty position.
    * 
    * @param {String} type The type of GeoJSON object it is. These are listed in rfc7946 (GeoJSON) Section 3.1
    */
  constructor(type = "") {
    this[TYPE] = type;
    this[POS] = new Position();
  }
  /** accessor for type attribute */
  get type() {
    return this[TYPE];
  }
  /**
    * Method comparing two Geometries for equality.
    * 
    * @param {Geometry} RHS The geometry to compare to.
    * @return {boolean} True if they are equal, otherwise false.
    */
  equals(RHS) {
    if (this[TYPE] !== RHS[TYPE]) return false;
    return this[POS].equals(RHS[POS]);
  }
  /**
    * @override
    * @return {Geometry} An object containing a type and position. 
    */
  toJSON() {
    return {
      type: this[TYPE],
      coordinates: this[POS].toJSON()
    };
  }
  toString() {
    return JSON.stringify(this, null, '  ');
  }
}
/** 
  * attach the symbol for coordinates staticly to Geometry interface
  * @property
  */
Geometry.coordinates = POS;
module.exports = Geometry;

},{"./Position":10}],5:[function(require,module,exports){
let Coordinate = require('./Coordinate');
let Geometry = require('./Geometry');
let POS = Geometry.coordinates;
let Point = require('./Point');
/**
  * Implementation of rfc7946 (GeoJSON) Section 3.1.4
  * 
  * LineStrings are multiple coordinate geometry objects that form a line.
  */
class LineString extends Geometry {
  /**
    * LineStrings need a minimum of two coordinates.
    * 
    * @param {Array <Coordinate|Point>} arguments All arguments are parsed and added. All must be
    * coordinate type and at least two must be present.
    * @throws {Error} Throws error when less than two arguments are provided.
    * @throws {TypeError} Throws error when constructor argument is not Coordiante or Point type
    */
  constructor() {
    super('LineString');
    if (arguments.length < 2) throw new Error('LineString constructor requires at least two arguments');
    Array.from(arguments).forEach(coord => {
      this.add(coord);
    });
  }
  /**
    * Add another coordinate to the line
    * 
    * @param {Coordinate|Point} coord The coordinate to add.
    */
  add(coord) {
    if (coord instanceof Point) {
      this[POS].add(coord.toCoordinate());
    } else {
      throw new TypeError('LineString can only add Coordinate or Point type');
    }
  }
}
module.exports = LineString;

},{"./Coordinate":2,"./Geometry":4,"./Point":8}],6:[function(require,module,exports){
let Coordinate = require('./Coordinate');
let Geometry = require('./Geometry');
let POS = Geometry.coordinates;
let LINES = Symbol();
let LineString = require('./LineString');
let Position = require('./Position');
/**
  * Implementation of rfc7946 (GeoJSON) Section 3.1.5
  * 
  * MultiLineStrings are multiple coordinate array geometry objects that form lines.
  */
class MultiLineString extends Geometry {
  /**
    * MultiLineStrings can be created with any number of LineStrings.
    * 
    * @param {Array <LineString>} arguments All arguments are parsed and added. All must be
    * coordinate type and at least two must be present.
    */
  constructor() {
    super('MultiLineString');
    this[LINES] = [];
    Array.from(arguments).forEach(line => {
      this.add(line);
    });
  }
  /**
    * Add a line to the list
    * 
    * @param {LineString} line The line to add.
    */
  add(line) {
    if (line instanceof LineString) this[LINES].push(line);
    this.update();
  }
  /**
    * Remove a line from the list.
    * 
    * @param {LineString} line The line to remove.
    */
  remove(line) {
    for (let i = 0; i < this[LINES].length; i++) if (line.equals(this[LINES][i])) this[LINES].splice(i, 1);
    this.update();
  }
  /**
    * Update this object with the correct positions.
    */
  update() {
    this[POS] = new Position();
    this[LINES].forEach(line => {
      this[POS].add(line[POS]);
    });
  }
}
module.exports = MultiLineString;

},{"./Coordinate":2,"./Geometry":4,"./LineString":5,"./Position":10}],7:[function(require,module,exports){
let Coordinate = require('./Coordinate');
let Geometry = require('./Geometry');
let POS = Geometry.coordinates;
let Point = require('./Point');
/**
	* Implementation of rfc7946 (GeoJSON) Section 3.1.3
	*/
class MultiPoint extends Geometry {
	/**
 	* Arguments list is parsed and added.
 	* 
 	* @param {Array <Coordinate|Point>} [arguments] All arguments are added.
    * @throws {TypeError} Throws error when constructor argument is not Coordiante type
 	*/
	constructor() {
		super('MultiPoint');
		Array.from(arguments).forEach(coord => {
			this.add(coord);
		});
	}
	/**
 	* Retrtieve a single Point at a specific index.
 	* 
 	* @param {Number} index The point to select.
 	*	@return {Point} The found point.
 	*/
	at(index) {
		return this[POS].at(index);
	}
	/**
 	* Adds a Coordinate or Point to this.
 	* 
 	* @param {Point} coord The Point to add.
    * @throws {TypeError} Throws error when constructor argument is not Point type
 	*/
	add(coord) {
		if (coord instanceof Point) {
			this.add(coord.toCoordinate());
		} else {
			throw new TypeError('MultiPoint can only add Coordinate or Point type');
		}
	}
	/**
 	* Remove a coordinate or point from this.
 	* 
 	* @param {Coordinate|Point} coord The coordinate to remove.
 	*/
	remove(coord) {
		if (coord instanceof Coordinate) this[POS].remove(coord);
	}
}
module.exports = MultiPoint;

},{"./Coordinate":2,"./Geometry":4,"./Point":8}],8:[function(require,module,exports){
let Coordinate = require('./Coordinate');
let Geometry = require('./Geometry');
let POS = Geometry.coordinates;
/**
	* Implementation of rfc7946 (GeoJSON) Section 3.1.2
	* 
	* Points are single coordinate geometry objects.
	*/
class Point extends Geometry {
	/**
 	* Initializes the longitude and latitude.
 	* 
 	*	@param {number} [longitude=0] The initial longitude.
 	*	@param {number} [latitude=0] The initial latitude.
 	*/
	constructor(longitude = 0, latitude = 0) {
		super('Point');
		this[POS].add(new Coordinate(longitude, latitude));
	}
	/**
 	* get longitude
 	*/
	get longitude() {
		return this[POS].at(0).longitude;
	}
	/**
 	* set longitude
 	*/
	set longitude(value) {
		this[POS].at(0).longitude = value;
	}
	/**
 	* set latitude
 	*/
	get latitude() {
		return this[POS].at(0).latitude;
	}
	/**
 	* set latitude
 	*/
	set latitude(value) {
		this[POS].at(0).latitude = value;
	}
	/**
 	* Return this point as a Coordinate type.
 	* 
 	* @return {Coordinate} This point as a coordinate type.
 	*/
	toCoordinate() {
		return new Coordinate(this.longitude, this.latitude);
	}
}
module.exports = Point;

},{"./Coordinate":2,"./Geometry":4}],9:[function(require,module,exports){
let Coordinate = require('./Coordinate');
let Geometry = require('./Geometry');
let POS = Geometry.coordinates;
let Position = require('./Position');
let Point = require('./Point');
let coords = Symbol();
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
  constructor() {
    super('Polygon');
    this[coords] = [];
    Array.from(arguments).forEach(coord => {
      this.add(coord);
    });
  }
  /**
    * Add a point to the polygon.
    * @override
    * @param {Point} point The Point to add.
    */
  add(point) {
    this[coords].push(point);
    this.update();
  }
  /**
    * 
    */
  remove(point) {
    if (!(point instanceof Point)) return;
    for (let i = 0; i < this[coords].length; i++) if (point.equals(this[coords][i])) {
      this[coords].splice(i, 1);
      return update();
    }
  }
  /**
    * Update the coordinates in the polygon.
    */
  update() {
    if (this[coords].length < 3) return;
    this[POS] = new Position();
    this[coords].forEach(point => {
      this[POS].add(point.toCoordinate());
    });
    this[POS].add(this[coords][0].toCoordinate());
  }
}

module.exports = Polygon;

},{"./Coordinate":2,"./Geometry":4,"./Point":8,"./Position":10}],10:[function(require,module,exports){
let Coordinate = require('./Coordinate');
let arr = Symbol();
/**
  * Implementation of rfc7946 (GeoJSON) Section 3.1.1
  * 
  * A position is an abstract, list-like structure
  * conatining coordinates or other position objects.
  * A Position can represent the coordinates attribute
  * of any GeoJSON geometry object.
  */
class Position {
  /**
    * Initializes the array, ignores all arguments.
    */
  constructor() {
    this[arr] = [];
  }
  /**
    * Adds a coordinate or position at an optionally provided position index.
    * 
    * @param {Coordinate|Position} coordinate The coordinte object to add.
    * @param (Number) [position] Index of the position object to add it to.
    * @returns {Position} Returns 'this' object
    * @throws {Error} If coordinate argument is not a valid type.
    */
  add(coordinate, position) {
    let pos = !!position;
    if (coordinate instanceof Coordinate) {
      if (pos) {
        this[arr][pos].push(coordinate);
      } else {
        this[arr].push(coordinate);
      }
    } else if (coordinate instanceof Position) {
      if (pos) {
        this[arr][pos].push(coordinate);
      } else {
        this[arr].push(coordinate);
      }
    } else {
      throw new Error('added points must be "coordinate" or "position" type');
    }
    return this;
  }
  /**
    * Removes the first instance found of the provided Coordinate or Position.
    * 
    * @param {Coordinate|Position} coordinate The element to remove.
    * @return {Position} Returns 'this' object
    */
  remove(coordinate) {
    if (coordinate instanceof Coordinate || coordinate instanceof Position) {
      for (let i = 0; i < this.length; i++) if (coordinate.equals(this[i])) {
        this[arr].splice(i, 1);
        return this;
      }
    } else {
      throw new Error('can only remove "coordinate" or "position" types');
    }
    return this;
  }
  /**
    * Access the element at the provided index.
    * 
    * @param {Number} index The index to access.
    * @returns {Coordinate|Position} The element found.
    */
  at(index) {
    return this[arr][index];
  }
  /**
    * Checks if the provided element is in this Position.
    * 
    * @param {Coordinate|Position} element The element to look for.
    * @return {boolean} Whether the element is in this Position.
    */
  has(element) {
    if (!(element instanceof Coordinate || element instanceof Position)) throw new Error('provided argument must be Coordinate or Position type');
    this[arr].forEach(_this => {
      if (element.equals(_this)) return true;
    });
  }
  /**
    * Get the Number of elements in this Position.
    * This is a one-dimensional search
    * and does not count sub-position coordinates or positions
    * 
    * @returns {Number} The size of this Position.
    */
  size() {
    return this[arr].length;
  }
  /**
    * Check equality of this position and another position.
    * Compares all coordinates and sub-coordinates.
    * 
    * @param {Position} position The position to compare against.
    * @returns {boolean} True if all coordinates and sub-coordinates are equal.
    */
  equals(position) {
    if (!(position instanceof Position)) return false;
    if (this.size() !== position.size()) return false;
    for (let i = 0; i < this.size(); i++) if (!this.at(i).equals(position.at(i))) return false;
    return true;
  }
  /**
    * @override
    */
  toJSON() {
    if (this[arr].length === 1 && this[arr][0] instanceof Coordinate) return this[arr][0].toJSON();
    let ret = [];
    this[arr].forEach(el => {
      ret.push(el.toJSON());
    });
    return ret;
  }
  toString() {
    return JSON.stringify(this, null, '  ');
  }
}

module.exports = Position;

},{"./Coordinate":2}]},{},[3]);
