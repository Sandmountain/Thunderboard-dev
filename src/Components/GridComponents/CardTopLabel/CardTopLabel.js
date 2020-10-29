import { Card, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AssignmentTurnedIn } from '@material-ui/icons';

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
    case 'todos':
      return 9;
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

  const getLogo = (compName) => {
    switch (compName.toLowerCase()) {
      case 'aftonbladet':
        return <img src={require('./logos/aftonbladet-s.png')} alt={compName} className={classes.logoStyle} />;
      case 'gmail':
        return <img src={require('./logos/gmail-s.png')} alt={compName} className={classes.logoStyle} />;
      case 'reddit':
        return <img src={require('./logos/reddit-s.png')} alt={compName} className={classes.logoStyle} />;
      case 'twitch':
        return <img src={require('./logos/twitch-s.png')} alt={compName} className={classes.logoStyle} />;
      case 'youtube':
        return <img src={require('./logos/youtube-s.png')} alt={compName} className={classes.logoStyle} />;
      case 'todos':
        return <AssignmentTurnedIn htmlColor={'#979797'} fontSize="small" />;
      default:
        break;
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Card elevation={2} className={classes.cardFlex}>
        <span className={classes.innerContainer}>
          {getLogo(compName)}
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
