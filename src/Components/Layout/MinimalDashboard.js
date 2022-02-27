import React from 'react';
import StaticClock from '../GridComponents/TimeDate/StaticClock';
import { makeStyles } from '@material-ui/core';
import StaticWeatherWidget from '../GridComponents/WeatherWidget/StaticWeatherWidget';
import UniversalConverter from '../GridComponents/UniversalConverter/UniversalConverter';

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    display: 'flex',

    alignItems: 'center',
    flexDirection: 'column',
  },
  clockAndWeatherContainer: {
    marginTop: '5vh',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
  },
});

export default function MinimalDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.clockAndWeatherContainer}>
        <StaticClock />
        <StaticWeatherWidget city={'stockholm'} />
      </div>
      <div className={classes.bottomContainer}>
        <div>
          <UniversalConverter />
        </div>
      </div>
    </div>
  );
}
