import {
  Card,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { AssignmentTurnedIn, CheckBox, Delete, Subject } from '@material-ui/icons';

import React, { useCallback, useEffect, useState } from 'react';
import CardTopLabel from '../CardTopLabel/CardTopLabel';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,
    height: '100%',
    overflowY: 'auto',
  },
  innerPadding: {
    padding: '40px 5px',
    height: 'inherit',
    maxHeight: '-webkit-fill-available',
  },
});

let timer;
export default function Todos({ todos, showTodos, openSettings, settings, setSettings, isDraggable }) {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [showTodo, setShowTodo] = useState(showTodos);
  const [localTodos, setLocalTodos] = useState(todos);

  const [checked, setChecked] = React.useState([0]);

  const handleInput = async (e) => {
    e.preventDefault();
    setLocalTodos([
      ...localTodos,
      {
        name: input,
        date: Date.now(),
        checked: false,
      },
    ]);
    //TODO: Din debounce suger
    debounce();
  };

  const saveToState = () => {
    setSettings({
      ...settings,
      todosSettings: {
        ...settings.todosSettings,
        todos: localTodos,
      },
    });
  };
  const debounce = async () => {
    timer = setTimeout(() => {
      saveToState();
    }, 10000);
  };

  const handleChange = (e) => {
    if (timer) {
      clearTimeout(timer);
      debounce();
    }

    setInput(e.target.value);
  };

  const handleToggle = (value) => () => {
    //setChecked();
  };

  const handleSwitch = () => {
    setSettings({
      ...settings,
      todosSettings: {
        ...settings.todosSettings,
      },
    });
  };

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel compName="Todos" openSettings={openSettings} />
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        {showTodo ? (
          <>
            <form onSubmit={handleInput}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <TextField style={{ width: '100%' }} onChange={handleChange} placeholder="Enter a todo.."></TextField>
                <IconButton size="small" onClick={handleSwitch}>
                  <Subject />
                </IconButton>
              </div>
            </form>
            <List className={classes.root}>
              {localTodos.map((todo, key) => {
                return (
                  <ListItem key={key} role={undefined} dense button onClick={handleToggle(key)}>
                    <ListItemText primary={todo.name} />
                    <ListItemSecondaryAction>
                      <Checkbox size="small" edge="end" onChange={handleToggle(key)} checked={todo.checked} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </>
        ) : (
          <>
            <TextField style={{ width: '100%' }} onChange={handleChange} placeholder="Enter a todo.."></TextField>
            <IconButton size="small">
              <AssignmentTurnedIn />
            </IconButton>
          </>
        )}
      </div>
    </Card>
  );
}
