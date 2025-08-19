const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todos = [];

// Get all To-Do items
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Add a new To-Do item
app.post('/api/todos', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }
    const newTodo = { name, description };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});