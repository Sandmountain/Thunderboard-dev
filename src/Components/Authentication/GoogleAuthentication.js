/* global chrome */
import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';

export default function GoogleAuthentication({ loggedIn, setIsLoggedIn, setCredentials, isProduction }) {
  const SCOPES =
    'profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar';
  //www.googleapis.com/auth/calendar.events';

  const responseGoogle = async (response) => {
    if (!loggedIn && !isProduction) {
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
        setIsLoggedIn(true);
        setCredentials(init);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!loggedIn && isProduction) {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          contentType: 'json',
        };

        setIsLoggedIn(true);
        setCredentials(init);
      });
    } else if (!loggedIn && !isProduction) {
      // If not logged in and not
    }
  });

  return (
    <>
      {!isProduction && (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          scope={SCOPES}
          approvalPrompt="force"></GoogleLogin>
      )}
    </>
  );
}
