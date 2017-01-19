# quick-js
A handful of random javascript submodules.
The goal is to write 2 submodules and 5 "improvements" every week while maintaining a daily output. I try to spend 1-2 hours per day on this.

## Installation
```bash
npm install --save LincolnColeHoward/quick-js
```

## Usage
The quick-js module is a collection of submodules.
Every active submodule has an access string which can be used to retrieve it.
Quick, the main function and export from the quick-js module, takes an access string and returns the corresponding submodule.
Example:
```javascript
let quick = require ('quick-js');

let lessMiddleware = quick ('live-less-load');
```

## Submodules
| Submodule                                               | Access String               | 
| :-----------------------------------------------------: | :-------------------------: |
| Less Middleware                                         | live-less-load              |
| Mulipart Form Body Parser                               | form-data-body-parser       |
| Client Side                                             | client-library              |
| Join JS                                                 | join-js                     |
| GeoJSON [rfc7946] (https://tools.ietf.org/html/rfc7946) | geo-json                    |

### Less Middleware
```javascript
let lessMiddleware = quick ('less-live-load');

app.use ('/css', lessMiddleware ('/path/to/less/files'));
```
The export from less-live-load is a function which, provided a directory, returns the middleware.
When a request is made, trying to retrieve a css file, the same named less file is rendered and sent.
Not meant for production, just a tool to quickly prototype less!

### Mulipart Form Body Parser
```javascript
let multipart = quick ('form-data-body-parser');

app.use (multipart);
```
The export is already a complete express middleware.
It functions the same way other body-parsers do, creates req.body and adds data to it.

### Client Side
```javascript
let clientSide = quick ('client-library');

app.use ('/client-library', clientSide);
```
Simply a collection of client side scripts for convinience. Exported as express static.

### Join JS
```javascript
let join = quick ('join-js');

app.use ('/js', join ('/path/to/javascript/files'));
```
The export from join-js is a function that accepts a directory and returns the middleware.
The returned router has two routes: (/source.js and /source.min.js).
All files in the directory are joined and sent as one file.

### GeoJSON
Still on the way.