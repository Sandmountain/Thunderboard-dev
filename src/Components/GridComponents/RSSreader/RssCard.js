import { CardActionArea, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { openInNewTab } from '../../helperFunctions';
import Image from '../../Image/Image';

const useStyles = makeStyles({
  listCardContainer: {
    width: '100%',
    padding: '5px 0',
    display: 'flex',
    flexFlow: 'column',
  },

  articleContent: {
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
});

const cropContentText = (text) => {
  if (text.length > 50) {
    return text.substring(0, 50) + '...';
  } else {
    return text;
  }
};

export default function RssCard({ showContent, showImage, showTitle, title, src, url, layout, date, content }) {
  const classes = useStyles();

  return (
    <div className={classes.listCardContainer}>
      {showImage && (
        <div>
          {src ? (
            <CardActionArea onClick={() => openInNewTab(url)}>
              <div className={classes.listVideoThumbnailContainer}>
                <Image src={src} />
              </div>
            </CardActionArea>
          ) : (
            <CardActionArea onClick={() => openInNewTab(url)}>
              <div className={classes.listVideoThumbnailContainer}>
                <Image src={require('./aftonbladet.jpg')} />
              </div>
            </CardActionArea>
          )}
        </div>
      )}
      <div className={classes.articleContent}>
        <Typography
          variant="subtitle2"
          style={{ fontSize: '0.8rem' }}
          className={classes.listTitleText}
          onClick={() => openInNewTab(url)}>
          {showTitle && title}
        </Typography>

        <Typography
          variant="body2"
          style={{ fontSize: '0.7rem' }}
          className={`${classes.listInfoText} ${classes.secondaryColor}`}>
          {showContent && cropContentText(content)}
        </Typography>
      </div>
    </div>
  );
}

/*

*/
