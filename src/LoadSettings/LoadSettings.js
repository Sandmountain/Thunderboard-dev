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
    },
    gMailSettings: {
      nrOfMails: 20,
    },
    dashboardSettings: {
      isDraggable: false,
      nrOfCols: 12,
      rowHeight: 30,
      gridSpacing: [10, 10],
      compactType: 'vertical',
      layout: [
        { w: 7, h: 5, x: 0, y: 0, i: '1' },
        { w: 7, h: 6, x: 0, y: 5, i: '2' },
        { w: 5, h: 14, x: 7, y: 3, i: '3' },
        { w: 1, h: 2, x: 9, y: 0, i: '4' },
        { w: 2, h: 2, x: 10, y: 0, i: '5' },
        { w: 7, h: 2, x: 0, y: 7, i: '6' },
        { w: 7, h: 2, x: 0, y: 10, i: '7' },
        { w: 5, h: 4, x: 7, y: 2, i: '8' },
      ],
    },
    wallPaperSettings: {
      windowSize: [1920, 1080],
      collectionID: '8602161', //8602161
      customURL: '',
      imageType: 'unisplash',
    },
    twitchSettings: {
      auth: false,
    },
  };

  return settings;
};
