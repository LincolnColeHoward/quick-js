'use strict'
let Coordinate = require ('./Coordinate');
let arr = Symbol ();
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
  constructor () {
    this [arr] = [];
  }
  /**
    * Adds a coordinate or position at an optionally provided position index.
    * 
    * @param {Coordinate|Position} coordinate The coordinte object to add.
    * @param (Number) [position] Index of the position object to add it to.
    * @returns {Position} Returns 'this' object
    * @throws {Error} If coordinate argument is not a valid type.
    */
  add (coordinate, position) {
    let pos = !!position;
    if (coordinate instanceof Coordinate) {
      if (pos) {
        this [arr][pos].push (coordinate);
      } else {
        this [arr].push (coordinate);
      }
    } else if (coordinate instanceof Position) {
      if (pos) {
        this [arr][pos].push (coordinate);
      } else {
        this [arr].push (coordinate);
      }
    } else {
      throw new Error ('added points must be "coordinate" or "position" type');
    }
    return this;
  }
  /**
    * Removes the first instance found of the provided Coordinate or Position.
    * 
    * @param {Coordinate|Position} coordinate The element to remove.
    * @return {Position} Returns 'this' object
    */
  remove (coordinate) {
    if (coordinate instanceof Coordinate || coordinate instanceof Position) {
      for (let i = 0; i < this.length; i++)
        if (coordinate.equals (this [i])) {
          this [arr].splice (i, 1);
          return this;
        }
    } else {
      throw new Error ('can only remove "coordinate" or "position" types');
    }
    return this;
  }
  /**
    * Access the element at the provided index.
    * 
    * @param {Number} index The index to access.
    * @returns {Coordinate|Position} The element found.
    */
  at (index) {
    return this [arr] [index];
  }
  /**
    * Checks if the provided element is in this Position.
    * 
    * @param {Coordinate|Position} element The element to look for.
    * @return {boolean} Whether the element is in this Position.
    */
  has (element) {
    if (!(element instanceof Coordinate || element instanceof Position))
      throw new Error ('provided argument must be Coordinate or Position type');
    this [arr].forEach ((_this) => {
      if (element.equals (_this))
        return true;
    });
  }
  /**
    * Get the Number of elements in this Position.
    * This is a one-dimensional search
    * and does not count sub-position coordinates or positions
    * 
    * @returns {Number} The size of this Position.
    */
  size () {
    return this [arr].length;
  }
  /**
    * Check equality of this position and another position.
    * Compares all coordinates and sub-coordinates.
    * 
    * @param {Position} position The position to compare against.
    * @returns {boolean} True if all coordinates and sub-coordinates are equal.
    */
  equals (position) {
    if (!(position instanceof Position)) return false;
    if (this.size () !== element.size ()) return false;
    for (let i = 0; i < this.size (); i++)
      if (!this.at (i).equals (position.at (i)));
        return false;
    return true;
  }
  /**
    * @override
    */
  toJSON () {
    if (this [arr].length === 1 && this [arr] [0] instanceof Coordinate)
      return this [arr] [0].toJSON ();
    let ret = [];
    this [arr].forEach ((el) => {
      ret.push (el.toJSON ());
    });
    return ret;
  }
}

module.exports = Position