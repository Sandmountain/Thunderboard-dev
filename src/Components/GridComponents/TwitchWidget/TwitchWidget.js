import { Button, Card, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import ProgressBolt from '../../ProgressBolt/ProgressBolt';
import CardTopLabel from '../CardTopLabel/CardTopLabel';
import TwitchCard from './TwitchCard';

const useStyles = makeStyles({
  universalConvContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 0,
  },
  spinnerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbar: {
    overflowY: 'auto',
  },
  streamsGrid: {
    height: '100%',
    padding: '35px 5px',
    gap: '5px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
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

export default function TwitchWidget({
  authKey,
  nrOfStreams,
  streamType,
  followedUser,
  scrollbar,
  isDraggable,
  openSettings,
}) {
  const [twitchData, setTwitchData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const getOfflineUserTwitchData = useCallback(
    async (data, followedChannels) => {
      const offlineChannels = followedChannels
        .filter((channel) => !data.find((liveChannel) => channel.to_id === liveChannel.user_id))
        .reduce((prev, curr, idx) => {
          return !idx ? '?id=' + curr.to_id : prev + '&id=' + curr.to_id;
        }, String);
      try {
        return fetch(`https://api.twitch.tv/helix/users${offlineChannels}`, {
          method: 'get',
          headers: new Headers({
            Authorization: `Bearer ${authKey}`,
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then((res) => {
            return res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    [authKey]
  );

  const getLiveUserTwitchData = useCallback(
    (followedChannels) => {
      try {
        const getStreams = followedChannels.reduce((prev, curr, idx) => {
          if (idx === 0) {
            return '?user_login=' + curr.to_name;
          } else {
            return prev + '&user_login=' + curr.to_name;
          }
        }, '');

        try {
          fetch(`https://api.twitch.tv/helix/streams${getStreams}`, {
            method: 'get',
            headers: new Headers({
              Authorization: `Bearer ${authKey}`,
              'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
            }),
          })
            .then(function (res) {
              return res.json();
            })
            .then((res) => {
              if (res.data.length < nrOfStreams) {
                getOfflineUserTwitchData(res.data, followedChannels).then((offlineData) => {
                  setTwitchData([...res.data, ...offlineData]);
                  setLoadingData(false);
                });
              } else {
                setTwitchData(res.data);
                setLoadingData(false);
              }
            });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error('Twitch not autenticated. Try resetting your twitch settings and generate a new key');
        setLoadingData(false);
        return;
      }
    },

    [authKey, getOfflineUserTwitchData, nrOfStreams]
  );

  useEffect(() => {
    async function getTwitchData() {
      const url =
        streamType === 'user'
          ? `https://api.twitch.tv/helix/users/follows?from_id=${followedUser}`
          : `https://api.twitch.tv/helix/streams?first=${nrOfStreams}&language=en`;

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
            if (streamType === 'user') {
              getLiveUserTwitchData(data.data);
            } else {
              setTwitchData(data.data);
              setLoadingData(false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (!twitchData) {
      setLoadingData(true);
      getTwitchData();
    }
  }, [followedUser, nrOfStreams, authKey, streamType, twitchData, getLiveUserTwitchData]);
  const classes = useStyles();

  console.log();
  return (
    <Card className={classes.universalConvContainer}>
      <CardTopLabel compName="Twitch" openSettings={openSettings} />
      {!loadingData ? (
        <div
          className={`${isDraggable && 'isDraggableContainer'} ${
            twitchData ? classes.streamsGrid : classes.twitchReset
          } ${scrollbar && classes.scrollbar}`}>
          {twitchData ? (
            twitchData.map((stream, idx) => {
              return <TwitchCard key={idx} data={stream} />;
            })
          ) : (
            <Button onClick={() => openSettings(5)}> Reset Twitch</Button>
          )}
        </div>
      ) : (
        <div className={classes.spinnerContainer}>
          <ProgressBolt />
        </div>
      )}
    </Card>
  );
}
