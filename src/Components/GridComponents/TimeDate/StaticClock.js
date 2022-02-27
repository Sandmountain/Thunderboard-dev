import React, { useEffect, useState } from 'react';

import { Typography, makeStyles } from '@material-ui/core';

import { parseDate } from './functions/timeDateFunctions';

const useStyles = makeStyles({
  timeText: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    lineHeight: '0.7 !important',
    padding: 0,
    fontWeight: 600,
    fontSize: '4.1vw',
    color: 'white',
    textShadow: '0 1px 0 rgba(0,0,0,.4)',
  },
  timeTextMedium: {
    display: 'flex',
    fontWeight: 600,
    lineHeight: 1,
    fontSize: 'calc(3.5vw + 1px)',
  },
  dateMediumContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  dateTexts: {
    lineHeight: 1,
    fontWeight: 200,
    fontSize: '0.6vw',
    color: 'white',
    textShadow: '0 1px 0 rgba(0,0,0,.4)',
  },
  clockContainer: {
    marginTop: '5vw',
    display: 'flex',
    justifyContent: 'center',
  },
  clockInner: {},
});

export default function StaticClock() {
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
    <div className={classes.clockContainer}>
      <div className={classes.clockInner}>
        <Typography variant="h2" className={classes.timeText}>
          {date.time}
        </Typography>
        <div className={classes.dateMediumContainer}>
          <Typography className={classes.dateTexts}>
            {date.weekday} {date.day + ' ' + date.month} {date.year}
          </Typography>
        </div>
      </div>
    </div>
  );
}
