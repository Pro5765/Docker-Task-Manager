import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Footer from './components/Footer/Footer';
import TodoCard from './components/TodoCard/TodoCard';
import TodoForm from './components/TodoForm/TodoForm';
import { DOCKER_CATEGORIES, DOCKER_PRIORITIES, API_URL } from './utils/constants';
import { todoService } from './services/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(DOCKER_CATEGORIES.CONTAINERS);
  const [priority, setPriority] = useState(DOCKER_PRIORITIES.MEDIUM);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const fetchTodos = async () => {
    try {
      const data = await todoService.fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const newTodo = await todoService.addTodo({
        text: input,
        category,
        priority,
        completed: false
      });
      
      setTodos([newTodo, ...todos]);
      setInput('');
      setCategory(DOCKER_CATEGORIES.CONTAINERS);
      setPriority(DOCKER_PRIORITIES.MEDIUM);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    setLoading(true);
    try {
      const todo = todos.find(t => t.id === id);
      const updatedTodo = await todoService.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setLoginOpen(false);
      setUsername('');
      setPassword('');
      fetchTodos();
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) throw new Error('Registration failed');
      
      setRegisterOpen(false);
      setLoginOpen(true);
      setUsername('');
      setPassword('');
      setError('Registration successful! Please login.');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setTodos([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, flex: 1, py: { xs: 2, sm: 4 } }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 4 }, 
              borderRadius: 4,
              bgcolor: 'background.paper',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #3b82f6, #ec4899)',
                    borderRadius: '2px',
                  }
                }}
              >
                Docker Task Manager
              </Typography>
            </Box>

            <TodoForm
              input={input}
              setInput={setInput}
              category={category}
              setCategory={setCategory}
              priority={priority}
              setPriority={setPriority}
              onSubmit={addTodo}
              loading={loading}
            />

            <Divider sx={{ mb: 3 }} />

            {loading ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                py: 4,
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <CircularProgress size={40} />
                <Typography color="text.secondary">
                  Loading your Docker tasks...
                </Typography>
              </Box>
            ) : todos.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                color: 'text.secondary'
              }}>
                <Typography variant="h6" gutterBottom>
                  No Docker tasks yet
                </Typography>
                <Typography>
                  Add your first Docker task to get started!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {todos.map((todo, index) => (
                  <Grid item xs={12} sm={6} md={3} key={todo.id}>
                    <TodoCard
                      todo={todo}
                      index={index}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Container>
        <Footer />

        <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLoginOpen(false)}>Cancel</Button>
            <Button onClick={handleLogin} variant="contained" color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)}>
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRegisterOpen(false)}>Cancel</Button>
            <Button onClick={handleRegister} variant="contained" color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError(null)} 
            severity="error" 
            sx={{ 
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;