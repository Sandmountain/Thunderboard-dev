import React, { useContext } from 'react';

import GoogleMailComponent from '../GridComponents/GoogleMail/GoogleMailComponent.js';
import YoutubeComponent from '../GridComponents/YoutubeVideo/YoutubeComponent';
import RedditReader from '../GridComponents/RedditReader/RedditReader';
import WeatherWidget from '../GridComponents/WeatherWidget/WeatherWidget';
import TimeDate from '../GridComponents/TimeDate/TimeDate';
import UniversalConverter from '../GridComponents/UniversalConverter/UniversalConverter';
import TwitchWidget from '../GridComponents/TwitchWidget/TwitchWidget';
import RSSreader from '../GridComponents/RSSreader/RSSreader';
import Todos from '../GridComponents/Todos/Todos';
import Links from '../GridComponents/Links/Links';
import ToolsMenu from '../GridComponents/ToolsMenu/ToolsMenu.js';

import RGL, { WidthProvider } from 'react-grid-layout';

import { Button, Card, makeStyles } from '@material-ui/core';

import { SettingsContext } from '../../Context/SettingsContext.js';

const useStyles = makeStyles({
  gridItemCards: {},
  twitchAuthButton: { display: 'flex', justifyContent: 'center' },
});

export default function CustomDashboard({
  credentials,
  isProduction,
  childRef,
  newLayout,
}) {
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

  const ReactGridLayout = WidthProvider(RGL);

  const classes = useStyles();

  const onLayoutChange = (layout) => {
    if (layout !== newLayout && layout) {
      //newLayout = layout;
      newLayout = layout;
    }
  };

  const openSettings = (val) => {
    childRef.current.openSettings(val);
  };

  return (
    <ReactGridLayout
      isDraggable={dashboardSettings.isDraggable}
      isResizable={dashboardSettings.isDraggable}
      isBounded
      layout={
        dashboardSettings.customLayout
          ? dashboardSettings.customLayout
          : dashboardSettings.layout
      }
      className="layout"
      onLayoutChange={(e) => onLayoutChange(e)}
      cols={dashboardSettings.nrOfCols}
      margin={dashboardSettings.gridSpacing}
      containerPadding={dashboardSettings.gridSpacing}
      rowHeight={dashboardSettings.rowHeight}
      useCSSTransforms={false}
      measureBeforeMount={true}
      compactType={
        dashboardSettings.compactType === 'default'
          ? null
          : dashboardSettings.compactType
      }
      width={'100%'}
    >
      {/* All Grid Components here */}
      <div
        key="1"
        className={classes.gridItemCards}
        hidden={!youtubeSettings.useComponent}
      >
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
      <div
        key="2"
        className={classes.gridItemCards}
        hidden={!gMailSettings.useComponent}
      >
        <GoogleMailComponent
          openSettings={openSettings}
          credentials={credentials}
          isProduction={isProduction}
          nrOfMails={gMailSettings.nrOfMails}
          isDraggable={dashboardSettings.isDraggable}
        />
      </div>
      <div
        key="3"
        className={classes.gridItemCards}
        hidden={!redditSettings.useComponent}
      >
        <RedditReader
          openSettings={openSettings}
          subreddits={redditSettings.subreddits}
          nrOfPosts={redditSettings.nrOfPosts}
          shufflePosts={redditSettings.shufflePosts}
          isDraggable={dashboardSettings.isDraggable}
        />
      </div>
      <div
        key="4"
        className={classes.gridItemCards}
        hidden={!weatherSettings.useComponent}
      >
        <WeatherWidget
          city={weatherSettings.city}
          isDraggable={dashboardSettings.isDraggable}
        />
      </div>
      <div
        key="5"
        className={classes.gridItemCards}
        hidden={!calenderSettings.useComponent}
      >
        <TimeDate
          calenders={calenderSettings.calenders}
          isDraggable={dashboardSettings.isDraggable}
          isProduction={isProduction}
          credentials={credentials}
        />
      </div>
      <div
        key="6"
        className={classes.gridItemCards}
        hidden={!universalConverter.useComponent}
      >
        <UniversalConverter isDraggable={dashboardSettings.isDraggable} />
      </div>
      <div
        key="7"
        className={classes.gridItemCards}
        hidden={!twitchSettings.useComponent}
      >
        {twitchSettings.authenticated ? (
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
        )}
      </div>
      <div
        key="8"
        className={classes.gridItemCards}
        hidden={!rssReaderSettings.useComponent}
      >
        <RSSreader
          openSettings={openSettings}
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
      <div
        key="9"
        className={classes.gridItemCards}
        hidden={!todosSettings.useComponent}
      >
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
      <div
        key="10"
        className={classes.gridItemCards}
        hidden={!linksSettings.useComponent}
      >
        <Links
          links={linksSettings.links}
          settings={settings}
          setSettings={setSettings}
          isDraggable={dashboardSettings.isDraggable}
          openSettings={openSettings}
        />
      </div>
      <div key="11" className={classes.gridItemCards} hidden={false}>
        <ToolsMenu />
      </div>
    </ReactGridLayout>
  );
}
