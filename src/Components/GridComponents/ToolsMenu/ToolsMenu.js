import { Card, makeStyles } from '@material-ui/core';
import React from 'react';
import ColorPicker from './Tools/ColorPicker';
import Countdown from './Tools/Countdown';

const useStyles = makeStyles({
  wrapperCard: {
    borderRadius: 0,
    height: '100%',
    overflowY: 'auto',
  },
  innerPadding: {
    padding: '5px',
    height: 'inherit',
    maxHeight: '-webkit-fill-available',
    display: 'flex',
  },
});

export default function WeatherWidget({ openSettings, isDraggable }) {
  const classes = useStyles();

  return (
    <Card className={classes.wrapperCard}>
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        <ColorPicker></ColorPicker>

        <Countdown></Countdown>
      </div>
    </Card>
  );
}
