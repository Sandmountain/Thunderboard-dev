import { Card, IconButton, makeStyles } from '@material-ui/core';
import RedditIcon from '@material-ui/icons/Reddit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MailIcon from '@material-ui/icons/Mail';

import React from 'react';
import TwitchIcon from '../Icons/TwitchIcon';
import ColorPicker from '../ToolsMenu/Tools/ColorPicker';
import Countdown from '../ToolsMenu/Tools/Countdown';

const useStyles = makeStyles({
  wrapperCard: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 0,
    overflowY: 'auto',
    width: '100%',
    padding: '5px 0',
  },
  active: {
    backgroundColor: '#3a3a3a40',
  },
});

export default function AppBar({
  onLeftClick,
  onRightClick,
  activeRight,
  activeLeft,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.wrapperCard}>
      <IconButton
        className={`${
          activeLeft === 0 || activeRight === 0 ? classes.active : ''
        }`}
        onClick={(e) => onLeftClick(e, 0)}
        onContextMenu={(e) => onRightClick(e, 0)}
        color="primary"
      >
        <MailIcon />
      </IconButton>
      <IconButton
        className={`${
          activeLeft === 1 || activeRight === 1 ? classes.active : ''
        }`}
        onClick={(e) => onLeftClick(e, 1)}
        onContextMenu={(e) => onRightClick(e, 1)}
        color="primary"
      >
        <RedditIcon />
      </IconButton>
      <IconButton
        className={`${
          activeLeft === 2 || activeRight === 2 ? classes.active : ''
        }`}
        onClick={(e) => onLeftClick(e, 2)}
        onContextMenu={(e) => onRightClick(e, 2)}
        color="primary"
      >
        <TwitchIcon />
      </IconButton>
      <IconButton
        className={`${
          activeLeft === 3 || activeRight === 3 ? classes.active : ''
        }`}
        onClick={(e) => onLeftClick(e, 3)}
        onContextMenu={(e) => onRightClick(e, 3)}
        color="primary"
      >
        <YouTubeIcon />
      </IconButton>
      <ColorPicker size={'medium'} />
      <Countdown size={'medium'} />
    </Card>
  );
}
