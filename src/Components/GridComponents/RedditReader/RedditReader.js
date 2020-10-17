import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { shuffleArray } from './functions/redditReader';

import RedditCard from './RedditCard';
import RedditFilter from './RedditFilter';

import { Card, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  innerPadding: {
    padding: '5px',
  },
  wrapperCard: {
    height: '100%',
    borderRadius: 0,
    width: '100%',
    overflowY: 'auto',
    backgroundColor: '#dae0e6',
  },
  filterContainer: {
    maxWidth: '630px',
    margin: '0 auto',
    padding: '5px',
  },
  progressCircle: {
    maxWidth: '630px',
    padding: '5px',
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
});

export default function RedditReader({ subreddits, nrOfPosts, shufflePosts, isDraggable }) {
  const [redditData, setRedditData] = useState([]);
  const [redditInfo, setRedditInfo] = useState({});
  const [activeFilter, setActiveFilter] = useState({ type: 'hot', time: 'today' });
  const [contentLoaded, setContentLoaded] = useState(false);
  const classes = useStyles();

  const getRedditData = useCallback(() => {
    try {
      const result = [];
      let subRedditInfo = {};

      subreddits.forEach(async (subreddit) => {
        result.push(
          ...(await axios
            .get(
              `https://www.reddit.com/r/${subreddit.name}/${activeFilter.type}.json?t=${activeFilter.time}&limit=${nrOfPosts}`
            )
            .then((res) => res.data.data.children))
        );
        // comments can be retriaw  ved from like: https://www.reddit.com/r/cursedcomments/comments/itacb7/.json
        subRedditInfo[subreddit.name] = await axios
          .get(`https://www.reddit.com/r/${subreddit.name}/about.json`)
          .then((res) => res.data.data.icon_img);
      });

      //TODO: Remove this code
      setTimeout(() => {
        setContentLoaded(true);
        setRedditInfo(subRedditInfo);
        setRedditData(result);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, [activeFilter, subreddits, nrOfPosts]);

  useEffect(() => {
    setContentLoaded(false);
    getRedditData();
  }, [getRedditData]);

  return (
    <Card className={classes.wrapperCard}>
      <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
        <Card className={classes.filterContainer}>
          <RedditFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </Card>
        {contentLoaded ? (
          <>
            {shufflePosts
              ? shuffleArray(redditData).map((item, idx) => {
                  return <RedditCard data={item.data} info={redditInfo} key={idx} />;
                })
              : redditData.map((item, idx) => {
                  return <RedditCard data={item.data} info={redditInfo} key={idx} />;
                })}
          </>
        ) : (
          <Card className={classes.progressCircle}>
            <CircularProgress />
          </Card>
        )}
      </div>
    </Card>
  );
}
