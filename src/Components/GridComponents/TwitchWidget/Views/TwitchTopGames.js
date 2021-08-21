import { Avatar, Button, CardActionArea, Divider, Fade, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import ProgressBolt from '../../../ProgressBolt/ProgressBolt';
import TwitchCard from '../StreamCards/TwitchCard';

import InfiniteScroll from 'react-infinite-scroller';

import TwitchGameCard from '../StreamCards/TwitchGameCard';
import TwitchOnlineStream from '../StreamCards/TwitchOnlineStream';
import { ArrowBack } from '@material-ui/icons';
import { openInNewTab } from '../../../helperFunctions';

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
  scrollbar: {
    overflowY: 'auto',
  },
  gamesContainer: {
    height: 'calc(100% - 45px);',
    width: '100%',
    margin: '35px 0',
    padding: '10px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  twitchReset: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    display: 'grid',
    position: 'relative',
    height: '100%',
    width: '100%',
    gap: '7px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  },
  listTitleText: {
    lineHeight: 1,
    marginBottom: 7,
  },
});

export default function TwitchTopGames({ followedUser, nrOfStreams, authKey }) {
  const [twitchGameData, setTwitchGameData] = useState(null);
  const [twitchGameStreams, setTwitchGameStreams] = useState(null);

  const [loadingData, setLoadingData] = useState(false);
  const [paginationKey, setPaginationKey] = useState('');
  const [showGames, setShowGames] = useState(true);
  const [fetchUrl, setFetchUrl] = useState(showGames && `https://api.twitch.tv/helix/games/top?first=${nrOfStreams}`);

  const [currentGame, setCurrentGame] = useState(null);

  const twitchRef = useRef();
  const classes = useStyles();

  const getMoreGames = async () => {
    setLoadingData(true);
    const url = `${fetchUrl}&after=${paginationKey}`;

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
          if (showGames) {
            if (twitchGameData) {
              setTwitchGameData([...twitchGameData, ...data.data]);
              setPaginationKey(data.pagination.cursor);
            }
          } else {
            if (twitchGameStreams) {
              setTwitchGameStreams([...twitchGameStreams, ...data.data]);
              setPaginationKey(data.pagination.cursor);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getTopGameTwitchData() {
      const url = fetchUrl;
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
              if (showGames) {
                setTwitchGameData(data.data);
                setPaginationKey(data.pagination.cursor);
              } else {
                setTwitchGameStreams(data.data);
                setPaginationKey(data.pagination.cursor);
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
      return () => (isSubscribed = false);
    }
    if (!twitchGameData) {
      setLoadingData(true);
      getTopGameTwitchData();
    }
  }, [followedUser, nrOfStreams, authKey, twitchGameData, showGames, fetchUrl]);

  const showStreams = (clickedGame) => {
    twitchRef.current.scrollTo(0, 0);
    setCurrentGame(clickedGame);
    setShowGames(false);
    setTwitchGameData(null);
    setFetchUrl('https://api.twitch.tv/helix/streams?first=' + nrOfStreams + '&game_id=' + clickedGame.id);
  };

  const resetToGames = () => {
    twitchRef.current.scrollTo(0, 0);
    setShowGames(true);
    setCurrentGame(null);
    setTwitchGameData(null);
    setFetchUrl('https://api.twitch.tv/helix/games/top?first=' + nrOfStreams);
  };

  return (
    <>
      <div className={classes.gamesContainer} ref={twitchRef}>
        {!showGames && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  style={{ height: '3em', width: '3em', cursor: 'pointer' }}
                  alt="current game"
                  src={currentGame.url}
                  onClick={() => openInNewTab(`https://www.twitch.tv/directory/game/${currentGame.name}`)}
                />
                <Typography variant="h5" style={{ marginLeft: 5 }}>
                  {currentGame.name}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" onClick={resetToGames}>
                  <ArrowBack />
                </IconButton>
              </div>
            </div>
            <Divider style={{ margin: '7px 0' }}></Divider>
          </>
        )}
        <InfiniteScroll
          className={classes.grid}
          pageStart={0}
          initialLoad={false}
          loadMore={getMoreGames}
          hasMore={true || false}
          useWindow={false}>
          <>
            {showGames
              ? twitchGameData &&
                twitchGameData.map((game, idx) => {
                  return <TwitchGameCard game={game} key={idx} onClick={showStreams} />;
                })
              : twitchGameStreams &&
                twitchGameStreams.map((game, idx) => {
                  return <TwitchOnlineStream data={game} key={idx} onClick={showStreams} />;
                })}
          </>
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
