// In-memory storage for todos
let todos = [];

const todoController = {
  getAllTodos: (req, res) => {
    res.json(todos);
  },

  addTodo: (req, res) => {
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
  },

  updateTodo: (req, res) => {
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
  },

  deleteTodo: (req, res) => {
    const index = todos.findIndex(todo => todo.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos.splice(index, 1);
    res.status(204).send();
  }
};

module.exports = todoController; 