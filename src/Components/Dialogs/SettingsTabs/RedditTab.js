import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { openInNewTab } from '../../helperFunctions';

const marks = (min, max) => {
  return [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];
};

const useStyles = makeStyles({
  circularProgress: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function RedditTab({ settings, testChanges, setSettings }) {
  const classes = useStyles();
  console.log(settings);
  const { shufflePosts, nrOfPosts, subreddits } = settings.redditSettings;
  const [loadingNewSubreddit, setLoadingNewSubreddit] = useState(false);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  // TODO: Move this to when everthing is loaded in the start. This creates memory leak
  const loadRedditData = useCallback(async () => {
    if (subreddits[subreddits.length - 1].url === '') {
      setLoadingNewSubreddit(true);

      const loadRedditData = await Promise.all(
        subreddits.map(async (subreddit) => {
          const data = await axios
            .get(`https://www.reddit.com/r/${subreddit.name}/about.json`)
            .then((res) => res.data.data);

          return {
            name: subreddit.name,
            subreddit: data.display_name_prefixed,
            url: data.icon_img,
            title: data.title,
            description: data.public_description,
            genre: data.advertiser_category,
          };
        })
      );
      //setTempSubreddit(loadRedditData);
      console.log(settings);
      setSettings({
        ...settings,
        redditSettings: {
          ...settings.redditSettings,
          subreddits: [...loadRedditData],
        },
      });
      setLoadingNewSubreddit(false);
    }
  }, [subreddits, settings, setSettings]);

  useEffect(() => {
    loadRedditData();
  }, [loadRedditData]);

  const validateSubReddit = async () => {
    try {
      setInputError(false);
      setLoadingNewSubreddit(true);

      const newSubReddit = await axios.get(`https://www.reddit.com/r/${input}/about.json`).then((res) => ({
        name: input,
        url: res.data.data.icon_img,
        title: res.data.data.title,
        subreddit: res.data.data.display_name_prefixed,
        description: res.data.data.public_description,
        genre: res.data.data.advertiser_category,
      }));

      if (newSubReddit) {
        setLoadingNewSubreddit(false);
        setSettings({
          ...settings,
          redditSettings: {
            ...settings.redditSettings,
            subreddits: [newSubReddit, ...settings.redditSettings.subreddits],
          },
        });
        return true;
      } else {
        setLoadingNewSubreddit(false);
        return false;
      }
    } catch (error) {
      setLoadingNewSubreddit(false);
      setInputError(true);
      setInputErrorMessage('Please enter a valid subreddit');
      return false;
    }
  };

  const handleNewSubreddit = async (e) => {
    e.preventDefault();
    setInput('');
    await validateSubReddit();
  };
  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const testValue = () => {
    testChanges();
  };

  const handleDeleteSubreddit = (subreddit) => {
    const newSubredditList = subreddits.filter((sub) => sub.name !== subreddit.name);
    if (newSubredditList.length > 0) {
      setSettings({
        ...settings,
        redditSettings: {
          ...settings.redditSettings,
          subreddits: [...newSubredditList],
        },
      });
    } else {
      setInputError(true);
      setInputErrorMessage('You need at least one subreddit in your list');
    }
  };

  const handleCheckbox = (type) => {
    setSettings({
      ...settings,
      redditSettings: {
        ...settings.redditSettings,
        shufflePosts: !settings.redditSettings.shufflePosts,
      },
    });
  };

  const handleSlider = (val) => {
    setSettings({
      ...settings,
      redditSettings: {
        ...settings.redditSettings,
        nrOfPosts: val,
      },
    });
  };

  return (
    <>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Reddit settings
          <Button variant="outlined" onClick={() => testValue()}>
            {' '}
            Test Changes
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <FormControlLabel
          style={{ width: '40%' }}
          control={<Checkbox checked={shufflePosts} onChange={() => handleCheckbox()} name="Shuffle Posts" />}
          label="Shuffle Posts"
        />
        <form onSubmit={handleNewSubreddit} noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Enter the name of a new subreddit"
            value={input}
            onChange={handleInput}
            error={inputError ? true : false}
            helperText={
              inputError ? inputErrorMessage : subreddits.length + ' subreddits currently following'
            }></TextField>
        </form>
        <List
          dense
          style={{
            overflowY: 'auto',
            height: '140px',
            padding: 0,
            marginTop: 8,
            marginBottom: 8,
          }}>
          {!loadingNewSubreddit ? (
            subreddits.map((subreddit, idx) => {
              return (
                <ListItem key={idx} button onClick={() => openInNewTab(subreddit.subreddit, 'http://reddit.com/')}>
                  <ListItemAvatar>
                    {subreddit.url !== '' ? (
                      <Avatar src={subreddit.url} />
                    ) : (
                      <Avatar> {subreddit.name.substring(0, 1).toUpperCase()}</Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={subreddit.subreddit} secondary={' — ' + subreddit.title} />

                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDeleteSubreddit(subreddit)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <div className={classes.circularProgress}>
              <CircularProgress />
            </div>
          )}
        </List>
      </DialogContent>
      <DialogContent>
        <DialogContentText>Other options</DialogContentText>

        <Typography gutterBottom>Number of posts per sub</Typography>
        <Slider
          value={nrOfPosts}
          onChange={(e, val) => handleSlider(val)}
          valueLabelDisplay="auto"
          marks={marks(1, 25)}
          step={1}
          min={1}
          max={25}
        />
      </DialogContent>
    </>
  );
}
