import { CardActionArea, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import { openInNewTab } from '../../helperFunctions';
import Image from '../../Image/Image';

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
    maxHeight: '80px',
    minWidth: '128px',
    overflow: 'hidden',
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
  isOfflineLabel: {
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
    backgroundColor: 'rgb(50, 50, 50)',
    padding: '1px 3px',
    margin: '2px',
  },
  secondaryColor: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.8rem',
  },
});

export default function TwitchOfflineStream(props) {
  const { offline_image_url, display_name, view_count } = props.data;

  const classes = useStyles();
  return (
    <>
      <div>
        <CardActionArea onClick={() => openInNewTab(`https://www.twitch.tv/${display_name}`)}>
          <div className={classes.listVideoThumbnailContainer}>
            <span className={classes.isOfflineLabel}>{'offline'}</span>
            <Image src={offline_image_url} />
          </div>
        </CardActionArea>
      </div>
      <div className={classes.youtubeContent}>
        <Typography variant="subtitle2" style={{ fontSize: '0.8rem' }} className={classes.listTitleText}>
          {display_name}
        </Typography>

        <Typography variant="body2" className={`${classes.listInfoText} ${classes.secondaryColor}`}>
          {parseViewers(view_count) + ' views'}
        </Typography>
      </div>
    </>
  );
}
