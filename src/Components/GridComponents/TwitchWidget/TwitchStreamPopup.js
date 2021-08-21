import { Button, Dialog, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

const useStyles = makeStyles({
  dialog: {
    overflow: 'hidden',
    background: 'rgba(255,255,255,0)',
    boxShadow: 'none',
  },
});

const isProduction = process.env.NODE_ENV !== 'production' ? false : true;

export default function TwitchStreamPopup({ open, handleClose, user_name }) {
  const [hideChat, setHideChat] = useState(false);
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      BackdropProps={{
        classes: {
          root: classes.backdrop,
        },
      }}
      classes={{ paper: classes.dialog }}>
      <span style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ color: 'white', borderColor: 'white' }} onClick={() => setHideChat(!hideChat)}>
          Toggle Chat
        </Button>
      </span>
      <ReactTwitchEmbedVideo
        width={'1280px'}
        height={'720px'}
        parent={'chrome-extension://fabaenedklgdkngaibpccpmihcgdodla'}
        layout={hideChat ? 'video' : 'video-with-chat'}
        style={{ marginBottom: '-4px' }}
        channel={user_name}
      />
    </Dialog>
  );
}
