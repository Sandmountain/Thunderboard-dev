/* global chrome */
import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import { Typography, Paper, Grid, List, Card } from '@material-ui/core';

import YoutubeVideo from '../GridComponents/YoutubeVideo/YoutubeVideo';
import GoogleMail from '../GridComponents/GoogleMail/GoogleMail';
import TimeDate from '../GridComponents/TimeDate/TimeDate';
import WeatherWidget from '../GridComponents/WeatherWidget/WeatherWidget';
import RedditReader from '../GridComponents/RedditReader/RedditReader';

export default function GoogleAuthentication() {
  const isProduction = false;

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const [youtubeData, setYoutubeData] = useState(null);
  const [youtubeList, setYoutubeList] = useState(null);

  const [mailData, setMailData] = useState(null);

  //const subreddits = ['cursedcomments', 'RocketLeague', 'iamverysmart', 'aww', 'javascript'];
  const subreddits = ['politics', 'RocketLeague', 'cursedcomments'];
  const postLimit = 5;
  const shufflePosts = true;

  const RedditData = { subreddits, postLimit, shufflePosts };

  const SCOPES =
    'profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.readonly';

  const responseGoogle = async (response) => {
    if (!loggedIn && !isProduction) {
      try {
        setIsLoggedIn(true);

        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + response.accessToken,
            'Content-Type': 'application/json',
          },
          contentType: 'json',
        };
        setCredentials(init);

        const res = await axios('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', init);

        //`https://www.googleapis.com/youtube/v3/search`

        setYoutubeData(res.data.items[0]);
        const youData = await axios(
          'https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&chart=mostPopular&regionCode=SE&maxResults=6',
          init
        );
        setYoutubeList(youData.data.items);
        /*
        GET https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=10&mine=true&key=[YOUR_API_KEY] HTTP/1.1
        */

        const inboxData = await axios(
          'https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&q=in:inbox -category:(promotions OR social)&maxResults=7',
          init
        );

        const mailData = await Promise.all(
          inboxData.data.messages.map(async (message, idx) => {
            return await axios(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, init).then(
              (res) => {
                return res.data;
              }
            );
          })
        );
        setMailData(mailData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!loggedIn && isProduction) {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        setIsLoggedIn(true);

        const init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          contentType: 'json',
        };

        setCredentials(init);

        fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', init)
          .then((response) => response.json())
          .then(function (data) {
            setYoutubeData(data.items[0]);
          });
      });
    } else if (!loggedIn && !isProduction) {
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

      <div style={{ display: 'flex' }}>
        {youtubeData ? (
          <Grid container style={{ padding: 10, width: '50%' }}>
            <Card
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '5px',
                height: 'fit-content',
                padding: '5px',
                borderRadius: 0,
              }}>
              {youtubeList &&
                youtubeList.map((video, idx) => {
                  return (
                    <Grid item key={idx}>
                      <YoutubeVideo data={video} credentials={credentials} />
                    </Grid>
                  );
                })}
            </Card>
            {mailData ? (
              <>
                <Grid container style={{ gridColumnStart: 1, gridColumnEnd: 6, marginTop: 5 }}>
                  <List sm={12} style={{ padding: 5, background: 'white', width: '100%' }}>
                    {mailData &&
                      mailData.map((mail, idx) => {
                        return <GoogleMail data={mail} key={idx} credentials={credentials} />;
                      })}
                  </List>
                </Grid>
              </>
            ) : (
              <p> loading </p>
            )}
            <Card
              style={{
                marginTop: '5px',
                marginBottom: '5px',
                height: '100%',
                padding: '10px',
                borderRadius: 0,
                width: '50%',
                overflowY: 'auto',
                maxHeight: '500px',
                backgroundColor: '#dae0e6',
              }}>
              <RedditReader data={RedditData} />
            </Card>
          </Grid>
        ) : (
          <p> loading </p>
        )}
        <Grid
          container
          style={{
            padding: 10,
            alignSelf: 'start',
            justifyContent: 'flex-end',
            height: '100%',
            width: '50%',
          }}>
          <Card
            style={{
              padding: '10px',
              borderRadius: 0,
            }}>
            <WeatherWidget city={'Stockholm'} />
          </Card>
          <Card
            style={{
              padding: '10px',
              borderRadius: 0,
            }}>
            <TimeDate />
          </Card>
        </Grid>
      </div>
    </>
  );
}
