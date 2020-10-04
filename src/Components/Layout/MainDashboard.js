import React, { useRef, useState } from 'react';

import DashboardSettings from '../DashboardSettings/DashboardSettings.js';
import GoogleAutentication from '../Authentication/GoogleAuthentication';
import GoogleMailComponent from '../GridComponents/GoogleMail/GoogleMailComponent.js';
import YoutubeComponent from '../GridComponents/YoutubeVideo/YoutubeComponent';
import RedditReader from '../GridComponents/RedditReader/RedditReader';
import WeatherWidget from '../GridComponents/WeatherWidget/WeatherWidget';
import TimeDate from '../GridComponents/TimeDate/TimeDate';
import UniversalConverter from '../GridComponents/UniversalConverter/UniversalConverter';
import TwitchWidget from '../GridComponents/TwitchWidget/TwitchWidget';
import WallpaperComponent from '../WallpaperComponent/WallpaperComponent';

import { Alert } from '@material-ui/lab';

import RGL, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';

import { Button, Card, CircularProgress, Icon, IconButton, makeStyles, Snackbar } from '@material-ui/core';

// Reddit Variables, move to menu afterwards
const subreddits = ['politics', 'RocketLeague', 'cursedcomments'];
const postLimit = 5;
const shufflePosts = true;
const redditData = { subreddits, postLimit, shufflePosts };

// Youtube Variables
const nrOfVideos = 8;
const showInfo = { showChannel: true, showViews: true, showUpload: true };

// Gmail variables
const nrOfMails = 10;

// Twitch
const twitchToken = '';
const authTwitch = false;

// Wallpaper

// Dashboard

const layout = [
  { w: 7, h: 5, x: 0, y: 0, i: '1' },
  { w: 7, h: 6, x: 0, y: 5, i: '2' },
  { w: 5, h: 14, x: 7, y: 2, i: '3' },
  { w: 1, h: 2, x: 9, y: 0, i: '4' },
  { w: 2, h: 2, x: 10, y: 0, i: '5' },
  { w: 7, h: 2, x: 0, y: 7, i: '6' },
  { w: 7, h: 2, x: 0, y: 10, i: '7' },
];

const useStyles = makeStyles({
  gridItemCards: {},
  twitchAuthButton: { display: 'flex', justifyContent: 'center' },
});

export default function MainDashboard() {
  const ReactGridLayout = WidthProvider(RGL);
  const classes = useStyles();

  //Wallpaper
  const [windowSize, setWindowSize] = useState([1920, 1080]);
  const [collectionID, setCollectionID] = useState('8602161');

  //User variables changes
  const [isDraggable, setIsDraggable] = useState(true);

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [gridLayout, setGridLayout] = useState(layout);
  const [credentials, setCredentials] = useState(null);

  const isProduction = false;

  //Settings
  const childRef = useRef();

  const onLayoutChange = (layout) => {
    setGridLayout(gridLayout);
  };

  const handleCloseDraggable = () => {
    //Save to chrome storage (the layout)
    setIsDraggable(false);
  };
  const handleSaveDraggable = () => {
    //Save to chrome storage (the layout)
    setIsDraggable(false);
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
              isDraggable={isDraggable}
              isResizable={isDraggable}
              layout={gridLayout}
              className="layout"
              onLayoutChange={(e) => onLayoutChange(e)}
              cols={12}
              containerPadding={[10, 10]}
              rowHeight={30}
              width={'100vw'}>
              {/* All Grid Components here */}
              <div key="1" className={classes.gridItemCards}>
                <YoutubeComponent
                  credentials={credentials}
                  isProduction={isProduction}
                  isDraggable={isDraggable}
                  nrOfVideos={nrOfVideos}
                  showInfo={showInfo}
                />
              </div>
              <div key="2" className={classes.gridItemCards}>
                <GoogleMailComponent
                  credentials={credentials}
                  isProduction={isProduction}
                  nrOfMails={nrOfMails}
                  isDraggable={isDraggable}
                />
              </div>
              <div key="3" className={classes.gridItemCards}>
                <RedditReader data={redditData} isDraggable={isDraggable} />
              </div>
              <div key="4" className={classes.gridItemCards}>
                <WeatherWidget city={'Stockholm'} isDraggable={isDraggable} />
              </div>
              <div key="5" className={classes.gridItemCards}>
                <TimeDate isDraggable={isDraggable} />
              </div>
              <div key="6" className={classes.gridItemCards}>
                <UniversalConverter isDraggable={isDraggable} />
              </div>
              <div key="7" className={classes.gridItemCards}>
                {authTwitch ? (
                  <TwitchWidget isDraggable={isDraggable} />
                ) : (
                  <Card className={classes.twitchAuthButton}>
                    <Button
                      variant="text"
                      onClick={() => {
                        childRef.current.openSettings('twitch');
                      }}>
                      Authorize Twitch
                    </Button>
                  </Card>
                )}
              </div>
            </ReactGridLayout>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Snackbar open={isDraggable}>
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
