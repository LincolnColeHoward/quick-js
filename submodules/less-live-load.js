'use strict'
// express middleware to live reload less source
function LESSLIVELOAD (root) {
	// necessary functions
	let router = require ('express').Router ();
	let read = require ('fs').readFileSync;
	let join = require ('path').join;
	let less = require ('less');
	// get any less file as its compiled css self! 
	router.get ('/:source.css', (req, res) => {
		less.render (read (join (root, req.params.source + '.less'), 'utf-8'), (err, output) => {
			if (err) {
				console.log (err, output);
				return res.status (404);
			}
			// let em know it's css and send the compiled code
			res.set ('Content-Type', 'text/css');
			res.send (output.css);
		})
	});

	return router;
}

module.exports = LESSLIVELOAD;