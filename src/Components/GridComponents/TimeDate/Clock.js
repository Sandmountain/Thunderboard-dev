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
    fontSize: '3.1vw',
  },
  timeTextScaled: {
    height: '100%',
    display: 'flex',
    fontWeight: 600,
    alignItems: 'center',
    fontSize: 'calc(4.1vw + 1px)',
  },
  timeTextMedium: {
    display: 'flex',
    fontWeight: 600,
    lineHeight: 1,
    fontSize: 'calc(3.5vw + 1px)',
  },
  dateMediumContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'center',
  },
  dateTexts: {
    paddingLeft: 2,
    lineHeight: 1,
    fontWeight: 200,
    fontSize: '0.8vw',
  },
});

export default function Clock({ mediumScreen, smallScreen }) {
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
      {!smallScreen && !mediumScreen && (
        <Typography variant="h2" className={classes.timeTextScaled}>
          {date.time}
        </Typography>
      )}
      {smallScreen && !mediumScreen && (
        <div style={{ display: 'flex', flexDirection: 'column', placeContent: 'center' }}>
          <Typography variant="h2" className={classes.timeTextMedium}>
            {date.time}
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Typography className={classes.dateTexts}>{date.weekday}</Typography>
            <Typography className={classes.dateTexts}>{date.day + '/' + date.monthNr}</Typography>
            <Typography className={classes.dateTexts}>{date.year}</Typography>
          </div>
        </div>
      )}
      {mediumScreen && (
        <>
          <Typography variant="h2" className={classes.timeText}>
            {date.time}
          </Typography>
          <div className={classes.dateMediumContainer}>
            <Typography className={classes.dateTexts}>{date.weekday}</Typography>
            <Typography className={classes.dateTexts}>{date.day + ' ' + date.month}</Typography>
            <Typography className={classes.dateTexts}>{date.year}</Typography>
          </div>
        </>
      )}
    </>
  );
}
