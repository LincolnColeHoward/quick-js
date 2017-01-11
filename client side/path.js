'use strict'
// path methods
let path = {
	// break up arguments into the smallest segments
	segmentize: function segmentize () {
		let segments = [];
		Array.from (arguments).forEach ((arg) => {
			segments = segments.concat (arg.split ('/'));
		});
		return segments;
	},
	// build a url from a set of strings
	join: function join () {
		let segments = path.segmentize.apply (null, arguments);
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
		return uri.join ('/');
	},
	// parameterize whole uri
	parameterize: function (uri, params) {
		let ret = '';
		path.segmentize (uri).forEach ((seg) => {
			ret = path.join (ret, path.parameterizeSegment (seg, params));
		});
		return ret;
	},
	// replace parameters into uri segment
	parameterizeSegment: function (segment, params) {
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
}