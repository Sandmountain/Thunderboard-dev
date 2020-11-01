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
import { AssignmentTurnedIn, CheckBox, Delete, Remove, Subject } from '@material-ui/icons';

import React, { useCallback, useEffect, useState } from 'react';
import CardTopLabel from '../CardTopLabel/CardTopLabel';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,
    height: '100%',
    overflowY: "auto"
  },
  innerPadding: {
    padding: '40px 5px 5px',
    height: 'inherit',
    maxHeight: '-webkit-fill-available',
  },
  root: {
    height: "auto",
    paddingTop: 5
  },
  done: {
    textDecoration: "line-through",
    color: "#8c8c8c"
  }
});

export default function Todos({ todos, showTodos, openSettings, notes, settings, setSettings, isDraggable }) {
  const classes = useStyles();
  const [input, setInput] = useState(!showTodos ? notes : "");
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
    setInput("");
    //TODO: Din debounce suger
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

  const handleChange = (e) => {
    setInput(e.target.value);
  };


  const handleSwitch = () => {
    if(showTodo){
      setSettings({
        ...settings,
        todosSettings: {
          ...settings.todosSettings,
          showTodos: !settings.todosSettings.showTodos,
          todos: localTodos,
        },
      });
    } else {
      setSettings({
        ...settings,
        todosSettings: {
          ...settings.todosSettings,
          showTodos: !settings.todosSettings.showTodos,
          notes: input
        },
      });
    }
  };

  const handeClickTodo = (key) => {
    console.log(localTodos);
    const wook = [...localTodos,
      localTodos[key].checked = !localTodos[key].checked
    ]
    console.log(wook)
  }

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel compName={showTodo ? "Todos" : "Notes"} openSettings={openSettings} />
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        {showTodo ? (
          <>
            <form onSubmit={handleInput}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <TextField style={{ width: '100%' }} value={input} size="small" onChange={handleChange} placeholder="Enter a todo.."></TextField>
                <IconButton size="small" onClick={handleSwitch}>
                  <Subject />
                </IconButton>
              </div>
            </form>
            <List className={classes.root}>
              {localTodos.map((todo, key) => {
                return (
                  <ListItem key={key} role={undefined} dense button onClick={() => handeClickTodo(key)}>
                    <ListItemText primary={todo.name} className={todo.checked ? classes.done : ""}/>
                    <ListItemSecondaryAction>
                      <IconButton size="small">
                        <Delete size="small" edge="end"  htmlColor={"#8c8c8c"} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </>
        ) : (
          <>
           <div style={{position: "relative"}}>
            <IconButton style={{position: "absolute", right: 0, zIndex: "10"}} size="small" onClick={handleSwitch}>
              <AssignmentTurnedIn />
            </IconButton>
            </div>
            <TextField style={{ width: '100%', height: "100%"}} rowsMax={6} value={input} size="small" classes={{root: classes.root}} onChange={handleChange} multiline variant="outlined" placeholder="Write your notes"></TextField>
          </>
        )}
      </div>
    </Card>
  );
}
