import { Fade, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ProgressBolt from '../../../ProgressBolt/ProgressBolt';
import TwitchOnlineStream from '../StreamCards/TwitchOnlineStream';

const useStyles = makeStyles({});

export default function TwitchGameStreams({ gameID, authKey, showStreams }) {
  const [twitchStreamData, setTwitchStreamData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [paginationKey, setPaginationKey] = useState('');

  const classes = useStyles();

  const getMoreStreams = async () => {
    setLoadingData(true);
    const url = `https://api.twitch.tv/helix/streams?game_id=${gameID}&after=${paginationKey}`;

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
          console.log('called');
          if (twitchStreamData) {
            setTwitchStreamData([...twitchStreamData, ...data.data]);
            setPaginationKey(data.pagination.cursor);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //setTwitchData(null);
    async function getTopGameTwitchData() {
      const url = `https://api.twitch.tv/helix/streams?game_id=${gameID}`;
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
              setLoadingData(data.data);
              console.log(data.data);
              setPaginationKey(data.pagination.cursor);
            }
          });
      } catch (error) {
        console.log(error);
      }
      return () => (isSubscribed = false);
    }
    if (!twitchStreamData) {
      setLoadingData(true);
      getTopGameTwitchData();
    }
  }, [authKey, gameID, twitchStreamData]);

  return (
    <>
      <div className={classes.gamesContainer}>
        <InfiniteScroll
          className={classes.grid}
          pageStart={0}
          initialLoad={false}
          loadMore={getMoreStreams}
          hasMore={true || false}
          useWindow={false}>
          {twitchStreamData &&
            twitchStreamData.map((data, idx) => {
              return <TwitchOnlineStream data={data} key={idx} />;
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
