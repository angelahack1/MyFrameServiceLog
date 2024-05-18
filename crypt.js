const crypto = require('crypto');
const fs = require('fs');

// Read the private key
const privateKey = fs.readFileSync('./key.pem', 'utf8');

// Data to be encrypted
const data = "Hello, World!";

// Create a buffer from the data
const buffer = Buffer.from(data, 'utf8');

// Create a cipher object
const cipher = crypto.publicEncrypt(privateKey, buffer);

// The encrypted data is in the form of a Buffer, convert it to a string
const encryptedData = cipher.toString('base64');

console.log(encryptedData);