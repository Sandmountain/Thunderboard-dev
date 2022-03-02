import React, { useState } from 'react';
import {
  Card,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { defineText } from './functions/converter.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  universalConvContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 0,
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      height: '100%',
    },
  },
}));

export default function GoogleTranslate({ currency, language, isDraggable }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const languages = 'Swedish';
  const defaultCurrency = 'SEK';

  const handleInput = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(await defineText(input, defaultCurrency, languages));
    setLoading(false);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleRemoveInput = (event) => {
    if (event.keyCode === 8 && result !== '') {
      setLoading(false);
      setResult('');
      setInput('');
    }
  };

  const clearInput = () => {
    setLoading(false);
    setResult('');
    setInput('');
  };

  return (
    <Card className={classes.universalConvContainer}>
      <form
        className={`${classes.root} ${isDraggable && 'isDraggableContainer'}`}
        style={{ width: '100%', margin: 8 }}
        noValidate
        autoComplete="off"
        onSubmit={handleInput}
      >
        <TextField
          autoFocus
          onChange={handleChange}
          onKeyDown={handleRemoveInput}
          error={result?.type === 'error' && true}
          id="outlined-full-width"
          label={result !== '' ? result?.label : 'Universal Converter'}
          value={result !== '' ? result?.value : loading ? 'loading...' : input}
          style={{ width: '100%', fontSize: '11pt', margin: 0, height: '100%' }}
          variant="outlined"
          size="small"
          rows={1}
          classes={{
            root: classes.inputRoot,
          }}
          InputProps={{
            endAdornment: result !== '' && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => clearInput()}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </form>
    </Card>
  );
}
