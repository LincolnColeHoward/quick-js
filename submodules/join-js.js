'use strict'
// imports
let fs = require ('fs');
let path = require ('path');
let minify = require ('escompress').transform;
let express = require ('express');

module.exports = function (dir) {
	// create router
	let router = express.Router ();
	// find source directory relative to cwd
	let source = path.join (process.cwd (), dir);
	// minified source
	router.get ('/source.min.js', function (req, res) {
		// list the directory
		let files = fs.readdirSync (source);
		// write the minified file to stream
		files.forEach ((file) => {
			res.write (minify (fs.readFileSync (path.join (source, file)), {}).code);
		});
		// close!
		res.end ();
	});
	// unminified
	router.get ('/source.js', (req, res) => {
		// use strict for all
		res.write ('\'use strict\'\n');
		// list the directory
		let files = fs.readdirSync (source);
		// write the minified file to stream
		files.forEach ((file) => {
			res.write (fs.readFileSync (path.join (source, file)) + '\n');
		});
		// close!
		res.end ();
	});
	return router;
}