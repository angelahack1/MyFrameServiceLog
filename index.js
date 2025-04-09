const express = require('express');
const https = require('https');
const fs = require('fs');
const basicAuth = require('express-basic-auth')
const addon = require('./build/Release/addon');

const portNumber = 443;

const app = express();
app.use(express.json());

let items = ['Hola', ' ', 'como', ' ', 'estas', ' ', 'Angy...' ];

app.use(basicAuth({
    users: { 'angelahack1': 'myPassHacked' },
    challenge: true
}));

app.get('/', (req, res) => {
    res.send("Hello, secure Angy's World!!!!, el resultado del computo es: "+ addon.add(3, 5));
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    items.push(req.body.item);
    res.status(201).send();
});

app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    items[id] = req.body.item;
    res.send();
});

app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    items = items.filter((item, index) => index != id);
    res.send();
});

// SSL/TLS certificate and key
const options = {
    key: fs.readFileSync('./key.pem'), // Path to your key file
    cert: fs.readFileSync('./cert.pem') // Path to your certificate file
};

https.createServer(options, app).listen(portNumber, () => {
    console.log('Secure server listening on port: '+portNumber);
});
