const forge = require('node-forge');
const fs = require('fs');

// Read the private key
const pem = fs.readFileSync('./cert.pem', 'utf8');
const certificate = forge.pki.certificateFromPem(pem);
const publicKey = certificate.publicKey;

// Data to be encrypted
const data = "Hello, Angy's World!!!";

// Convert data to buffer
const buffer = Buffer.from(data, 'utf8');

// Convert buffer to forge buffer
const forgeBuffer = forge.util.createBuffer(buffer.toString('binary'));

// Encrypt data
const encrypted = publicKey.encrypt(forgeBuffer.getBytes(), 'RSA-OAEP');

// Convert encrypted data to base64
const encryptedBase64 = forge.util.encode64(encrypted);

console.log(encryptedBase64);