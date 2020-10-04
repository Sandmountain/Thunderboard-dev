import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Grid,
  CardActionArea,
  makeStyles,
  Button,
  IconButton,
  Icon,
  Snackbar,
  Slide,
  Chip,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import Image from '../../Image/Image';

import RedditCardContent from './RedditCardContent';

import { openInNewTab, unixTimeSince } from '../../helperFunctions.js';
import { scoreParser } from './functions/redditReader.js';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  author: {
    paddingLeft: '3px',
    color: '#787C7E',
  },
  title: {
    padding: 5,
    fontWeight: '450',
  },
  postContainer: {
    width: '100%',
    borderLeft: '1px solid rgb(218, 224, 230)',
  },
  postDetails: {
    padding: '5px 5px 0px 5px',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  clickArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    paddingBottom: '5px',
  },
  avatarContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingRight: '1.7em',
  },
  redditAvatar: {
    width: '1.4em',
    borderRadius: '50%',
    position: 'absolute',
  },
  upVoteColor: {
    color: '#ff4500',
  },
  downVoteColor: {
    color: '#7193ff',
  },
  subRedditLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '700',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  contentContainer: {
    width: '100%',
  },
  chipsAwardsContainer: {
    padding: 4,
  },
  chipAward: {
    margin: 2,
  },
  cardContainerStyle: {
    maxWidth: '640px',
    margin: '10px auto',
    justifyContent: 'center',
  },
});

export default function RedditCard(props) {
  const {
    author,
    title,
    subreddit,
    subreddit_name_prefixed,
    num_comments,
    permalink,
    all_awardings,
    created_utc,
    score,
  } = props.data;

  const { info } = props;

  const [voteButton, setVoteButton] = useState({ upVote: false, downVote: false });
  const [redditScore, setRedditScore] = useState({ currentScore: 0, initialScore: 0 });
  const [hoverUpButton, setHoverUpButton] = useState(false);
  const [hoverDownButton, setHoverDownButton] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const classes = useStyles();

  // To get correct score when changing filter
  useEffect(() => {
    setRedditScore({ currentScore: score, initialScore: score });
  }, [score]);

  const action = (
    <Button color="secondary" size="small" onClick={() => setCopySuccess(false)}>
      close
    </Button>
  );

  const handleClick = (event) => {
    if (event === 'up') {
      if (!voteButton.upVote) {
        setRedditScore({ ...redditScore, currentScore: redditScore.initialScore + 1 });
      } else {
        setRedditScore({ ...redditScore, currentScore: redditScore.initialScore });
      }
      setVoteButton({ downVote: false, upVote: !voteButton.upVote });
    }
    if (event === 'down') {
      if (!voteButton.downVote) {
        setRedditScore({ ...redditScore, currentScore: redditScore.initialScore - 1 });
      } else {
        setRedditScore({ ...redditScore, currentScore: redditScore.initialScore });
      }
      setVoteButton({ downVote: !voteButton.downVote, upVote: false });
    }
  };

  const copyToClipboard = async (copyText) => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <Card className={classes.cardContainerStyle}>
      <Grid style={{ display: 'flex' }}>
        <div style={{ width: '55px', textAlign: 'center' }}>
          <IconButton
            onMouseEnter={() => setHoverUpButton(true)}
            onMouseLeave={() => setHoverUpButton(false)}
            className={`${voteButton.upVote && classes.upVoteColor} ${hoverUpButton && classes.upVoteColor}`}
            size="small"
            onClick={() => handleClick('up')}>
            <Icon fontSize="small">arrow_drop_up</Icon>
          </IconButton>

          <Typography>
            <strong>{scoreParser(redditScore.currentScore)}</strong>
          </Typography>
          <IconButton
            onMouseEnter={() => setHoverDownButton(true)}
            onMouseLeave={() => setHoverDownButton(false)}
            size="small"
            onClick={() => handleClick('down')}>
            <Icon
              className={`${voteButton.downVote && classes.downVoteColor} ${hoverDownButton && classes.downVoteColor}`}
              fontSize="small">
              arrow_drop_down
            </Icon>
          </IconButton>
        </div>
        <div className={classes.postContainer}>
          <Typography className={classes.postDetails}>
            <a className={classes.subRedditLink} href={`http://reddit.com/'${subreddit_name_prefixed}`}>
              <span className={classes.avatarContainer}>
                <img className={classes.redditAvatar} src={info[subreddit]} alt={''}></img>{' '}
              </span>
              {subreddit_name_prefixed}
            </a>

            <span className={classes.author}>
              {' '}
              • Posted by u/{author} {unixTimeSince(created_utc)}
            </span>
          </Typography>
          <CardActionArea className={classes.clickArea} onClick={() => openInNewTab(permalink, 'http://reddit.com')}>
            <Typography className={classes.title}>{title}</Typography>
          </CardActionArea>
          <RedditCardContent post={props.data} className={classes.contentContainer} />

          <div className={classes.chipsAwardsContainer}>
            {all_awardings.map((award, key) => {
              return (
                <Tooltip key={key} title={award.name} aria-label={award.name} placement="top">
                  <Chip
                    className={classes.chipAward}
                    size="small"
                    avatar={<Avatar alt={award.name} src={award.static_icon_url} />}
                    label={<strong> {award.count} </strong>}
                    variant="outlined"
                  />
                </Tooltip>
              );
            })}
          </div>
          <div>
            <Button
              onClick={() => openInNewTab(permalink, 'http://reddit.com')}
              size={'small'}
              startIcon={<Icon>comment</Icon>}>
              {num_comments} Comments
            </Button>
            <Button
              size={'small'}
              startIcon={<Icon>share</Icon>}
              onClick={() => copyToClipboard(`http://reddit.com${permalink}`)}>
              Share
            </Button>
          </div>
        </div>
      </Grid>
      <Snackbar
        key={title}
        open={copySuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        severity="success"
        autoHideDuration={4000}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        onClose={() => setCopySuccess(false)}
        action={action}>
        <Alert severity="info" variant="filled">
          Link copied to clipboard
        </Alert>
      </Snackbar>
    </Card>
  );
}
