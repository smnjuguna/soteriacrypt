# SoteriaCrypt

[![npm version](https://badge.fury.io/js/cryptjssoteria.svg)](https://badge.fury.io/js/soteriacrypt)

soteriacrypt is an NPM package that provides encryption and decryption functionality using the AES-256-CBC algorithm.

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