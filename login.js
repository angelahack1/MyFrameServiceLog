const express = require('express');
const https = require('https');
const fs = require('fs');
const basicAuth = require('express-basic-auth')

const portNumber = 9090;

// Initialize express app
const app = express();

// Simple access control mechanism
app.use(basicAuth({
    users: { 'angelahack1': 'myPassHacked' }, // Replace with your desired username and password
    challenge: true
}))

app.get('/', (req, res) => {
    res.send("Hello, secure Angy's Wortld!!!!");
});

// SSL/TLS certificate and key
const options = {
    key: fs.readFileSync('./key2.pem'), // Path to your key file
    cert: fs.readFileSync('./cert2.pem') // Path to your certificate file
};

https.createServer(options, app).listen(portNumber, () => {
    console.log('Secure server listening on port: '+portNumber);
});