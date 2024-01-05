//Generate tests for the following functions
// 1. encrypting a string
// 2. decrypting a string
// Path: test.js

const SoteriaEncryption = require("./src/SoteriaEncryption.js");
test("Test encrypting a string", () => {
    let soteriaCrypt = new SoteriaEncryption();
    expect(soteriaCrypt.encrypt("Hello World")).toBe("eyJpdiI6IlJXOUZlV3B0V21KcVkzbFpaMlZKVmc9PSIsInZhbHVlIjoiRGhrRlhoaTVQOHdPVWhxNEtsVXFjdz09IiwibWFjIjoiNmQ4M2M2NDI4MmVmMDA3YTMzODE3YjBhMzdhMzE5ZTBhODk4ZDNkM2MxY2EwNWVlOTE3YTU3YWU1Njk4OWI5YiJ9");
});

test("Test decrypting a string", () => {
    let soteriaCrypt = new SoteriaEncryption();
    expect(soteriaCrypt.decrypt("eyJpdiI6IlJXOUZlV3B0V21KcVkzbFpaMlZKVmc9PSIsInZhbHVlIjoiRGhrRlhoaTVQOHdPVWhxNEtsVXFjdz09IiwibWFjIjoiNmQ4M2M2NDI4MmVmMDA3YTMzODE3YjBhMzdhMzE5ZTBhODk4ZDNkM2MxY2EwNWVlOTE3YTU3YWU1Njk4OWI5YiJ9")).toBe("Hello World");
});
