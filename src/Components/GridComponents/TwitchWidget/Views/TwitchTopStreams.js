import { Fade, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ProgressBolt from '../../../ProgressBolt/ProgressBolt';
import TwitchCard from '../StreamCards/TwitchCard';

const useStyles = makeStyles({
  spinnerContainer: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.6)',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  gamesContainer: {
    height: 'calc(100% - 45px);',
    width: '100%',
    margin: '35px 0',
    padding: '10px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  scrollbar: {
    overflowY: 'auto',
  },
  streamsGrid: {
    display: 'grid',
    position: 'relative',
    height: '100%',
    width: '100%',
    gap: '7px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  },
  twitchReset: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function TwitchTopStreams({ scrollbar, followedUser, nrOfStreams, authKey, streamType, openSettings }) {
  const [twitchData, setTwitchData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const [paginationKey, setPaginationKey] = useState('');

  const classes = useStyles();

  const getMoreStreams = async () => {
    setLoadingData(true);
    const url = `https://api.twitch.tv/helix/streams?first=${nrOfStreams}&after=${paginationKey}`;

    try {
      fetch(url, {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${authKey}`,
          'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then((data) => {
          setLoadingData(false);
          if (twitchData) {
            setTwitchData([...twitchData, ...data.data]);
            setPaginationKey(data.pagination.cursor);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getTopTwitchData() {
      //Only english streams &language=en
      const url = `https://api.twitch.tv/helix/streams?first=${nrOfStreams}`;
      let isSubscribed = true;
      try {
        fetch(url, {
          method: 'get',
          headers: new Headers({
            Authorization: `Bearer ${authKey}`,
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then((data) => {
            if (isSubscribed) {
              setLoadingData(false);
              setTwitchData(data.data);
              setPaginationKey(data.pagination.cursor);
            }
          });
      } catch (error) {
        console.log(error);
      }
      return () => (isSubscribed = false);
    }

    if (!twitchData) {
      setLoadingData(true);

      getTopTwitchData();
    }
  }, [followedUser, authKey, nrOfStreams, twitchData]);

  return (
    <>
      <div className={classes.gamesContainer}>
        <InfiniteScroll
          className={classes.streamsGrid}
          pageStart={0}
          initialLoad={false}
          loadMore={getMoreStreams}
          hasMore={true || false}
          useWindow={false}>
          {twitchData &&
            twitchData.map((stream, idx) => {
              return <TwitchCard key={idx} data={stream} />;
            })}
        </InfiniteScroll>
      </div>

      <Fade in={loadingData}>
        <div className={classes.spinnerContainer}>
          <ProgressBolt />
        </div>
      </Fade>
    </>
  );
}
