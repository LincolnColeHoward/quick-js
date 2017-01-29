'use strict'
let express = require ('express');
let app = express ();
app.use (express.static ('src/client side'));
app.get ('/', (req, res) => {
  res.set ('Content-Type', 'text/html');
  res.send ('<html><script src="/path.js"></script>Welcome to the playground!</html>');
})
app.listen (8080);