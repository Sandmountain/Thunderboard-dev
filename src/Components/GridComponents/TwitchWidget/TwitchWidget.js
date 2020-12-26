import { Button, Card, Divider, IconButton, makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import ProgressBolt from '../../ProgressBolt/ProgressBolt';
import CardTopLabel from '../CardTopLabel/CardTopLabel';
import TwitchCard from './TwitchCard';

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles({
  universalConvContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 0,
    display: 'flex',
    flex: 'row',
  },
  followedChannelsContainer: {
    background: '#efeff1',
    padding: '35px 5px',
    height: 'calc(100% - 40px);',
  },
  expanded: {
    width: '20%',
  },
  minimized: {
    width: 'fit-content',
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
    height: 'calc(100% - 35px);',
    width: '100%',
    margin: '30px 0',
    padding: '5px',
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
  tabs: {
    minHeight: 'unset',
  },
  tab: {
    padding: 0,
    minHeight: '34px',
  },
  wrapper: {
    flexDirection: 'row',
    '& svg': {
      paddingRight: '5px',
      placeSelf: 'center',
      marginBottom: '0 !important',
    },
  },
  labelIcon: {},
  indicator: {
    backgroundColor: '#772CE8',
  },
  selectedText: {
    color: '#772CE8 !important',
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
  const [followedChannels, setFollowedChannels] = useState(null);

  const [tabIndex, setTabIndex] = useState(streamType);
  console.log(followedChannels);

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
                  setFollowedChannels([...res.data, ...offlineData]);
                  setLoadingData(false);
                });
              } else {
                setFollowedChannels(res.data);
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
    async function getUserFollowingData() {
      const url = `https://api.twitch.tv/helix/users/follows?from_id=${followedUser}`;

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
            getLiveUserTwitchData(data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }

    async function getTwitchData() {
      const url = `https://api.twitch.tv/helix/streams?first=${nrOfStreams}&language=en`;

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
            setTwitchData(data.data);
            setLoadingData(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (!twitchData) {
      setLoadingData(true);
      getUserFollowingData();
      getTwitchData();
    }
  }, [followedUser, nrOfStreams, authKey, streamType, twitchData, getLiveUserTwitchData]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const classes = useStyles();

  console.log();
  return (
    <Card className={classes.universalConvContainer}>
      <CardTopLabel
        compName="Twitch"
        openSettings={openSettings}
        additionalButton={[
          <Tabs
            classes={{
              root: classes.tabs,
              indicator: classes.indicator,
            }}
            value={tabIndex}
            indicatorColor="secondary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example">
            <Tab
              classes={{
                root: classes.tab,
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selectedText,
              }}
              label="Browse"
              value="browse"
              icon={<SportsEsportsIcon fontSize="small" />}
            />
            <Tab
              classes={{
                root: classes.tab,
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selectedText,
              }}
              label="Top Streams"
              value="topGames"
              icon={<TrendingUpIcon fontSize="small" />}
            />
          </Tabs>,
        ]}
      />
      <div className={`${isDraggable ? 'isDraggableContainer' : ''} ${classes.universalConvContainer}`}>
        {!loadingData ? (
          <>
            <div className={`${classes.followedChannelsContainer} ${classes.expanded}`}></div>
            <div
              className={` ${twitchData ? classes.streamsGrid : classes.twitchReset} ${
                scrollbar && classes.scrollbar
              }`}>
              {twitchData ? (
                twitchData.map((stream, idx) => {
                  return <TwitchCard key={idx} data={stream} />;
                })
              ) : (
                <Button onClick={() => openSettings(5)}> Reset Twitch</Button>
              )}
            </div>
          </>
        ) : (
          <div className={classes.spinnerContainer}>
            <ProgressBolt />
          </div>
        )}
      </div>
    </Card>
  );
}
