const express = require('express');
const app = express();
app.use(express.json());

let items = ['Hola', ' ', 'como', ' ', 'estas', ' ', 'Angy...' ];

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

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));

