import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, makeStyles, useMediaQuery } from '@material-ui/core';

import WeatherWidgetIcon from './WeatherWidgetIcon/WeatherWidgetIcon';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,
    height: '100%',
  },
  innerPadding: {
    padding: 5,
    height: 'inherit',
    maxHeight: '-webkit-fill-available',
  },
  smallStyle: {
    fontSize: '3vw',
  },
  temperatureContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flexDirection: 'column',
  },
  cityName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
});

export default function WeatherWidget({ city, isDraggable }) {
  const [weatherData, setWeatherData] = useState(null);
  const classes = useStyles();

  const smallScreen = useMediaQuery('(min-width:870px)');

  useEffect(() => {
    async function getWeatherData() {
      try {
        const res = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
        );

        setWeatherData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeatherData();
  }, [city]);

  return (
    <Card className={classes.wrapperCard}>
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        {weatherData && (
          <div style={{ height: 'inherit' }}>
            <div style={{ position: 'relative' }}>
              <WeatherWidgetIcon icon={weatherData.weather[0].icon} id={weatherData.weather[0].id}></WeatherWidgetIcon>
            </div>
            <div className={classes.temperatureContainer}>
              <Typography variant="h4" style={{ lineHeight: 1 }} className={!smallScreen ? classes.smallStyle : ''}>
                {Math.round(weatherData.main.temp) + '°'}
              </Typography>
              <Typography className={classes.cityName} variant="subtitle2">
                {city}
              </Typography>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
