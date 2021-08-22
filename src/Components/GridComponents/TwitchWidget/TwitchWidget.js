import { Card, makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CardTopLabel from '../CardTopLabel/CardTopLabel';

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TwitchSideBar from './SideBar/TwitchSideBar';
import TwitchTopGames from './Views/TwitchTopGames';
import TwitchTopStreams from './Views/TwitchTopStreams';
import { getUserData } from '../../Dialogs/SettingsTabs/helperFunctions/twitchHelper';
import { resetInvalidToken } from './helperFunctions/fetchTwitchData';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

const useStyles = makeStyles({
  universalConvContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 0,
    display: 'flex',
    flex: 'row',
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
  indicator: {
    backgroundColor: '#772CE8',
  },
  selectedText: {
    color: '#772CE8 !important',
  },
  expandIcon: {
    position: 'absolute',
    right: 5,
  },
  openIcon: {
    height: '1rem',
    width: '1rem',
  },
});

const nrOfStreams = 50;
export default function TwitchWidget({
  authKey,
  streamType,
  followedUser,
  openSideBar,
  scrollbar,
  isDraggable,
  settings,
  setSettings,
  openSettings,
}) {
  const [tabIndex, setTabIndex] = useState(streamType);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Make sure that the user is authenticated
    async function getAuthedUser() {
      try {
        const data = await getUserData('https://api.twitch.tv/helix/users', authKey);
        //console.log(data);
        if (data) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
          resetInvalidToken(setSettings, settings, updateFirestoreCollection);
        }
      } catch (error) {
        resetInvalidToken(setSettings, settings, updateFirestoreCollection);
      }
    }
    if (!isAuthed && authKey !== '') {
      getAuthedUser();
    }
  }, [isAuthed, authKey, setSettings, settings]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const classes = useStyles();

  return (
    <Card className={classes.universalConvContainer}>
      <CardTopLabel
        compName="Twitch"
        openSettings={openSettings}
        noGutter
        additionalButton={[
          <Tabs
            key={'tab'}
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
              key="browse"
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
              key="topGames"
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
        {isAuthed && (
          <>
            <TwitchSideBar
              setSettings={setSettings}
              openSideBar={openSideBar}
              authKey={authKey}
              settings={settings}
              followedUser={followedUser}></TwitchSideBar>
            {tabIndex === 'browse' ? (
              <TwitchTopGames
                scrollBar={scrollbar}
                followedUser={followedUser}
                nrOfStreams={nrOfStreams}
                authKey={authKey}
                streamType={streamType}
                openSettings={openSettings}
              />
            ) : (
              <TwitchTopStreams
                scrollBar={scrollbar}
                followedUser={followedUser}
                nrOfStreams={nrOfStreams}
                authKey={authKey}
                streamType={streamType}
                openSettings={openSettings}
              />
            )}
          </>
        )}
      </div>
    </Card>
  );
}
