import React, { useContext, useEffect, useRef, useState } from 'react';

import DashboardSettings from '../DashboardSettings/DashboardSettings.js';
import GoogleAutentication from '../Authentication/GoogleAuthentication';
import GoogleMailComponent from '../GridComponents/GoogleMail/GoogleMailComponent.js';
import YoutubeComponent from '../GridComponents/YoutubeVideo/YoutubeComponent';
import RedditReader from '../GridComponents/RedditReader/RedditReader';
import WeatherWidget from '../GridComponents/WeatherWidget/WeatherWidget';
import TimeDate from '../GridComponents/TimeDate/TimeDate';
import UniversalConverter from '../GridComponents/UniversalConverter/UniversalConverter';
import TwitchWidget from '../GridComponents/TwitchWidget/TwitchWidget';
import WallpaperComponent from '../GridComponents/WallpaperComponent/WallpaperComponent';
import RSSreader from '../GridComponents/RSSreader/RSSreader';
import Todos from '../GridComponents/Todos/Todos';

import { Alert } from '@material-ui/lab';

import RGL, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';

import { Button, Card, CircularProgress, Icon, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { SettingsContext } from '../../Context/SettingsContext.js';

// Twitch
//const twitchToken = '';

const useStyles = makeStyles({
  gridItemCards: {},
  twitchAuthButton: { display: 'flex', justifyContent: 'center' },
});

export default function MainDashboard() {
  const ReactGridLayout = WidthProvider(RGL);
  const classes = useStyles();

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const { settings, setSettings } = useContext(SettingsContext);
  const {
    rssReader,
    gMailSettings,
    dashboardSettings,
    redditSettings,
    youtubeSettings,
    twitchSettings,
    calenderSettings,
    todosSettings,
  } = settings;
  const isProduction = process.env.NODE_ENV !== 'production' ? false : true;
  //console.log(process.env.NODE_ENV);
  let newLayout = dashboardSettings.layout;

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  //Settings
  const childRef = useRef();
  const rssRef = useRef();

  const onLayoutChange = (layout) => {
    console.log(layout);
    if (layout !== newLayout) {
      newLayout = layout;
    }
    // setSettings({
    //   ...settings,
    //   dashboardSettings: {
    //     ...settings.dashboardSettings,
    //     isDraggable: false,
    //   },
    // });
  };

  const handleCloseDraggable = () => {
    //Save to chrome storage (the layout)

    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
      },
    });
  };
  const handleSaveDraggable = () => {
    //Save to chrome storage (the layout)
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
        layout: newLayout,
      },
    });
  };

  const openSettings = (val) => {
    childRef.current.openSettings(val);
  };

  return (
    <>
      <WallpaperComponent />
      <DashboardSettings ref={childRef}></DashboardSettings>
      <div style={{ position: 'relative', zIndex: '2' }}>
        {!loggedIn && (
          <GoogleAutentication
            loggedIn={loggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setCredentials={setCredentials}
            isProduction={isProduction}
          />
        )}

        {loggedIn && credentials ? (
          <div style={{ paddingTop: 60 }}>
            <ReactGridLayout
              isDraggable={dashboardSettings.isDraggable}
              isResizable={dashboardSettings.isDraggable}
              isBounded
              layout={dashboardSettings.layout}
              className="layout"
              onLayoutChange={(e) => onLayoutChange(e)}
              cols={dashboardSettings.nrOfCols}
              margin={dashboardSettings.gridSpacing}
              containerPadding={dashboardSettings.gridSpacing}
              rowHeight={dashboardSettings.rowHeight}
              compactType={dashboardSettings.compactType === 'default' ? null : dashboardSettings.compactType}
              width={'100%'}>
              {/* All Grid Components here */}
              <div key="1" className={classes.gridItemCards}>
                <YoutubeComponent
                  openSettings={openSettings}
                  credentials={credentials}
                  isProduction={isProduction}
                  isDraggable={dashboardSettings.isDraggable}
                  nrOfVideos={youtubeSettings.nrOfVideos}
                  scrollbar={youtubeSettings.scrollbar}
                  showInfo={youtubeSettings.youtubeVideoInfo}
                />
              </div>
              <div key="2" className={classes.gridItemCards}>
                <GoogleMailComponent
                  openSettings={openSettings}
                  credentials={credentials}
                  isProduction={isProduction}
                  nrOfMails={gMailSettings.nrOfMails}
                  isDraggable={dashboardSettings.isDraggable}
                />
              </div>
              <div key="3" className={classes.gridItemCards}>
                <RedditReader
                  openSettings={openSettings}
                  subreddits={redditSettings.subreddits}
                  nrOfPosts={redditSettings.nrOfPosts}
                  shufflePosts={redditSettings.shufflePosts}
                  isDraggable={dashboardSettings.isDraggable}
                />
              </div>
              <div key="4" className={classes.gridItemCards}>
                <WeatherWidget city={'Stockholm'} isDraggable={dashboardSettings.isDraggable} />
              </div>
              <div key="5" className={classes.gridItemCards}>
                <TimeDate
                  calenders={calenderSettings.calenders}
                  isDraggable={dashboardSettings.isDraggable}
                  isProduction={isProduction}
                  credentials={credentials}
                />
              </div>
              <div key="6" className={classes.gridItemCards}>
                <UniversalConverter isDraggable={dashboardSettings.isDraggable} />
              </div>
              <div key="7" className={classes.gridItemCards}>
                {twitchSettings.authenticated ? (
                  <TwitchWidget
                    openSettings={openSettings}
                    authKey={twitchSettings.authKey}
                    nrOfStreams={twitchSettings.nrOfStreams}
                    streamType={twitchSettings.streamType}
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
                      }}>
                      Authorize Twitch
                    </Button>
                  </Card>
                )}
              </div>
              <div key="8" className={classes.gridItemCards} ref={rssRef}>
                <RSSreader
                  openSettings={openSettings}
                  rssRef={rssRef}
                  url={rssReader.url}
                  nrOfArticles={rssReader.nrOfArticles}
                  showContent={rssReader.showContent}
                  showImage={rssReader.showImage}
                  showTitle={rssReader.showTitle}
                  margin={rssReader.margin}
                  layout={rssReader.layout}
                  anchorOriginVertical={rssReader.anchorOriginVertical}
                  anchorOriginHorizontal={rssReader.anchorOriginHorizontal}
                  isDraggable={dashboardSettings.isDraggable}
                />
              </div>
              <div key="9" className={classes.gridItemCards}>
                <Todos
                  todos={todosSettings.todos}
                  showTodos={todosSettings.showTodos}
                  notes={todosSettings.notes}
                  settings={settings}
                  setSettings={setSettings}
                  isDraggable={dashboardSettings.isDraggable}
                  openSettings={openSettings}
                />
              </div>
            </ReactGridLayout>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Snackbar open={dashboardSettings.isDraggable}>
        <Alert
          severity="info"
          variant="filled"
          action={
            <>
              <IconButton size="small" style={{ color: 'white' }} onClick={handleSaveDraggable}>
                <Icon>check</Icon>
              </IconButton>
              <IconButton size="small" style={{ color: 'white' }} onClick={handleCloseDraggable}>
                <Icon>close</Icon>
              </IconButton>
            </>
          }>
          The dashboard is unlocked, close to undo changes.
        </Alert>
      </Snackbar>
    </>
  );
}
