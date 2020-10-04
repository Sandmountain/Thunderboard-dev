import React, { useEffect, useState } from 'react';
import { Typography, Box, makeStyles, Card } from '@material-ui/core';

import { parseDate } from './functions/timeDateFunctions.js';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,

    height: '100%',
  },
  content: {
    padding: '0 5px',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  timeText: {
    margin: 0,
    padding: 0,
    fontWeight: 600,
    fontSize: 'calc(3.75rem + 1px)',
  },
  dateContainer: {
    position: 'relative',
    top: '0.8rem',
    paddingLeft: 2,
    lineHeight: 1.05,
    fontWeight: 200,
  },
  dateTexts: {
    paddingLeft: 2,
    lineHeight: 1.05,
    fontWeight: 200,
  },
});

export default function TimeDate({ isDraggable }) {
  const [date, setDate] = useState(parseDate(new Date()));
  const classes = useStyles();
  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setDate(parseDate(new Date()));
  };

  return (
    <Card className={classes.wrapperCard}>
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.content}`}>
        <Typography variant="h2" className={classes.timeText}>
          {date.time}
        </Typography>
        <div className={classes.dateContainer}>
          <Typography className={classes.dateTexts}>{date.weekday}</Typography>
          <Typography className={classes.dateTexts}>{date.day + ' ' + date.month}</Typography>
          <Typography className={classes.dateTexts}>{date.year}</Typography>
        </div>
      </div>
    </Card>
  );
}
