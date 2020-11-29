import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Card, useMediaQuery } from '@material-ui/core';

import { getMinMaxDate, parseDate, mockData } from './functions/timeDateFunctions.js';

import axios from 'axios';
import CalenderPopUp from './CalenderPopUp.js';
import Clock from './Clock.js';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,

    height: '100%',
  },
  content: {
    padding: '0 5px',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    placeContent: 'center',
  },
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

export default function TimeDateContainer({ calenders, isDraggable, credentials, isProduction }) {
  const [gCalenderData, setGCalenderData] = useState(null);
  const classes = useStyles();

  const smallScreen = useMediaQuery('(min-width:800px)');
  const mediumScreen = useMediaQuery('(min-width:1530px)');

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
    if (isProduction) {
      getCalenderData(credentials);
    } else {
      setGCalenderData(mockData);
    }
  }, [gCalenderData, isProduction, calenders, credentials]);

  return (
    <Card className={classes.wrapperCard}>
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.content}`}>
        <CalenderPopUp right={!smallScreen} calenders={calenders} gCalenderData={gCalenderData} />
        <Clock smallScreen={smallScreen} mediumScreen={mediumScreen} />
      </div>
    </Card>
  );
}
