'use strict'
// declare the formify function
let formify;
(function () {
	// events on form submit and when we get a response
	let submitEvt = new Event ('form-submit');
	formify = (element) => {
		// get any relevant input field with a name
		let inputs = Array.from (element.querySelectorAll ('select[name],input[name],textarea[name]'));
		// get the submit button
		let submit = element.querySelector ('button[type="submit"],input[type="submit"]');
		// get path from the element, every formdata is a post and enctype is multipart/form-data
		let path = element.getAttribute ('action');
		// attach events
		element.addEventListener ('form-submit', function () {
			// setup the request
			let xhr = new XMLHttpRequest ();
			xhr.open ('POST', path);
			xhr.addEventListener ('load', function () {
				// custom event with detail of the xhr response
				let responseEvt = new CustomEvent ('form-submit-response', {
					detail: xhr.response
				});
				element.dispatchEvent (responseEvt);
			});
			// start collecting form data
			let data = new FormData ();
			inputs.forEach ((input) => {
        // file case
				if (input.type === 'file') {
					// multiple files
					if (input.files.length > 1) {
						input.files.forEach ((file) => {
							data.append (input.name, file, file.name);
						});
					// single file
					} else if (input.files.length !== 0) {
						data.append (input.name, input.files [0], input.files [0].name);
          }
				} else {
					data.append (input.name, input.value);
        }
			});
			// send the form data
			xhr.send (data);
		}, false);
		// the submit button triggers the form-submit
		submit.addEventListener ('click', () => {
			element.dispatchEvent (submitEvt);
		});
	}
	// formiify all requested
  Array.from (document.querySelectorAll ('[formify]')).forEach ((form) => {
    formify (form);
  })
}) ();