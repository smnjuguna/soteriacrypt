
// Import the SoteriaEncryption class
let SoteriaCrypt = require("./src/SoteriaEncryption.js");

// Create a new instance of the class
let soteriaCrypt = new SoteriaCrypt();

// Encrypt a string
console.log(soteriaCrypt.encrypt('Hello World'));

// Decrypt a string
console.log(soteriaCrypt.decrypt('eyJpdiI6IlJXOUZlV3B0V21KcVkzbFpaMlZKVmc9PSIsInZhbHVlIjoiRGhrRlhoaTVQOHdPVWhxNEtsVXFjdz09IiwibWFjIjoiNmQ4M2M2NDI4MmVmMDA3YTMzODE3YjBhMzdhMzE5ZTBhODk4ZDNkM2MxY2EwNWVlOTE3YTU3YWU1Njk4OWI5YiJ9'));
