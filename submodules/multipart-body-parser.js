'use strict'
// imports
let Busboy = require ('busboy');
// on file data callback provided the object to add to
function onfiledata (body, fieldname, filename) {
	let complete = Buffer.alloc (0);
	return {
		// callback for file on data, just concatenate data to buffer
		ondata: function (data) {
			complete = Buffer.concat ([complete, data]);
		},
		// callback for when the form is complete
		fin: function () {
			// check what we are adding to
			if (Array.isArray (body [fieldname]))
				// add to array
				return body [fieldname].push ({
					name: filename,
					data: complete
				});
			// add to object
			body [fieldname] = {
				name: filename,
				data: complete
			}
		}
	}
}
// on fields
function onfielddata (body, fieldname, value) {
	return {
		fin: function () {
			if (Array.isArray (body [fieldname]))
				return body [fieldname].push (value);
			body [fieldname] = value;
		}
	}
}
// when everything is done
function onfinishload (body, fields, fins, next) {
	return function () {
		// map to count the number of times each field occurs
		let map = new Map ();
		// iterate over each field
		fields.forEach ((field) => {
			// either increment occurences or set it to 0		
			if (map.has (field)) return map.set (field, map.get (field) + 1);
			map.set (field, 0);
		});
		// iterate over k/v in map
		map.forEach ((v, k) => {
			// only for v not zero, make an array
			if (v) body [k] = [];
		});
		// now call all finish methods
		fins.forEach ((fn) => {fn ()});
		next ();
	}
}

module.exports = function (req, res, next) {
	// busboy instance
	let busboy = new Busboy ({headers: req.headers});
	// verify body exists
	if (!req.body)
		req.body = {};
	// fields and finish functions
	let fields = [];
	let fins = [];
	// file events
	busboy.on ('file', (fieldname, file, filename) => {
		fields.push (fieldname);
		let callbacks = onfiledata (req.body, fieldname, filename);
		file.on ('data', callbacks.ondata);
		file.on ('end', () => {fins.push (callbacks.fin)});
	});
	// field events
	busboy.on ('field', (fieldname, value) => {
		fields.push (fieldname);
		fins.push (onfielddata (req.body, fieldname, value).fin);
	});
	// done!
	busboy.on ('finish', onfinishload (req.body, fields, fins, next));
	req.pipe (busboy);
}