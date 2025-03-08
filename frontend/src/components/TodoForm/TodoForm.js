import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Zoom
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DOCKER_CATEGORIES, DOCKER_PRIORITIES } from '../../utils/constants';

const TodoForm = ({ input, setInput, category, setCategory, priority, setPriority, onSubmit, loading }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 4,
      flexDirection: { xs: 'column', sm: 'row' },
      flexWrap: 'wrap'
    }}>
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new Docker task"
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            height: { xs: '48px', sm: '56px' }
          }
        }}
      />
      <FormControl sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
          sx={{ height: { xs: '48px', sm: '56px' } }}
        >
          {Object.values(DOCKER_CATEGORIES).map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          label="Priority"
          onChange={(e) => setPriority(e.target.value)}
          sx={{ height: { xs: '48px', sm: '56px' } }}
        >
          {Object.values(DOCKER_PRIORITIES).map((pri) => (
            <MenuItem key={pri} value={pri}>{pri}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip 
        title="Add Task" 
        TransitionComponent={Zoom}
        arrow
        placement="top"
      >
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onSubmit}
          disabled={loading || !input.trim()}
          sx={{ 
            minWidth: { xs: '100%', sm: '120px' },
            height: { xs: '48px', sm: '56px' }
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add
        </Button>
      </Tooltip>
    </Box>
  );
};

export default TodoForm; 