'use strict'
let math = require ('mathjs');
let Coordinate = require ('./submodules/Coordinate');
let Position = require ('./submodules/Position');

function long () {
  return math.round (math.random () * 180000) / 1000;
}
function latt () {
  return math.round (math.random () * 90000) / 1000;
}

let pos = new Position ();
let size = math.round (math.random () * 25);
for (let i = 0; i < size; i++) {
  let pos_i = new Position ();
  pos.add (pos_i);
  for (let j = 0; j < size; j++)
    pos_i.add (new Coordinate (long (), latt ()));
}

let pos_2 = new Position ();
pos_2.add (new Coordinate (long (), latt ()));

console.log (pos_2.serialize ());