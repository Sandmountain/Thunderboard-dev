import { Button, CardActionArea, Dialog, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

import { openInNewTab } from '../../helperFunctions';
import Image from '../../Image/Image';

const parseThumbnails = (url) => {
  return url.replace('{width}', 640).replace('{height}', 360);
};
const parseViewers = (nr) => {
  return nr.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

const useStyles = makeStyles({
  listCardContainer: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    flexFlow: 'column',
  },
  youtubeContent: {
    padding: 2,
    height: '100%',
    flex: '0 1 auto',
    position: 'relative',
  },
  listVideoThumbnailContainer: {
    maxHeight: '80px',
    minWidth: '128px',
    overflow: 'hidden',
  },
  listVideoThumbnailMaxres: {
    width: '100%',
    minHeight: 'auto',
  },
  listTitleText: {
    width: '1fr',
    alignSelf: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  listInfoText: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  viewersLabel: {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    pointerEvents: 'none',
    height: '12px',
    zIndex: 1,
    bottom: 0,
    left: 0,
    color: 'white',
    fontSize: '10px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: '1px 3px',
    margin: '2px',
  },
  isLiveLabel: {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    pointerEvents: 'none',
    height: '12px',
    zIndex: 1,
    top: 0,
    left: 0,
    color: 'white',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    borderRadius: '0.25em',
    backgroundColor: '#e91916',
    padding: '1px 3px',
    margin: '2px',
  },
  youtubeDialog: {
    overflow: 'hidden',
  },
  dialog: {
    overflow: 'hidden',
    background: 'rgba(255,255,255,0)',
    boxShadow: 'none',
  },
  backdrop: {
    background: 'rgba(0, 0, 0, 0.85) ',
  },
  secondaryColor: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.8rem',
  },
});

export default function TwitchCard(props) {
  const { thumbnail_url, viewer_count, type, title, user_name } = props.data;
  const [open, setOpen] = useState(false);
  const [hideChat, setHideChat] = useState(false);

  const classes = useStyles();

  const openStream = () => {
    //https://github.com/talk2MeGooseman/react-twitch-embed-video
    console.log('stream opened');
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${classes.listCardContainer} ${type !== 'live' && 'isDraggableContainer'}`}>
      <div>
        <CardActionArea onClick={() => handleClickOpen()}>
          <div className={classes.listVideoThumbnailContainer}>
            <span className={classes.isLiveLabel}>{type}</span>
            <span className={classes.viewersLabel}>{parseViewers(viewer_count.toString()) + ' viewers'}</span>
            <Image src={parseThumbnails(thumbnail_url)} />
          </div>
        </CardActionArea>
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
            layout={hideChat ? 'video' : 'video-with-chat'}
            style={{ marginBottom: '-4px' }}
            channel={user_name}
          />
        </Dialog>
      </div>
      <div className={classes.youtubeContent}>
        <Typography variant="subtitle2" style={{ fontSize: '0.8rem' }} className={classes.listTitleText}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          className={`${classes.listInfoText} ${classes.secondaryColor}`}
          onClick={() => openInNewTab(`https://www.twitch.tv/${user_name}`)}>
          {user_name}
        </Typography>
      </div>
    </div>
  );
}
