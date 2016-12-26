# quick-js
A (soon to be!) handful of random javascript submodules.
The goal is to write 2 submodules and 5 "improvements" every week while maintaining a daily output.

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
| Submodule                   | Access String               | 
| :-------------------------: | :-------------------------: |
| Less Middleware             | live-less-load              |
| Mulipart Form Body Parser   | form-data-body-parser       |