# SoteriaCrypt

[![NPM Package](https://img.shields.io/npm/v/soteriacrypt.svg?style=flat-square)](https://www.npmjs.org/package/soteriacrypt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


soteriacrypt is an NPM package that provides encryption and decryption functionality using the AES-256-CBC algorithm.


## Requirements
- Node.js 19.0.0 or higher
- Jest Testing Framework

## Installation

You can install soteriacrypt using:
```bash
npm -i soteriacrypt
```
or
```bash
yarn add soteriacrypt
```

## Usage
``` javascript
let SoteriaCrypt = require("soteriacrypt");

let soteriaCrypt = new SoteriaCrypt();

//Encrypt data
let encrypted = soteriaCrypt.encrypt("Hello World");

//Decrypt data
let decrypted = soteriaCrypt.decrypt(encrypted);
```

## Testing
```bash
npm run test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
[Simon Njuguna](
https://github.com/smnjuguna)

## Contributing
Pull requests are welcome. For maj-or changes, please open an issue first to discuss what you would like to change.

## Support

If you like this project, please consider giving it a ⭐️ on [GitHub](https://github.com/smnjuguna/soteriacrypt)

