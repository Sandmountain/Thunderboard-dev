import { IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { updateFirestoreCollection } from '../../../../Firestore/FirestoreFunctions';
import ProgressBolt from '../../../ProgressBolt/ProgressBolt';
import { getLiveUserTwitchData } from '../helperFunctions/fetchTwitchData';
import { useResize } from '../helperFunctions/resizeHook';

import CloseIcon from './icons/CloseIcon';
import OpenIcon from './icons/OpenIcon';
import TwitchUserCardClosed from './TwitchUserCardClosed';
import TwitchUserCardOpen from './TwitchUserCardOpen';

const useStyles = makeStyles({
  followedChannelsContainer: {
    position: 'relative',
    background: '#efeff1',
    padding: '35px 0px',
    height: 'calc(100% - 40px)',
  },
  hiddenScrollbar: {
    // 0.8 rem from the icon container, and 5px from its padding
    height: 'calc(100% - 0.8em - 5px)',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  spinnerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expanded: {
    width: '25%',
  },
  minimized: {
    width: 'calc(1rem + 20px)',
  },
  expandIcon: {
    position: 'absolute',
    right: 5,
    marginButton: 5,
  },
  closedIcon: {
    position: 'absolute',
    right: 5,
    marginButton: 5,
  },
  openIcon: {
    height: '1rem',
    width: '1rem',
  },
});

const nrOfStreams = 10;

export default function TwitchSideBar({ setSettings, authKey, openSideBar, settings, followedUser }) {
  const classes = useStyles();
  const [useSideBar, setUseSideBar] = useState(openSideBar);
  const [followedChannels, setFollowedChannels] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  const sideBarRef = React.createRef();
  const { sidebarWidth } = useResize(sideBarRef);

  useEffect(() => {
    let isSubscribed = true;
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
            if (isSubscribed) {
              getLiveUserTwitchData(data.data, authKey, setFollowedChannels, setLoadingUserData, nrOfStreams);
              setLoadingUserData(false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (!followedChannels) {
      setLoadingUserData(true);
      getUserFollowingData();
    }
    return () => (isSubscribed = false);
  }, [authKey, followedUser, followedChannels]);

  useEffect(() => {
    if (sidebarWidth < 130) {
      setUseSideBar(false);
    }
  }, [sidebarWidth]);

  const toggleSideBar = () => {
    updateFirestoreCollection({
      twitchSettings: { ...settings.twitchSettings, openSideBar: !useSideBar },
    });
    setUseSideBar(!useSideBar);
  };

  return (
    <div
      ref={sideBarRef}
      className={`${classes.followedChannelsContainer} ${useSideBar ? classes.expanded : classes.minimized}`}>
      <div style={{ position: 'relative', display: 'flex', height: '0.8em', margin: '5px 0', alignItems: 'center' }}>
        {useSideBar && (
          <Typography variant="button" style={{ fontSize: '.65rem', marginLeft: 5 }}>
            FOLLOWED CHANNELS
          </Typography>
        )}
        <IconButton
          size="small"
          className={`${useSideBar ? classes.expandIcon : classes.closedIcon}`}
          onClick={toggleSideBar}>
          {useSideBar ? <CloseIcon size={'1rem'}></CloseIcon> : <OpenIcon size={'1rem'}></OpenIcon>}
        </IconButton>
      </div>
      {!loadingUserData && followedChannels !== null ? (
        <div className={classes.hiddenScrollbar}>
          {useSideBar
            ? followedChannels.map((channel, idx) => {
                return <TwitchUserCardOpen key={idx} data={channel} />;
              })
            : followedChannels.map((channel, idx) => {
                return <TwitchUserCardClosed key={idx} data={channel} />;
              })}
        </div>
      ) : (
        <div className={classes.spinnerContainer}>
          <ProgressBolt />
        </div>
      )}
    </div>
  );
}
