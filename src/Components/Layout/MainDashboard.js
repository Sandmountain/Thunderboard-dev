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

import { Alert } from '@material-ui/lab';

import RGL, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';

import { Button, Card, CircularProgress, Icon, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { SettingsContext } from '../../Context/SettingsContext.js';
import { openInNewTab } from '../helperFunctions.js';

// Twitch
//const twitchToken = '';
const authTwitch = true;

const useStyles = makeStyles({
  gridItemCards: {},
  twitchAuthButton: { display: 'flex', justifyContent: 'center' },
});

export default function MainDashboard() {
  const ReactGridLayout = WidthProvider(RGL);
  const classes = useStyles();

  const [loggedIn, setIsLoggedIn] = useState(false);
  //const [gridLayout, setGridLayout] = useState(layout);
  const [credentials, setCredentials] = useState(null);

  const { settings, setSettings } = useContext(SettingsContext);
  const { rssReader, gMailSettings, dashboardSettings, redditSettings, youtubeSettings, twitchSettings } = settings;
  const isProduction = false;

  let newLayout = dashboardSettings.layout;

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  //Settings
  const childRef = useRef();
  const rssRef = useRef();

  const onLayoutChange = (layout) => {
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

  const authTwitch = () => {
    childRef.current.openSettings(5);
  };

  return (
    <>
      <WallpaperComponent />
      <DashboardSettings ref={childRef}></DashboardSettings>
      <div style={{ position: 'relative', zIndex: '2' }}>
        <GoogleAutentication
          loggedIn={loggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setCredentials={setCredentials}
          isProduction={isProduction}
        />

        {loggedIn && credentials ? (
          <>
            <ReactGridLayout
              isDraggable={dashboardSettings.isDraggable}
              isResizable={dashboardSettings.isDraggable}
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
                  credentials={credentials}
                  isProduction={isProduction}
                  isDraggable={dashboardSettings.isDraggable}
                  nrOfVideos={youtubeSettings.nrOfVideos}
                  showInfo={youtubeSettings.youtubeVideoInfo}
                />
              </div>
              <div key="2" className={classes.gridItemCards}>
                <GoogleMailComponent
                  credentials={credentials}
                  isProduction={isProduction}
                  nrOfMails={gMailSettings.nrOfMails}
                  isDraggable={dashboardSettings.isDraggable}
                />
              </div>
              <div key="3" className={classes.gridItemCards}>
                <RedditReader
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
                <TimeDate isDraggable={dashboardSettings.isDraggable} />
              </div>
              <div key="6" className={classes.gridItemCards}>
                <UniversalConverter isDraggable={dashboardSettings.isDraggable} />
              </div>
              <div key="7" className={classes.gridItemCards}>
                {twitchSettings.authenticated ? (
                  <TwitchWidget
                    authKey={twitchSettings.authKey}
                    nrOfStreams={twitchSettings.nrOfStreams}
                    streamType={twitchSettings.streamType}
                    followedUser={twitchSettings.followedUser}
                    isDraggable={dashboardSettings.isDraggable}
                  />
                ) : (
                  <Card className={classes.twitchAuthButton}>
                    <Button
                      variant="text"
                      onClick={() => {
                        authTwitch();
                      }}>
                      Authorize Twitch
                    </Button>
                  </Card>
                )}
              </div>
              <div key="8" className={classes.gridItemCards} ref={rssRef}>
                <RSSreader
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
            </ReactGridLayout>
          </>
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
