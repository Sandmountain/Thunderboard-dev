import React, { useContext, useState } from 'react';
import StaticClock from '../GridComponents/TimeDate/StaticClock';
import { Card, Button, makeStyles } from '@material-ui/core';
import StaticWeatherWidget from '../GridComponents/WeatherWidget/StaticWeatherWidget';
import UniversalConverter from '../GridComponents/UniversalConverter/UniversalConverter';
import AppBar from '../GridComponents/AppBar/AppBar';
import TwitchWidget from '../GridComponents/TwitchWidget/TwitchWidget';
import { SettingsContext } from '../../Context/SettingsContext';
import GoogleMailComponent from '../GridComponents/GoogleMail/GoogleMailComponent';
import RedditReader from '../GridComponents/RedditReader/RedditReader';
import YoutubeComponent from '../GridComponents/YoutubeVideo/YoutubeComponent';
import APIreader from '../GridComponents/APIreader/APIreader';

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    display: 'flex',

    alignItems: 'center',
    flexDirection: 'column',
  },
  clockAndWeatherContainer: {
    marginTop: '5vh',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  leftContainer: {
    position: 'absolute',
    bottom: 60,
    left: 12,
    height: '80vh',
    width: '30%',
  },
  rightContainer: {
    position: 'absolute',
    bottom: 60,
    right: 12,
    height: '80vh',
    width: '30%',
  },
});

export default function MinimalDashboard({
  credentials,
  childRef,
  isProduction,
}) {
  const [activeLeft, setActiveLeft] = useState(undefined);
  const [activeRight, setActiveRight] = useState(undefined);

  const { settings, setSettings } = useContext(SettingsContext);

  const {
    rssReaderSettings,

    dashboardSettings,
    redditSettings,
    youtubeSettings,
    twitchSettings,
    calenderSettings,
    todosSettings,

    weatherSettings,
  } = settings;

  const classes = useStyles();

  const openSettings = (val) => {
    childRef.current.openSettings(val);
  };

  const renderTwitch = () => {
    return twitchSettings.authenticated ? (
      <TwitchWidget
        openSettings={openSettings}
        settings={settings}
        setSettings={setSettings}
        authKey={twitchSettings.authKey}
        nrOfStreams={twitchSettings.nrOfStreams}
        streamType={twitchSettings.streamType}
        openSideBar={twitchSettings.openSideBar}
        scrollbar={twitchSettings.scrollbar}
        followedUser={twitchSettings.followedUser}
        isDraggable={dashboardSettings.isDraggable}
      />
    ) : (
      <Card className={classes.twitchAuthButton}>
        <Button
          variant="text"
          onClick={() => {
            openSettings(5);
          }}
        >
          Authorize Twitch
        </Button>
      </Card>
    );
  };

  const renderGmail = () => {
    return (
      <GoogleMailComponent
        openSettings={openSettings}
        credentials={credentials}
        isProduction={isProduction}
        nrOfMails={34}
        isDraggable={false}
      />
    );
  };

  const renderReddit = () => {
    return (
      <RedditReader
        openSettings={openSettings}
        subreddits={redditSettings.subreddits}
        nrOfPosts={redditSettings.nrOfPosts}
        shufflePosts={redditSettings.shufflePosts}
        isDraggable={false}
      />
    );
  };

  const renderYoutube = () => {
    return (
      <YoutubeComponent
        openSettings={openSettings}
        credentials={credentials}
        isProduction={isProduction}
        isDraggable={false}
        nrOfVideos={20}
        scrollbar={false}
        showInfo={youtubeSettings.youtubeVideoInfo}
      />
    );
  };

  const renderRss = () => {
    return (
      <APIreader
        openSettings={openSettings}
        url={rssReaderSettings.url}
        nrOfArticles={5}
        showContent={rssReaderSettings.showContent}
        showImage={rssReaderSettings.showImage}
        showTitle={rssReaderSettings.showTitle}
        margin={rssReaderSettings.margin}
        layout={rssReaderSettings.layout}
        anchorOriginVertical={rssReaderSettings.anchorOriginVertical}
        anchorOriginHorizontal={rssReaderSettings.anchorOriginHorizontal}
        isDraggable={false}
        standAlone={true}
      />
    );
  };

  const onRightClick = (e, idx) => {
    e.preventDefault();

    if (activeRight !== idx) {
      setActiveRight(idx);
    } else {
      setActiveRight(undefined);
    }

    if (activeLeft === idx) {
      setActiveLeft(undefined);
    }
  };

  const onLeftClick = (e, idx) => {
    if (activeLeft !== idx) {
      setActiveLeft(idx);
    } else {
      setActiveLeft(undefined);
    }

    if (activeRight === idx) {
      setActiveRight(undefined);
    }
  };

  // If width <810px Close apps.

  const renderContent = (idx) => {
    switch (idx) {
      case 0:
        return renderGmail();
      case 1:
        return renderReddit();
      case 2:
        return renderTwitch();
      case 3:
        return renderYoutube();
      default:
        break;
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.clockAndWeatherContainer}>
        <StaticClock
          calenders={calenderSettings.calenders}
          credentials={credentials}
        />
        <StaticWeatherWidget city={weatherSettings.city} />
      </div>
      <div className={classes.leftContainer}>
        {/* <Collapse in={typeof activeLeft !== 'undefined'}> */}
        {activeLeft !== undefined && renderContent(activeLeft)}
        {/* </Collapse> */}
      </div>
      <div className={classes.rightContainer}>
        {/* <Collapse in={typeof activeRight !== 'undefined'}> */}

        {activeRight !== undefined && renderContent(activeRight)}

        {/* </Collapse> */}
      </div>
      <div className={classes.bottomContainer}>
        <div className="miniDash-btnContainer">
          <div style={{ marginBottom: 12 }}>{renderRss()}</div>
          <UniversalConverter />
          <AppBar
            activeLeft={activeLeft}
            activeRight={activeRight}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
          ></AppBar>
        </div>
      </div>
    </div>
  );
}
