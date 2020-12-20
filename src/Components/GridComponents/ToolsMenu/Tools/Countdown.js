import React, { useEffect, useState } from 'react';
import { Badge, Button, IconButton, InputAdornment, makeStyles, Popover, TextField, Tooltip } from '@material-ui/core';

import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },

  textField: {
    padding: '5px',
  },
  paper: {
    width: '25%',
  },
  test: {
    padding: '0px',
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  start: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
  },
}));

const documentTitle = document.title;
const audio = new Audio(require('./alarm.mp3'));

export default function Countdown() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [input, setInput] = useState('');
  const [time, setTime] = useState('');
  const [parsedTime, setParsedTime] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsCounting(!isCounting);
    setParsedTime(new Date(input * 60 * 1000).toISOString().substr(11, 8).toString());
    startCountdown(input);
  };

  const startCountdown = (time) => {
    setTime(time * 60);
  };

  useEffect(() => {
    if (time === 0) {
      document.title = documentTitle;
      setIsCounting(false);
      // Add Notification
      audio.play();
    }

    const timeout = setTimeout(() => {
      if (time > 0 && isCounting) {
        setTime(time - 1);
        let parsed = new Date((time - 1) * 1000).toISOString().substr(11, 8).toString();
        setParsedTime(parsed);
        if (time < 3600) {
          document.title = parsed.substr(3, 5);
        }
      } else {
        clearInterval(timeout);
        document.title = documentTitle;
      }
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [time, isCounting]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Tooltip placement="top" title={'Countdown timer'}>
        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          <Badge color="secondary" variant="dot" invisible={!isCounting}>
            <AlarmIcon></AlarmIcon>
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ width: '50%' }}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={onSubmit}>
            <TextField
              disabled={isCounting}
              size="small"
              onChange={(e) => handleInput(e)}
              className={` ${classes.textField}`}
              value={isCounting ? parsedTime : input}
              classes={{
                root: isCounting && classes.root,
              }}
              InputProps={{
                endAdornment: !isCounting && <InputAdornment position="end">min</InputAdornment>,
              }}
              variant="outlined"></TextField>
          </form>

          <div style={{ padding: '0 5px 5px' }}>
            <Button
              fullWidth
              className={isCounting ? classes.error : classes.start}
              variant="outlined"
              onClick={onSubmit}>
              {' '}
              {isCounting ? 'Stop Timer' : 'Start Timer'}
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
