import {
  Card,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

import RedditIcon from '@material-ui/icons/Reddit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MailIcon from '@material-ui/icons/Mail';
import TwitchIcon from '../Icons/TwitchIcon';
import RssFeedIcon from '@material-ui/icons/RssFeed';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  AssignmentTurnedIn,
  ExpandLess,
  ExpandMore,
  Link,
  Subject,
} from '@material-ui/icons';

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
    position: 'absolute',
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

export default function CardTopLabel({
  compName,
  leftAlignedInfo,
  centerText,
  additionalButton,
  additionalButtons,
  noGutter,
  openSettings,
  standAlone,
  isMinimized,
  minimizeComponent,
}) {
  const classes = useStyles();

  const getLogo = (compName) => {
    switch (compName.toLowerCase()) {
      case 'world news':
        return <RssFeedIcon htmlColor={'#979797'} fontSize="small" />;
      case 'gmail':
        return <MailIcon htmlColor={'#979797'} fontSize="small" />;
      case 'reddit':
        return <RedditIcon htmlColor={'#979797'} fontSize="small" />;
      case 'twitch':
        return <TwitchIcon htmlColor={'#979797'} fontSize="small" />;
      case 'youtube':
        return <YouTubeIcon htmlColor={'#979797'} fontSize="small" />;
      case 'todos':
        return <AssignmentTurnedIn htmlColor={'#979797'} fontSize="small" />;
      case 'notes':
        return <Subject htmlColor={'#979797'} fontSize="small" />;
      case 'links':
        return <Link htmlColor={'#979797'} fontSize="small" />;
      default:
        break;
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Card elevation={2} className={classes.cardFlex}>
        <div className={classes.innerContainer}>
          {getLogo(compName)}
          <Typography style={{ padding: 5 }}>{compName}</Typography>
          {leftAlignedInfo && (
            <div className={classes.centerContainer}>
              <Typography>{leftAlignedInfo}</Typography>
            </div>
          )}
        </div>
        {leftAlignedInfo && (
          <div className={classes.centerContainer}>
            <Typography>{centerText}</Typography>
          </div>
        )}
        <div className={classes.buttonsContainer}>
          {additionalButton?.length > 0 ? (
            additionalButton.map((btn, idx) => {
              return (
                <div key={idx}>
                  <Divider
                    orientation="vertical"
                    style={noGutter ? { margin: 0 } : { margin: '0 5px' }}
                  />
                  {btn}
                </div>
              );
            })
          ) : (
            <>{additionalButton}</>
          )}
          {additionalButtons &&
            additionalButtons.map((button, key) => {
              return (
                <div style={{ display: 'contents' }} key={key}>
                  {button}
                </div>
              );
            })}
          <Divider
            orientation="vertical"
            style={noGutter ? { marginRight: '5px' } : { margin: '0 5px' }}
          />
          <IconButton
            size={'small'}
            onClick={() => openSettings(getSettingsTab(compName))}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          {standAlone && (
            <>
              <Divider
                orientation="vertical"
                style={noGutter ? { marginRight: '5px' } : { margin: '0 5px' }}
              />
              <IconButton size={'small'} onClick={minimizeComponent}>
                {!isMinimized ? (
                  <ExpandMore fontSize="small" />
                ) : (
                  <ExpandLess fontSize="small" />
                )}
              </IconButton>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
