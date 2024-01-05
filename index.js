let SoteriaCrypt = require("./src/SoteriaEncryption.js");

let soteriaCrypt = new SoteriaCrypt();

console.log(soteriaCrypt.encrypt('Hello World'));
console.log(soteriaCrypt.decrypt('eyJpdiI6IlJXOUZlV3B0V21KcVkzbFpaMlZKVmc9PSIsInZhbHVlIjoiRGhrRlhoaTVQOHdPVWhxNEtsVXFjdz09IiwibWFjIjoiNmQ4M2M2NDI4MmVmMDA3YTMzODE3YjBhMzdhMzE5ZTBhODk4ZDNkM2MxY2EwNWVlOTE3YTU3YWU1Njk4OWI5YiJ9'));
