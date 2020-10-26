import React, { useEffect, useState } from 'react';

import { Typography, makeStyles } from '@material-ui/core';

import { parseDate } from './functions/timeDateFunctions';

const useStyles = makeStyles({
  timeText: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    lineHeight: '1 !important',
    padding: 0,
    fontWeight: 600,
    fontSize: 'calc(3.75rem + 1px)',
  },
  dateContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'center',
  },
  dateTexts: {
    paddingLeft: 2,
    lineHeight: 1,
    fontWeight: 200,
  },
});

export default function Clock() {
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
    <>
      <Typography variant="h2" className={classes.timeText}>
        {date.time}
      </Typography>
      <div className={classes.dateContainer}>
        <Typography className={classes.dateTexts}>{date.weekday}</Typography>
        <Typography className={classes.dateTexts}>{date.day + ' ' + date.month}</Typography>
        <Typography className={classes.dateTexts}>{date.year}</Typography>
      </div>
    </>
  );
}
