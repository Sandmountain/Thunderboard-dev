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
  },
});

export default function AppBar() {
  const classes = useStyles();

  const onRightClick = (e) => {
    e.preventDefault();
    console.log('right clicked!');
  };

  const onLeftMouse = (e, idx) => {
    e.preventDefault();
    console.log('left mouse!');
  };

  return (
    <Card className={classes.wrapperCard}>
      <IconButton
        onClick={(e) => onLeftMouse(e, 0)}
        onContextMenu={(e) => onRightClick(e, 0)}
        color="primary"
      >
        <MailIcon />
      </IconButton>
      <IconButton
        onClick={(e) => onLeftMouse(e, 1)}
        onContextMenu={(e) => onRightClick(e, 1)}
        color="primary"
      >
        <RedditIcon />
      </IconButton>
      <IconButton
        onClick={(e) => onLeftMouse(e, 2)}
        onContextMenu={(e) => onRightClick(e, 2)}
        color="primary"
      >
        <TwitchIcon />
      </IconButton>
      <IconButton
        onClick={(e) => onLeftMouse(e, 3)}
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
