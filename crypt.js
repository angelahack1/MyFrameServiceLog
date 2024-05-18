const forge = require('node-forge');
const fs = require('fs');

// Read the public key
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

console.log("Encrypted: <<<"+encryptedBase64+">>>");
console.log("");

//Read the private key
const pem2 = fs.readFileSync('./key.pem', 'utf8');
const key = forge.pki.privateKeyFromPem(pem2);

//Data to be decrypted
const decoded = forge.util.decode64(encryptedBase64);

//Convert data to buffer
const bufferEnc = Buffer.from(decoded, 'binary');

//COnvert buffer to forge buffer
const forgeBufferEnc = forge.util.createBuffer(bufferEnc.toString('binary'));

//Decrypt data
const decrypted = key.decrypt(forgeBufferEnc.getBytes(), 'RSA-OAEP');

console.log("Decrypted: <<<"+decrypted+">>>");

