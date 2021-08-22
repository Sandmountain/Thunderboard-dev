import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { initFirestore } from '../../Firestore/FirestoreFunctions';

export default function GoogleAuthentication({ loggedIn, setIsLoggedIn, setCredentials, setSettings, setProfileData }) {
  const SCOPES =
    'profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/datastore';
  //www.googleapis.com/auth/calendar.events';

  const responseGoogle = async (response) => {
    if (!loggedIn) {
      try {
        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + response.accessToken,
            'Content-Type': 'application/json',
          },
          contentType: 'json',
        };
        console.log(response);
        setSettings(await initFirestore(response.googleId, response.accessToken));

        setProfileData(response.profileObj);
        setIsLoggedIn(true);
        setCredentials(init);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    ///* global chrome */
    /* 
    if (!loggedIn && isProduction) {
      let token = '';
      chrome.identity.getAuthToken({ interactive: true }, function (googleToken) {
        token = googleToken;
        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          contentType: 'json',
        };

        chrome.identity.getProfileUserInfo(async (userInfo) => {
          // Set ID to global state
          await setSettings(await initFirestore(userInfo.id, token, isProduction));
          setIsLoggedIn(true);
          setCredentials(init);
        });
      });
    }*/
  });

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        //autoLoad={!loggedIn}
        scope={SCOPES}
        approvalPrompt="force"></GoogleLogin>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
        buttonText="Logout"
        onLogoutSuccess={() => window.location.reload()}></GoogleLogout>
    </>
  );
}
