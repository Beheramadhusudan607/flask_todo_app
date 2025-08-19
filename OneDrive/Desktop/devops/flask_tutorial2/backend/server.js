const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

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
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});