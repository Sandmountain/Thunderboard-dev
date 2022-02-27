import React from 'react';
import StaticClock from '../GridComponents/TimeDate/StaticClock';
import { makeStyles } from '@material-ui/core';
import StaticWeatherWidget from '../GridComponents/WeatherWidget/StaticWeatherWidget';

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
});

export default function MinimalDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <StaticClock />
      <StaticWeatherWidget city={'stockholm'} />
    </div>
  );
}
