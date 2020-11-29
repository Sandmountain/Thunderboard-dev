import React, { useContext, useRef, useState } from 'react';

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
import Links from '../GridComponents/Links/Links';

import { Alert } from '@material-ui/lab';

import RGL, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';

import { Button, Card, Icon, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { SettingsContext } from '../../Context/SettingsContext.js';
import { updateFirestoreCollection } from '../../Firestore/FirestoreFunctions.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import ProgressBolt from '../ProgressBolt/ProgressBolt.js';
import TopBar from '../TopBar/TopBar.js';

// Twitch
//const twitchToken = '';

const useStyles = makeStyles({
  gridItemCards: {},
  twitchAuthButton: { display: 'flex', justifyContent: 'center' },
});

const isProduction = process.env.NODE_ENV !== 'production' ? false : true;

export default function MainDashboard() {
  const ReactGridLayout = WidthProvider(RGL);
  const classes = useStyles();

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const { settings, setSettings } = useContext(SettingsContext);

  const {
    rssReaderSettings,
    gMailSettings,
    dashboardSettings,
    redditSettings,
    youtubeSettings,
    twitchSettings,
    calenderSettings,
    todosSettings,
    linksSettings,
    weatherSettings,
    universalConverter,
  } = settings;

  let newLayout = dashboardSettings?.layout;

  //Settings
  const childRef = useRef();
  const rssRef = useRef();

  const onLayoutChange = (layout) => {
    if (layout !== newLayout && layout) {
      newLayout = layout;
    }
  };

  const handleCloseDraggable = () => {
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
      },
    });
    updateFirestoreCollection({
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
      },
    });
  };

  const handleSaveDraggable = () => {
    setSettings({
      ...settings,
      dashboardSettings: {
        ...settings.dashboardSettings,
        isDraggable: false,
        customLayout: newLayout,
      },
    });
    updateFirestoreCollection({
      dashboardSettings: {
        ...settings.dashboardSettings,
        customLayout: JSON.parse(JSON.stringify(newLayout)),
        isDraggable: false,
      },
    });
  };

  const openSettings = (val) => {
    childRef.current.openSettings(val);
  };

  return (
    <>
      <LoadingScreen loggedIn={!loggedIn}></LoadingScreen>
      {!loggedIn ? (
        <>
          <GoogleAutentication
            loggedIn={loggedIn}
            setSettings={setSettings}
            setIsLoggedIn={setIsLoggedIn}
            setCredentials={setCredentials}
            isProduction={isProduction}
          />
        </>
      ) : (
        <>
          <WallpaperComponent />
          <TopBar childRef={childRef} />
          <div style={{ position: 'relative', zIndex: '2' }}>
            {loggedIn && credentials ? (
              <div style={{ paddingTop: 60 }}>
                <ReactGridLayout
                  isDraggable={dashboardSettings.isDraggable}
                  isResizable={dashboardSettings.isDraggable}
                  isBounded
                  layout={dashboardSettings.customLayout ? dashboardSettings.customLayout : dashboardSettings.layout}
                  className="layout"
                  onLayoutChange={(e) => onLayoutChange(e)}
                  cols={dashboardSettings.nrOfCols}
                  margin={dashboardSettings.gridSpacing}
                  containerPadding={dashboardSettings.gridSpacing}
                  rowHeight={dashboardSettings.rowHeight}
                  useCSSTransforms={false}
                  measureBeforeMount={true}
                  compactType={dashboardSettings.compactType === 'default' ? null : dashboardSettings.compactType}
                  width={'100%'}>
                  {/* All Grid Components here */}
                  <div key="1" className={classes.gridItemCards} hidden={!youtubeSettings.useComponent}>
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
                  <div key="2" className={classes.gridItemCards} hidden={!gMailSettings.useComponent}>
                    <GoogleMailComponent
                      openSettings={openSettings}
                      credentials={credentials}
                      isProduction={isProduction}
                      nrOfMails={gMailSettings.nrOfMails}
                      isDraggable={dashboardSettings.isDraggable}
                    />
                  </div>
                  <div key="3" className={classes.gridItemCards} hidden={!redditSettings.useComponent}>
                    <RedditReader
                      openSettings={openSettings}
                      subreddits={redditSettings.subreddits}
                      nrOfPosts={redditSettings.nrOfPosts}
                      shufflePosts={redditSettings.shufflePosts}
                      isDraggable={dashboardSettings.isDraggable}
                    />
                  </div>
                  <div key="4" className={classes.gridItemCards} hidden={!weatherSettings.useComponent}>
                    <WeatherWidget city={weatherSettings.city} isDraggable={dashboardSettings.isDraggable} />
                  </div>
                  <div key="5" className={classes.gridItemCards} hidden={!calenderSettings.useComponent}>
                    <TimeDate
                      calenders={calenderSettings.calenders}
                      isDraggable={dashboardSettings.isDraggable}
                      isProduction={isProduction}
                      credentials={credentials}
                    />
                  </div>
                  <div key="6" className={classes.gridItemCards} hidden={!universalConverter.useComponent}>
                    <UniversalConverter isDraggable={dashboardSettings.isDraggable} />
                  </div>
                  <div key="7" className={classes.gridItemCards} hidden={!twitchSettings.useComponent}>
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
                  <div key="8" className={classes.gridItemCards} ref={rssRef} hidden={!rssReaderSettings.useComponent}>
                    <RSSreader
                      openSettings={openSettings}
                      rssRef={rssRef}
                      url={rssReaderSettings.url}
                      nrOfArticles={rssReaderSettings.nrOfArticles}
                      showContent={rssReaderSettings.showContent}
                      showImage={rssReaderSettings.showImage}
                      showTitle={rssReaderSettings.showTitle}
                      margin={rssReaderSettings.margin}
                      layout={rssReaderSettings.layout}
                      anchorOriginVertical={rssReaderSettings.anchorOriginVertical}
                      anchorOriginHorizontal={rssReaderSettings.anchorOriginHorizontal}
                      isDraggable={dashboardSettings.isDraggable}
                    />
                  </div>
                  <div key="9" className={classes.gridItemCards} hidden={!todosSettings.useComponent}>
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
                  <div key="10" className={classes.gridItemCards} hidden={!linksSettings.useComponent}>
                    <Links
                      links={linksSettings.links}
                      settings={settings}
                      setSettings={setSettings}
                      isDraggable={dashboardSettings.isDraggable}
                      openSettings={openSettings}
                    />
                  </div>
                </ReactGridLayout>
              </div>
            ) : (
              <ProgressBolt />
            )}
          </div>
          <Snackbar open={dashboardSettings?.isDraggable}>
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
      )}
    </>
  );
}
