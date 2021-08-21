export const getLiveUserTwitchData = async (
  followedChannels,
  authKey,
  setFollowedChannels,
  setLoadingUserData,
  nrOfStreams
) => {
  try {
    const getStreams = followedChannels.reduce((prev, curr, idx) => {
      if (idx === 0) {
        return '?user_login=' + curr.to_name;
      } else {
        return prev + '&user_login=' + curr.to_name;
      }
    }, '');

    try {
      fetch(`https://api.twitch.tv/helix/streams${getStreams}`, {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${authKey}`,
          'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then((res) => {
          if (res.data.length < nrOfStreams) {
            getOfflineUserTwitchData(res.data, followedChannels, setFollowedChannels, setLoadingUserData, authKey);
          } else {
            setFollowedChannels(res.data);
            setLoadingUserData(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error('Twitch not autenticated. Try resetting your twitch settings and generate a new key');
    setLoadingUserData(false);
    return;
  }
};

const getOfflineUserTwitchData = async (data, followedChannels, setFollowedChannels, setLoadingUserData, authKey) => {
  const offlineChannels = followedChannels.reduce((prev, curr, idx) => {
    return !idx ? '?id=' + curr.to_id : prev + '&id=' + curr.to_id;
  }, String);
  // TODO: This needs to be loaded for the online channels too to get the profile picture. This reduce function should, in some manner, be used there instead to apply the profile image to the online object.
  try {
    return fetch(`https://api.twitch.tv/helix/users${offlineChannels}`, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${authKey}`,
        'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        //console.log(mergeToLiveChannels(data, res.data));
        setFollowedChannels(mergeToLiveChannels(data, res.data));

        setLoadingUserData(false);
      });
  } catch (error) {
    setLoadingUserData(false);
    console.log(error);
  }
};

const mergeToLiveChannels = (onlineData, offlineData) => {
  const dataToRemove = [];

  // Get the profile pictures for the online channels
  onlineData.map((onlineChannel) => {
    return (onlineChannel['profile_image_url'] = offlineData.filter((offlineChannel, index) => {
      if (offlineChannel.id === onlineChannel.user_id) {
        // Can't filter the offline data here, so pushing the indecies to a temp array,
        // and remove it later
        dataToRemove.push(offlineChannel);

        return true;
      } else {
        return false;
      }
    })[0].profile_image_url);
  });

  //Filter the duplicates values
  const filteredOfflineData = offlineData.filter((channel) => {
    if (dataToRemove.findIndex((item) => item.id === channel.id) === -1) {
      return true;
    } else {
      return false;
    }
  });

  return [...onlineData, ...filteredOfflineData];
};

export const resetInvalidToken = (setSettings, settings, updateFirestoreCollection) => {
  setSettings({
    ...settings,
    twitchSettings: {
      ...settings.twitchSettings,
      authenticated: false,
      authKey: '',
    },
  });
  updateFirestoreCollection({
    twitchSettings: {
      ...settings.twitchSettings,
      authenticated: false,
      authKey: '',
    },
  });
};
