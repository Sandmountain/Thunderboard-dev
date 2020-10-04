import React, { useState } from 'react';
import { Card, Typography, Button, CardActionArea, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { viewsCount } from './functions/youtubeFunctions';

import { openInNewTab, timeSince } from '../../helperFunctions.js';

import Image from '../../Image/Image.js';
import YouTube from 'react-youtube';

const useStyles = makeStyles({
  listCardContainer: {
    overflow: 'hidden',
    height: '80px',
    borderRadius: ' 0px !important',
    borderBottom: '#f1f1f1 1px solid',
    borderRight: '#f1f1f1 1px solid',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 0.5fr 0.5fr',
    '&:first-of-type': {
      borderTop: '#f1f1f1 1px solid',
      borderBottom: 0,
    },
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
    paddingLeft: '12px',
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

  timeDurationLabel: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: '3px 4px',
    height: '12px',
    borderRadius: '2px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  youtubeDialog: {
    marginBottom: '-5px !important',
    overflow: 'hidden',
  },
  dialog: {
    overflow: 'hidden',
  },
  secondaryColor: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

const cropTitleText = (title) => {
  if (title.length > 18) {
    return title.substring(0, 18) + '...';
  } else {
    return title;
  }
};

const parseDuration = (duration) => {
  const splittedDuration = duration.match(/(\d+)(?=[MHS])/gi) || [];
  return splittedDuration
    .map(function (item) {
      if (item.length < 2) return '0' + item;
      return item;
    })
    .join(':');
};

export default function YoutubeVideo(props) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const { id } = props.data;
  const { thumbnails, channelTitle, title, publishedAt, channelId } = props.data.snippet;
  const { viewCount } = props.data.statistics;
  const imageURL = thumbnails.maxres ? thumbnails.maxres : thumbnails.standard;
  const duration = parseDuration(props.data.contentDetails.duration);

  const youtubeOptions = {
    width: '1280',
    height: '720',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.listCardContainer}>
      <CardActionArea onClick={handleClickOpen}>
        <div className={classes.listVideoThumbnailContainer}>
          <span className={classes.timeDurationLabel}>{duration}</span>
          <Image src={imageURL.url} />
        </div>
      </CardActionArea>
      <Dialog open={open} onClose={handleClose} maxWidth={false} classes={{ paper: classes.dialog }}>
        <YouTube videoId={id} opts={youtubeOptions} className={classes.youtubeDialog} />
      </Dialog>
      <Typography variant="subtitle2" className={classes.listTitleText}>
        {title}
      </Typography>
      <Button
        variant="text"
        component="p"
        className={classes.listInfoText}
        onClick={() => openInNewTab(`https://www.youtube.com/channel/${channelId}/`)}>
        {cropTitleText(channelTitle)}
      </Button>
      <Typography variant="body2" component="p" className={`${classes.listInfoText} ${classes.secondaryColor}`}>
        {viewsCount(viewCount)}
      </Typography>
      <Typography variant="body2" component="p" className={`${classes.listInfoText} ${classes.secondaryColor}`}>
        {timeSince(Date.parse(publishedAt))}
      </Typography>
    </Card>
  );
}
