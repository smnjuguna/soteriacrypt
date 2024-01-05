const crypto = require('crypto');
require('dotenv').config();


module.exports = class SoteriaEncryption {
    constructor() {
        this.iv = Buffer.from(process.env.CRYPT_IV, 'utf-8');
        this.key = Buffer.from(process.env.CRYPT_KEY, 'utf-8');
        this.cypher = process.env.CRYPT_CIPHER;
    }

    encrypt(data) {
        const serializedData = (Array.isArray(data) || typeof data === 'object') ? this.serialize(data) : data.toString();
        const encrypted = this.encryptValue(serializedData);

        const iv = btoa(this.iv);

        const mac = this.calculateMac(iv, encrypted);

        const payload = {
            iv: iv,
            value: encrypted,
            mac: mac,
        };

        return btoa(JSON.stringify(payload));
    }

    encryptValue(data) {
        //return AES.encrypt(data,  this.key, {iv: this.iv, mode: mode.CBC, keySize: 256 });
        const cipher = crypto.createCipheriv(this.cypher, this.key, this.iv);
        let encrypted = cipher.update(data, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted.toString();
    }

    calculateMac(iv, value) {
        return crypto.createHmac('sha256', this.key).update(iv + value).digest('hex');
    }

    decrypt(encrypted) {
        

        const payload = this.getJsonPayload(encrypted);

        let iv = atob(payload.iv);

        try {
            return this.decryptValue(payload.value, iv);
        } catch (e) {
            this.dd('Could not decrypt the data.');
        }
    }

    decryptValue(encryptedData, iv) {
        const decipher = crypto.createDecipheriv(this.cypher, this.key, this.iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }

    getJsonPayload(data) {
        if (typeof data !== 'string') {
            this.dd('Invalid Payload');
        }
        const decoded = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

        this.dd(decoded);

        if (!this.validPayload(decoded)) {
            this.dd('Invalid Payload.');
        }

        if (!this.validMac(decoded)) {
            this.dd('The MAC is invalid.');
        }

        return decoded;
    }

    validPayload(payload) {
        if (typeof payload !== 'object' || Array.isArray(payload)) {
            return false;
        }
        const requiredFields = ['iv', 'value', 'mac'];
        for (const item of requiredFields) {
            if (!payload.hasOwnProperty(item) || typeof payload[item] !== 'string') {
                return false;
            }
        }

        return atob(payload.iv).length === 16;
    }

    validMac(payload) {
        return this.calculateMac(btoa(this.iv), payload.value) === payload.mac;
    }

    serialize(data) {
        return JSON.stringify(data);
    }
     dd(data) {
        return console.error(data);
    }

}