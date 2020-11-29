import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { cleanIframe } from '../../helperFunctions.js';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ProgressBolt from '../../ProgressBolt/ProgressBolt.js';

const useStyles = makeStyles({
  cardImage: {},
  cardVideo: {},
  cardEmbedded: {
    maxHeight: '512px',
  },
  contentContainer: {
    width: '100%',
  },
  textContainer: {
    padding: '5px',
  },
  linkContainer: {
    display: ' flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  linkText: {
    color: '#3f9ade',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
});

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}

export default function RedditCardContent(props) {
  const classes = useStyles();
  const post = props.post;
  return (
    <Typography component={'div'} className={post.post_hint ? classes.contentContainer : classes.textContainer}>
      {(() => {
        // Determine the media type using post_hint.
        if (!post.post_hint) {
          return <Typography variant="body2" dangerouslySetInnerHTML={{ __html: htmlDecode(post.selftext_html) }} />;
        }
        switch (post.post_hint) {
          case 'image':
            return (
              <a href={post.url}>
                <img
                  alt={post.title}
                  className="card-image"
                  debounce={500}
                  error="error.png"
                  src={post.url}
                  placeholder={<ProgressBolt />}
                  width="100%"
                />
              </a>
            );
          case 'hosted:video':
            return (
              // eslint-disable-next-line
              <video
                className={classes.cardVideo}
                autoPlay
                controls={0}
                loop
                muted
                playsInline
                src={post.secure_media.reddit_video.fallback_url}
                width="100%"
              />
            );
          case 'rich:video':
            return (
              <div
                src={post.url}
                className={classes.cardEmbedded}
                dangerouslySetInnerHTML={{
                  __html: cleanIframe(post.media.oembed.html),
                }}
              />
            );
          case 'link':
            // Search for .gifv....
            if (post.url.includes('gifv')) {
              return (
                // eslint-disable-next-line
                <video
                  className={classes.cardVideo}
                  controls={0}
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={post.url.replace('.gifv', '.mp4')} // Replace .gifv with .mp4.
                  width="100%"></video>
              );
            } else {
              // No .gifv?, then just display the thumbnail.
              //return <img className="card-image" src={post.thumbnail} alt={post.title} />;
              return (
                <div className={classes.linkContainer}>
                  <Typography variant="body2" className={classes.ellipsis}>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className={classes.linkText}>
                      {'https://' + post.domain + '/'}
                      <OpenInNewIcon style={{ verticalAlign: 'text-bottom' }} fontSize={'small'} />
                    </a>
                  </Typography>
                  <img className="card-image" src={post.thumbnail} alt={post.title} />
                </div>
              );
            }
          default:
            break;
        }
      })()}
    </Typography>
  );
}
