import { makeStyles } from '@material-ui/core';
import React from 'react';

import TwitchOnlineStream from './TwitchOnlineStream';
import TwitchOfflineStream from './TwitchOfflineStream';

const useStyles = makeStyles({
  listCardContainer: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    flexFlow: 'column',
  },
});

export default function TwitchCard(props) {
  const { type } = props.data;

  const classes = useStyles();
  return (
    <div className={`${classes.listCardContainer} ${type !== 'live' && 'isDraggableContainer'}`}>
      {props.data && type === 'live' ? (
        <TwitchOnlineStream data={props.data} />
      ) : (
        <TwitchOfflineStream data={props.data} />
      )}
      {/*  */}
    </div>
  );
}
