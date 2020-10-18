export const validateTwitch = (url, settings, setIsAuth, setSettings, authToken, setErrorMessage) => {
  setErrorMessage({ isError: false, message: '' });
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${authToken}`,
      'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      if (!data.error) {
        console.log(data);
        setIsAuth(true);
        setSettings({
          ...settings,
          twitchSettings: {
            ...settings.twitchSettings,
            authenticated: true,
            authKey: authToken,
          },
        });
      } else {
        setErrorMessage({ isError: true, message: data.message });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = async (url, authToken) => {
  return fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${authToken}`,
      'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      if (!data.error) {
        return data.data[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
