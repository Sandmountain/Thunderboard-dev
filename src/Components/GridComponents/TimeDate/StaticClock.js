import React, { useEffect, useState } from 'react';

import CalenderPopUp from './CalenderPopUp.js';
import { Typography, makeStyles } from '@material-ui/core';
import { getMinMaxDate } from './functions/timeDateFunctions.js';
import { parseDate } from './functions/timeDateFunctions';
import axios from 'axios';

const useStyles = makeStyles({
  timeText: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    lineHeight: '0.8 !important',
    padding: 0,
    fontWeight: 600,
    color: 'white',
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

    color: 'white',
  },
  clockContainer: {
    marginTop: '5vw',
    display: 'flex',
    justifyContent: 'center',
  },
  clockInner: {},
});

export default function StaticClock({ calenders, credentials }) {
  const [date, setDate] = useState(parseDate(new Date()));
  const [gCalenderData, setGCalenderData] = useState(undefined);

  const classes = useStyles();

  useEffect(() => {
    async function getCalenderData(credentials) {
      const { minDate, maxDate } = getMinMaxDate();

      try {
        const calenderData = await Promise.all(
          calenders.map(async (calender) => {
            return await axios(
              `https://www.googleapis.com/calendar/v3/calendars/${calender}/events?timeMax=${maxDate}&timeMin=${minDate}`,
              credentials
            ).then((res) => {
              return res.data;
            });
          })
        );

        setGCalenderData(calenderData);
      } catch (err) {
        console.log(err);
      }
    }
    if (gCalenderData === undefined) {
      getCalenderData(credentials);
    }
  }, [gCalenderData, calenders, credentials]);

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
    <div className={classes.clockInner}>
      <Typography variant="h1" className={`textShadow ${classes.timeText}`}>
        {date.time}
      </Typography>
      <div className={classes.dateMediumContainer}>
        <Typography className={`textShadow ${classes.dateTexts}`}>
          {date.weekday} {date.day + ' ' + date.month} {date.year}
        </Typography>
        <CalenderPopUp
          right={true}
          calenders={calenders}
          gCalenderData={gCalenderData}
          standAlone={true}
        />
      </div>
    </div>
  );
}
