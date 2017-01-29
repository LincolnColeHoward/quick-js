'use strict'
/**
	* Represents a uri.
	*/
class Path {
	/**
		* Joins all arguments provided to the constructor.
		*/
	constructor (initial = '') {
		/**
			* The path itself.
			*/
		this.path = initial;
	}
	/**
		* Breaks the path on '/' characters.
		* @return {Array <String>} The path split at '/' chartacters.
		*/
	segmentize () {
		return this.path.split ('/');
	}
	/**
		* Joins this path with any number of paths or strings.
		* @return {Path} A new path created from the combined paths.
		*/
	join () {
		let segments = this.segmentize ();
		Array.from (arguments).forEach ((arg) => {
			if (arg instanceof Path)
				segments = segments.concat (arg.segmentize ());
			if (typeof arg === 'string' || arg instanceof String)
				segments = segments.concat (new Path (arg).segmentize ());
		});
		// interpret meaning of segments
		let uri = [];
		segments.forEach ((segment) => {
			// could be empty, '.', '..', or have meaning
			switch (segment) {
				case '':
					if (!uri.length) uri.push (segment);
					break;
				case '.':
					break;
				case '..':
					if (uri.length) uri.pop ();
					break;
				default:
					uri.push (segment);
			}
		});
		// return the segments joined by the separator
		return new Path (uri.join ('/'));
	}
	/**
		* If any segments contain parameters, insert the porovided value into that spot.
		* 
		* @param {Object} An object for which the keys are parameters and the values are
		* the value to insert.
		* @return {Path} A new path with the parameters replaced with values.
		*/
	parameterize (params) {
		let ret = new Path ();
		this.segmentize ().forEach ((seg) => {
			ret = ret.join (Path.parameterizeSegment (seg, params));
		});
		return new Path (ret);
	}
	/**
		* Method to replace parameters of one segment.
 		* 
		* @param {String} segment One part of a path to replace.
		* @return {String} The path with replaced parameters.
		*/
	static parameterizeSegment (segment, params) {
		// find where to insert stuff, store here
		let inserts = [];
		// first index of parameter
		let pos = segment.indexOf (':');
		// loop until no more parameters are found
		while (pos !== -1) {
			// prepare delimiter as the end of line
			let delim = segment.length;
			// find the delimiter
			let dot = segment.indexOf ('.', pos + 1);
			let colon = segment.indexOf (':', pos + 1);
			let hyphen = segment.indexOf ('-', pos + 1);
			// if not found, set to infinity
			if (dot === -1) dot = Infinity;
			if (colon === -1) colon = Infinity;
			if (hyphen === -1) hyphen = Infinity;
			// select lowest number
			if (dot < delim) delim = dot;
			if (colon < delim) delim = colon;
			if (hyphen < delim) delim = hyphen;
			// set the beginning and end of each parameter
			inserts.push ({
				start: pos,
				end: delim,
				name: segment.substring (pos + 1, delim)
			});
			pos = segment.indexOf (':', pos + 1);
		}
		// segmentize the segments
		let arr = segment.split ('');
		// loop until no more inserts are needed
		while (inserts.length) {
			// get the farthest segment from 0
			let el = inserts.pop ();
			// make sure the argument is provided
			if (params [el.name]) {
				// insert the argument
				arr.splice (el.start, el.end - el.start, params [el.name]);
			}
		}
		return arr.join ('');
	}
	/** @override */
	toJSON () {
		return this.path;
	}
	/** @override */
	toString () {
		return this.path;
	}
}