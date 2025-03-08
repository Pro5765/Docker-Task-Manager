const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// In-memory storage for todos
let todos = [];

// Todo routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    text: req.body.text,
    category: req.body.category || 'Containers',
    priority: req.body.priority || 'Medium',
    completed: false,
    created: new Date()
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos[index] = {
    ...todos[index],
    completed: req.body.completed,
    category: req.body.category,
    priority: req.body.priority
  };
  res.json(todos[index]);
});

app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));