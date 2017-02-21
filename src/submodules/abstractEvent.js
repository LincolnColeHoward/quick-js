'use strict'
let evt = Symbol ();
let dispatcher = Symbol (); 
/**
  * An es6 abstract class simulating the native javscript EventTarget interface.
  * Designed for custom/composite events.
  */
class AbstractEventTarget {
  /**
    * Initializes the event handler object.
    */
  constructor () {
    this [evt] = {};
    this [dispatcher] = (event_name, thisArg, args) => {
      if (this [evt] [event_name])
        this [evt] [event_name].forEach ((event_handler) => {
          event_handler.apply (thisArg, args);
        });
    }
  }
  /**
    * Add an event handler.
    * 
    * @param {String} event_name The name of the event to add.
    * @param {Function} event_handler The callback function.
    * Data passed into callbacks should be documented by child classes.
    */
  addEventListener (event_name, event_handler) {
    if (!this [evt] [event_name])
      this [evt] [event_name] = [];
    this [evt] [event_name].push (event_handler);
  }
  /**
    * Remove an event handler.
    * 
    * @param {String} event_name Must be the same name as the callback to remove.
    * @param {Functino} event_handler Must be the same function as the callback to remove.
    */
  removeEventListener (event_name, event_handler) {
    if (this [evt] [event_name])
      if (this [evt] [event_name].indexOf (event_handler) !== -1)
        this [evt] [event_name].splice (this [evt] [event_name].indexOf (event_handler), 1);
  }
  static dispatcher () {
    return dispatcher;
  }
}

module.exports = AbstractEventTarget;