import { Card, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const getLogo = (compName) => {
  switch (compName.toLowerCase()) {
    case 'aftonbladet':
      return require('./logos/aftonbladet-s.png');
    case 'gmail':
      return require('./logos/gmail-s.png');
    case 'reddit':
      return require('./logos/reddit-s.png');
    case 'twitch':
      return require('./logos/twitch-s.png');
    case 'youtube':
      return require('./logos/youtube-s.png');
    default:
      break;
  }
};
const getSettingsTab = (compName) => {
  switch (compName.toLowerCase()) {
    case 'aftonbladet':
      return 8;
    case 'gmail':
      return 2;
    case 'reddit':
      return 4;
    case 'twitch':
      return 5;
    case 'youtube':
      return 3;
    default:
      break;
  }
};

const useStyles = makeStyles({
  mainContainer: {
    position: 'fixed',
    zIndex: 5,
    width: '100%',
    height: '25px',
  },
  cardFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '0',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5,
  },
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 5,
  },
  logoStyle: {
    height: '1em',
    width: '1em',
  },
});

export default function CardTopLabel({ compName, openSettings }) {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Card elevation={2} className={classes.cardFlex}>
        <span className={classes.innerContainer}>
          <img src={getLogo(compName)} alt={compName} className={classes.logoStyle}></img>
          <Typography style={{ padding: 5 }}>{compName}</Typography>
        </span>

        <span className={classes.buttonsContainer}>
          <Divider orientation="vertical" style={{ margin: '0 5px 0 10px' }} />

          <IconButton size={'small'} onClick={() => openSettings(getSettingsTab(compName))}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </span>
      </Card>
    </div>
  );
}
