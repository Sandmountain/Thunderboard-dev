import { Button, CardActionArea, Dialog, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

import { openInNewTab } from '../../../helperFunctions';
import Image from '../../../Image/Image';
import TwitchStreamPopup from '../TwitchStreamPopup';

import '../styles/styles.css';

const parseThumbnails = (url) => {
  return url.replace('{width}', 640).replace('{height}', 360);
};
const parseViewers = (nr) => {
  return nr.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

const useStyles = makeStyles({
  youtubeContent: {
    padding: 2,
    height: '100%',
    flex: '0 1 auto',
    position: 'relative',
  },
  listVideoThumbnailContainer: {
    width: '100%',
    height: '80px',
    //minWidth: '128px',
    //overflow: 'hidden',
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
    bottom: 4,
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
  backdrop: {
    background: 'rgba(0, 0, 0, 0.85) ',
  },
  secondaryColor: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  streamThumbnail: {
    height: 80,
    width: '100%',
  },
});

export default function TwitchOnlineStream(props) {
  const { thumbnail_url, viewer_count, title, type, user_name } = props.data;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <div className={`stream ${classes.listVideoThumbnailContainer}`} onClick={() => handleClickOpen()}>
          <div className={'stream__thumbnail'}>
            <Typography className={classes.isLiveLabel}>{type}</Typography>
            <Typography className={classes.viewersLabel}>
              {parseViewers(viewer_count?.toString()) + ' viewers'}
            </Typography>
            <img src={parseThumbnails(thumbnail_url)} alt="thumbnail" className={`${classes.streamThumbnail}`} />
          </div>
        </div>

        <TwitchStreamPopup open={open} handleClose={handleClose} user_name={user_name}></TwitchStreamPopup>
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
