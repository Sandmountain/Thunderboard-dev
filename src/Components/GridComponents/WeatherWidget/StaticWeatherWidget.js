import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, makeStyles, useMediaQuery } from '@material-ui/core';

import WeatherWidgetIcon from './WeatherWidgetIcon/WeatherWidgetIcon';

const useStyles = makeStyles({
  wrapperCard: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5vh',
    borderRadius: 0,
    height: '100%',
    width: '100%',
  },
  smallStyle: {
    fontSize: '3vw',
  },
  temperatureContainer: {
    height: '100%',
  },
  cityName: {
    color: 'white',
  },
  description: {
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
});

export default function StaticWeatherWidget({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function getWeatherData() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
        );

        setWeatherData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeatherData();
  }, [city]);
  console.log(weatherData);
  return (
    <div className={classes.wrapperCard}>
      {weatherData && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h4"
              style={{ lineHeight: 1, color: 'white', marginTop: 10 }}
            >
              <WeatherWidgetIcon
                icon={weatherData.weather[0].icon}
                id={weatherData.weather[0].id}
                standalone={true}
              ></WeatherWidgetIcon>
              {Math.round(weatherData.main.temp) + '°'}
            </Typography>
            <Typography
              className={classes.description}
              variant="subtitle1"
              style={{ lineHeight: 1, color: 'white' }}
            >
              {weatherData.weather[0].description}
            </Typography>
            <Typography
              className={`${classes.cityName} ${classes.description}`}
              variant="caption"
            >
              {city}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}
