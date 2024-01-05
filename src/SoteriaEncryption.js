//Import the crypto module
const crypto = require('crypto');

//Import the dotenv module
require('dotenv').config();

//Export the SoteriaEncryption class
module.exports = class SoteriaEncryption {

    //Constructor
    constructor() {
        //Set the iv, key, and cypher from the .env file
        // The IV length should be 16 bytes for AES-128, 24 bytes for AES-192, and 32 bytes for AES-256.
        // The key length should match the length of the cypher.
        // The cypher should be one of the following: aes-128-cbc, aes-192-cbc, aes-256-cbc
        // The cypher should match the key length.
        // The Module has been tested with AES-256-CBC
        this.iv = Buffer.from(process.env.CRYPT_IV, 'utf-8');
        this.key = Buffer.from(process.env.CRYPT_KEY, 'utf-8');
        this.cypher = process.env.CRYPT_CIPHER;
    }

    encrypt(data) {

        //If the data is an array or object, serialize it to a string. Otherwise, convert it to a string.
        const serializedData = (Array.isArray(data) || typeof data === 'object') ? this.serialize(data) : data.toString();

        //Encrypt the serialized data
        const encrypted = this.encryptValue(serializedData);

        //Convert the iv to a base64 string
        const iv = btoa(this.iv);

        //Calculate the MAC (Message Authentication Code)
        const mac = this.calculateMac(iv, encrypted);

        //Create the payload object
        const payload = {
            iv: iv,
            value: encrypted,
            mac: mac,
        };

        //Return the payload as a base64 string
        return btoa(JSON.stringify(payload));
    }

    encryptValue(data) {
        //Create a cipher using the cypher, key, and iv
        const cipher = crypto.createCipheriv(this.cypher, this.key, this.iv);

        //Encrypt the data
        let encrypted = cipher.update(data, 'utf-8', 'base64');

        //Finalize the encryption
        encrypted += cipher.final('base64');

        //Return the encrypted data
        return encrypted.toString();
    }

    calculateMac(iv, value) {
        //Create a hash using the key and iv
        return crypto.createHmac('sha256', this.key).update(iv + value).digest('hex');
    }

    decrypt(encrypted) {

        // Convert the encrypted data to a JSON object
        const payload = this.getJsonPayload(encrypted);

        // Convert the iv to a string and decode it from base64
        let iv = atob(payload.iv);

        // Decrypt the data
        try {
            return this.decryptValue(payload.value, iv);
        } catch (e) {
            // If the data cannot be decrypted, return the exception
            this.dd('Could not decrypt the data.' + e.toString());
        }
    }

    // Decrypt the data
    decryptValue(encryptedData, iv) {
        // Create a decipher using the cypher, key, and iv
        const decipher = crypto.createDecipheriv(this.cypher, this.key, this.iv);

        // Decrypt the data
        let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');

        // Finalize the decryption
        decrypted += decipher.final('utf-8');

        // Return the decrypted data
        return decrypted;
    }

    // Convert the encrypted data to a JSON object
    getJsonPayload(data) {

        // Check if the data is a string
        if (typeof data !== 'string') {
            // If the data is not a string, return an error
            this.dd('Invalid Payload');
        }

        // Decode the data from base64 and convert it to a JSON object
        const decoded = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

        // Check if the payload is valid and return an error if it is not
        if (!this.validPayload(decoded)) {
            this.dd('Invalid Payload.');
        }

        // Check if the MAC is valid and return an error if it is not
        if (!this.validMac(decoded)) {
            this.dd('The MAC is invalid.');
        }

        // Return the decoded data
        return decoded;
    }

    // Check if the payload is valid
    validPayload(payload) {

        if (typeof payload !== 'object' || Array.isArray(payload)) {
            return false;
        }

        // Check if the payload has the required fields
        const requiredFields = ['iv', 'value', 'mac'];

        // Check if the payload has the required fields and if the fields are strings
        for (const item of requiredFields) {
            if (!payload.hasOwnProperty(item) || typeof payload[item] !== 'string') {
                return false;
            }
        }

        // Check if the iv is valid
        return atob(payload.iv).length === 16;
    }

    // Check if the MAC is valid
    validMac(payload) {
        return this.calculateMac(btoa(this.iv), payload.value) === payload.mac;
    }

    // Serialize the data to a string
    serialize(data) {
        return JSON.stringify(data);
    }

    // Log an error
    dd(data) {
        return console.error(data);
    }

}