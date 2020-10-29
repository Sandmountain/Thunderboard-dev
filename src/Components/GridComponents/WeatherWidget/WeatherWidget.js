import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, makeStyles } from '@material-ui/core';

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
});

export default function WeatherWidget({ city, isDraggable }) {
  const [weatherData, setWeatherData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    getWeatherData();
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
  }, [city]);

  return (
    <Card className={classes.wrapperCard}>
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        {weatherData && (
          <div style={{ height: 'inherit' }}>
            <div style={{ position: 'relative' }}>
              <WeatherWidgetIcon icon={weatherData.weather[0].icon} id={weatherData.weather[0].id}></WeatherWidgetIcon>
            </div>
            <div
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                flexDirection: 'column',
              }}>
              <Typography variant="h4" style={{ lineHeight: 1 }}>
                {Math.round(weatherData.main.temp) + '°'}
              </Typography>
              <Typography variant="subtitle2">{city}</Typography>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
