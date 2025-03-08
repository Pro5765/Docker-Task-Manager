import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Chip,
  Tooltip,
  Zoom,
  Fade
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DockerIcon from '@mui/icons-material/Storage';
import { DOCKER_PRIORITIES } from '../../utils/constants';

const TodoCard = ({ todo, index, onToggle, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case DOCKER_PRIORITIES.HIGH:
        return 'error';
      case DOCKER_PRIORITIES.MEDIUM:
        return 'warning';
      case DOCKER_PRIORITIES.LOW:
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Fade 
      in={true} 
      key={todo.id}
      timeout={300}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              color="primary"
              sx={{ mr: 1 }}
            />
            <Typography 
              variant="subtitle1" 
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
                flexGrow: 1
              }}
            >
              {todo.text}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<DockerIcon />}
              label={todo.category}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip
              label={todo.priority}
              size="small"
              color={getPriorityColor(todo.priority)}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Tooltip 
            title="Delete Todo" 
            TransitionComponent={Zoom}
            arrow
            placement="left"
          >
            <IconButton 
              edge="end" 
              onClick={() => onDelete(todo.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default TodoCard; 