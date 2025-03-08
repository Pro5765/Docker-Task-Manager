const express = require('express');
const securityMiddleware = require('./middleware/security');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
app.use(express.json());
securityMiddleware.setup(app);

// Routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 