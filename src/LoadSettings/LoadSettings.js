export const LoadSettings = () => {
  const settings = {
    rssReader: {
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
      nrOfMails: 20,
    },
    dashboardSettings: {
      isDraggable: false,
      nrOfCols: 12,
      rowHeight: 1,
      gridSpacing: [10, 10],
      compactType: 'vertical',
      layout: [
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
    },
    wallPaperSettings: {
      windowSize: [1920, 1080],
      collectionID: '8602161', //8602161
      customURL: '',
      imageType: 'unisplash',
    },
    twitchSettings: {
      authenticated: true,
      authKey: '6elpmslt5pviw30x7x6yb1xczuxwyc',
      nrOfStreams: 6,
      streamType: 'user',
      followedUser: '240211827',
      scrollbar: false,
    },
    calenderSettings: {
      calenders: [
        'primary',
        'viktor.sandberg@digiexam.se',
        '0a8ba29jl41562qj2arpjp1vl3s68o4a@import.calendar.google.com',
      ],
    },
    todosSettings: {
      showTodos: true,
      todos: [
        { name: 'This is a longer todo', date: '2020-10-27', checked: true },
        { name: 'todo-2', date: '2020-10-28', checked: false },
      ],
      notes: 'Deserunt commodo ea aute sit commodo nulla amet.',
    },
    linksSettings: {
      links: [],
    },
  };

  return settings;
};
