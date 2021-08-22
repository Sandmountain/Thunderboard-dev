import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';

import { Add, Check, Delete, Remove } from '@material-ui/icons';

import React, { useState } from 'react';
import CardTopLabel from '../CardTopLabel/CardTopLabel';

import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

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

export default function Todos({ todos = [], openSettings, settings, setSettings, isDraggable }) {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [newChange, setNewChange] = useState(false);
  const [localTodos, setLocalTodos] = useState(todos);
  const [openAddTodo, setOpenAddTodo] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();

    const newTodosList = [
      {
        name: input,
        date: Date.now(),
        checked: false,
      },
      ...localTodos,
    ];

    setNewChange(true);
    setLocalTodos(newTodosList);
    updateFirestoreCollection({
      todosSettings: newTodosList,
    });

    setInput('');
  };

  const saveChanges = () => {
    setSettings({
      ...settings,
      todosSettings: {
        ...settings.todosSettings,
        todos: localTodos,
      },
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handeClickTodo = (key) => {
    setNewChange(true);
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

    updateFirestoreCollection({
      todosSettings: {
        ...settings.todosSettings,
        todos: todos,
      },
    });
    setLocalTodos(todos);
  };

  const todoDelete = (key) => {
    setNewChange(true);
    const filteredTodos = localTodos.filter((_todo, index) => index !== key);

    updateFirestoreCollection({
      todosSettings: {
        ...settings.todosSettings,
        todos: filteredTodos,
      },
    });
    setLocalTodos(filteredTodos);
  };

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel
        compName={'Todos'}
        openSettings={openSettings}
        additionalButtons={[
          newChange && (
            <>
              <Divider orientation="vertical" style={{ margin: '0 5px' }} />
              <IconButton size={'small'} onClick={() => saveChanges()}>
                <Check fontSize="small" />
              </IconButton>
            </>
          ),
          <>
            <Divider orientation="vertical" style={{ margin: '0 5px' }} />
            <IconButton size={'small'} onClick={() => setOpenAddTodo(!openAddTodo)}>
              {!openAddTodo ? <Add fontSize="small" /> : <Remove fontSize="small"></Remove>}
            </IconButton>
          </>,
        ]}
      />

      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        <Collapse in={openAddTodo}>
          <div style={{ padding: '5px 5px 0px', borderRadius: 0 }}>
            <form onSubmit={handleInput}>
              <TextField
                onBlur={() => setOpenAddTodo(false)}
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
          {localTodos && localTodos?.length > 0 ? (
            localTodos.map((todo, key) => {
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
            })
          ) : (
            <>
              {!openAddTodo && (
                <Fade in={!openAddTodo}>
                  <Button
                    variant="text"
                    fullWidth
                    startIcon={<Add fontSize="small" />}
                    onClick={() => setOpenAddTodo(!openAddTodo)}>
                    Add Todo
                  </Button>
                </Fade>
              )}
            </>
          )}
        </List>
      </div>
    </Card>
  );
}
