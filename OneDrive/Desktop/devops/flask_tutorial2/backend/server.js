const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
=======
const mongoose = require('mongoose');
>>>>>>> master_2

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

<<<<<<< HEAD
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
=======
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema and model
const todoSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String
});
const Todo = mongoose.model('Todo', todoSchema);

// Add a new To-Do item via /submittodoitem route
app.post('/submittodoitem', async (req, res) => {
    const { itemName, itemDescription } = req.body;
    if (!itemName || !itemDescription) {
        return res.status(400).json({ error: 'itemName and itemDescription are required.' });
    }
    try {
        const newTodo = new Todo({ itemName, itemDescription });
        await newTodo.save();
        res.status(201).json({ message: 'To-Do item submitted successfully!', todo: newTodo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save to database.' });
    }
>>>>>>> master_2
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});