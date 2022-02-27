export const DefaultSettings = () => {
  const settings = {
    rssReaderSettings: {
      useComponent: true,
      url: 'https://rss.aftonbladet.se/rss2/small/pages/sections/nyheter/',
      nrOfArticles: 10,
      showContent: true,
      showImage: true,
      showTitle: true,
      layout: 'list',
      margin: '10px 0px 0px 6px', //-155px
      anchorOriginVertical: 'bottom',
      anchorOriginHorizontal: 'left',
    },
    redditSettings: {
      useComponent: true,
      subreddits: [
        {
          name: 'politics',
          url: '',
        },
        {
          name: 'RocketLeague',
          url: '',
        },
        {
          name: 'cursedcomments',
          url: '',
        },
      ],
      nrOfPosts: 5,
      shufflePosts: true,
    },
    youtubeSettings: {
      useComponent: true,
      youtubeVideoInfo: {
        showTitle: true,
        showChannel: true,
        showViews: true,
        showUpload: true,
      },
      nrOfVideos: 8,
      scrollbar: true,
    },
    gMailSettings: {
      useComponent: true,
      nrOfMails: 20,
    },
    dashboardSettings: {
      isDraggable: false,
      nrOfCols: 12,
      rowHeight: 1,
      gridSpacing: [10, 10],
      compactType: 'default',
      minimalMode: true,
      customLayout: [
        {
          static: false,
          h: 42,
          i: '1',
          moved: false,
          x: 10,
          y: 30,
          w: 2,
        },
        {
          static: false,
          x: 0,
          moved: false,
          h: 23,
          w: 4,
          i: '2',
          y: 6,
        },
        {
          x: 6,
          moved: false,
          w: 4,
          static: false,
          h: 66,
          i: '3',
          y: 6,
        },
        {
          x: 9,
          h: 6,
          static: false,
          i: '4',
          moved: false,
          y: 0,
          w: 1,
        },
        {
          moved: false,
          i: '5',
          x: 10,
          w: 2,
          h: 6,
          static: false,
          y: 0,
        },
        {
          static: false,
          moved: false,
          i: '6',
          h: 6,
          x: 10,
          w: 2,
          y: 6,
        },
        {
          i: '7',
          h: 43,
          x: 0,
          w: 6,
          y: 29,
          static: false,
          moved: false,
        },
        {
          h: 23,
          y: 6,
          w: 2,
          x: 4,
          moved: false,
          static: false,
          i: '8',
        },
        {
          y: 12,
          x: 10,
          w: 2,
          i: '9',
          static: false,
          h: 18,
          moved: false,
        },
        {
          moved: false,
          y: 0,
          h: 6,
          x: 0,
          w: 1,
          static: false,
          i: '10',
        },
        {
          w: 1,
          i: '11',
          x: 3,
          moved: false,
          y: 0,
          h: 6,
          static: false,
        },
      ],

      layout: [
        { w: 6, h: 22, x: 0, y: 1, i: '1', component: 'Youtube' }, // Youtube
        { w: 4, h: 34, x: 0, y: 42, i: '2', component: 'GMail' }, // Gmail
        { w: 6, h: 43, x: 6, y: 33, i: '3', component: 'Reddit' }, // Reddit
        { w: 1, h: 7, x: 11, y: 0, i: '4', component: 'Weather' }, // Weather
        { w: 2, h: 7, x: 9, y: 0, i: '5', component: 'Calender' }, // Calender
        { w: 3, h: 6, x: 9, y: 7, i: '6', component: 'Converter' }, // Uni Converter
        { w: 6, h: 19, x: 0, y: 23, i: '7', component: 'Twitch' }, // TwitchWidget
        { w: 6, h: 20, x: 6, y: 13, i: '8', component: 'RSSreader' }, // RSSreader
        { w: 2, h: 34, x: 4, y: 42, i: '9', component: 'Todos' }, // Todos
        { w: 3, h: 6, x: 6, y: 7, i: '10', component: 'Links' }, // Links
      ],
    },
    wallPaperSettings: {
      windowSize: [1920, 1080],
      collectionID: '8602161', //8602161
      customURL: '',
      imageType: 'unisplash',
    },
    twitchSettings: {
      useComponent: true,
      authenticated: true,
      openSideBar: true,
      authKey: '6elpmslt5pviw30x7x6yb1xczuxwyc',
      nrOfStreams: 6,
      streamType: 'browse',
      followedUser: '240211827',
      scrollbar: false,
    },
    calenderSettings: {
      useComponent: true,
      calenders: [
        'primary',
        'viktor.sandberg@digiexam.se',
        '0a8ba29jl41562qj2arpjp1vl3s68o4a@import.calendar.google.com',
      ],
    },
    todosSettings: {
      useComponent: true,
      todos: [
        { name: 'This is a longer todo', date: '2020-10-27', checked: true },
        { name: 'todo-2', date: '2020-10-28', checked: false },
      ],
    },
    linksSettings: {
      useComponent: true,
      links: [],
    },
    weatherSettings: {
      useComponent: true,
      city: 'Stockholm',
    },
    universalConverter: {
      useComponent: true,
    },
  };

  return settings;
};

/*
 [
        { w: 7, h: 21, x: 0, y: 5, i: '1' }, // Youtube
        { w: 7, h: 23, x: 0, y: 21, i: '2' }, // Gmail
        { w: 5, h: 44, x: 7, y: 22, i: '3' }, // Reddit
        { w: 1, h: 7, x: 9, y: 0, i: '4' }, // Weather
        { w: 2, h: 7, x: 10, y: 0, i: '5' }, // Calender
        { w: 7, h: 7, x: 0, y: 44, i: '6' }, // Uni Converter
        { w: 7, h: 18, x: 0, y: 51, i: '7' }, // TwitchWidget
        { w: 2, h: 18, x: 10, y: 7, i: '8' }, // RSSreader
        { w: 3, h: 18, x: 7, y: 7, i: '9' }, // Todos
        { w: 3, h: 5, x: 0, y: 0, i: '10' }, // Links
      ],
*/

/*
[
  {
    "moved": false,
    "w": 3,
    "static": false,
    "x": 0,
    "i": "1",
    "h": 20,
    "y": 5
  },
  {
    "w": 7,
    "static": false,
    "y": 25,
    "i": "2",
    "moved": false,
    "h": 23,
    "x": 0
  },
  {
    "static": false,
    "h": 44,
    "moved": false,
    "x": 7,
    "y": 25,
    "w": 5,
    "i": "3"
  },
  {
    "y": 0,
    "i": "4",
    "w": 1,
    "x": 9,
    "static": false,
    "moved": false,
    "h": 7
  },
  {
    "x": 10,
    "i": "5",
    "static": false,
    "y": 0,
    "moved": false,
    "h": 7,
    "w": 2
  },
  {
    "i": "6",
    "moved": false,
    "x": 0,
    "h": 7,
    "static": false,
    "y": 48,
    "w": 7
  },
  {
    "x": 3,
    "w": 4,
    "static": false,
    "y": 0,
    "moved": false,
    "i": "7",
    "h": 25
  },
  {
    "w": 2,
    "x": 10,
    "i": "8",
    "static": false,
    "moved": false,
    "h": 18,
    "y": 7
  },
  {
    "i": "9",
    "moved": false,
    "h": 18,
    "y": 7,
    "w": 3,
    "x": 7,
    "static": false
  },
  {
    "y": 0,
    "x": 0,
    "moved": false,
    "static": false,
    "h": 5,
    "w": 3,
    "i": "10"
  }
]
*/
