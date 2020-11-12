import {
  Card,
  Checkbox,
  Collapse,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Zoom,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Add, AssignmentTurnedIn, CheckBox, Delete, Remove, Subject } from '@material-ui/icons';

import React, { useCallback, useEffect, useState } from 'react';
import CardTopLabel from '../CardTopLabel/CardTopLabel';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,
    height: '100%',
    overflowY: 'auto',
  },
  innerPadding: {
    padding: '35px 0',
    height: 'inherit',
    maxHeight: '-webkit-fill-available',
  },
  root: {
    height: 'auto',
    paddingTop: 5,
  },
  done: {
    textDecoration: 'line-through',
    color: '#8c8c8c',
  },
});

export default function Todos({ todos, openSettings, settings, setSettings, isDraggable }) {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [localTodos, setLocalTodos] = useState(todos);
  const [openAddTodo, setOpenAddTodo] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();
    setLocalTodos([
      {
        name: input,
        date: Date.now(),
        checked: false,
      },
      ...localTodos,
    ]);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handeClickTodo = (key) => {
    const todos = localTodos.map((todo, idx) => {
      if (idx === key) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      } else {
        return todo;
      }
    });
    setLocalTodos(todos);
  };

  const todoDelete = (key) => {
    setLocalTodos(localTodos.filter((todo, index) => index !== key));
  };

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel
        compName={'Todos'}
        openSettings={openSettings}
        additionalButton={
          <IconButton size={'small'} onClick={() => setOpenAddTodo(!openAddTodo)}>
            {!openAddTodo ? <Add fontSize="small" /> : <Remove fontSize="small"></Remove>}
          </IconButton>
        }
      />

      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        <Collapse in={openAddTodo}>
          <div style={{ padding: '5px 5px 0px', borderRadius: 0 }}>
            <form onSubmit={handleInput}>
              <TextField
                value={input}
                style={{ width: '100%' }}
                size="small"
                onChange={handleChange}
                placeholder="Enter a todo.."
                variant="outlined"></TextField>
            </form>
          </div>
        </Collapse>
        <List className={classes.root}>
          {localTodos.map((todo, key) => {
            return (
              <ListItem
                key={key}
                role={undefined}
                dense
                button
                onClick={() => handeClickTodo(key)}
                style={{ padding: 0 }}>
                <ListItemIcon>
                  <Checkbox
                    size="small"
                    edge="end"
                    onChange={() => handeClickTodo(key)}
                    checked={todo.checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={todo.name} className={todo.checked ? classes.done : ''} />
                {todo.checked && (
                  <ListItemSecondaryAction onClick={() => todoDelete(key)}>
                    <IconButton size="small">
                      <Delete size="small" edge="end" htmlColor={'#8c8c8c'} />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Card>
  );
}
