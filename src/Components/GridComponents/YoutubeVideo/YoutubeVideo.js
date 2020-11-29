import React, { useState } from 'react';
import { Typography, CardActionArea, Dialog, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { viewsCount } from './functions/youtubeFunctions';

import { openInNewTab, timeSince } from '../../helperFunctions.js';

import Image from '../../Image/Image.js';
import YouTube from 'react-youtube';

const useStyles = makeStyles({
  listCardContainer: {
    width: '100%',
    height: '100%',
    padding: '5px 0',
    display: 'flex',
    flexFlow: 'column',
  },
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
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
  titleText: {
    fontWeight: '450',
    pointer: 'cursor',
    '&:hover': {
      textDecoration: 'underline',
    },
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
    fontSize: '0.8rem',
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

  const { showTitle, showChannel, showViews, showUpload } = props.showInfo;

  const imageURL = thumbnails.maxres ? thumbnails.maxres : thumbnails.standard ? thumbnails.standard : thumbnails.high;
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
    <div className={classes.listCardContainer}>
      <CardActionArea onClick={handleClickOpen}>
        <div className={classes.listVideoThumbnailContainer}>
          <span className={classes.timeDurationLabel}>{duration}</span>

          <Image src={imageURL?.url} />
        </div>
      </CardActionArea>
      <Dialog open={open} onClose={handleClose} maxWidth={false} classes={{ paper: classes.dialog }}>
        <YouTube videoId={id} opts={youtubeOptions} className={classes.youtubeDialog} />
      </Dialog>

      <div className={classes.youtubeContent}>
        <Tooltip title={title} placement="top">
          <Typography variant="subtitle2" style={{ fontSize: '0.8rem' }} className={classes.listTitleText}>
            {showTitle && title}
          </Typography>
        </Tooltip>

        <Typography
          classes={{
            root: classes.root,
          }}
          component="div"
          variant="body2"
          className={`${classes.listInfoText} ${classes.titleText} ${classes.secondaryColor}`}
          onClick={() => openInNewTab(`https://www.youtube.com/channel/${channelId}/`)}>
          {showChannel && cropTitleText(channelTitle)}
        </Typography>
        <Typography variant="body2" component="p" className={`${classes.listInfoText} ${classes.secondaryColor}`}>
          {showViews && viewsCount(viewCount)}
        </Typography>
        <Typography variant="body2" component="p" className={`${classes.listInfoText} ${classes.secondaryColor}`}>
          {showUpload && timeSince(Date.parse(publishedAt))}
        </Typography>
      </div>
    </div>
  );
}
