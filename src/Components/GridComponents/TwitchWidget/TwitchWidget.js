import { Button, Card, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { openInNewTab } from '../../helperFunctions';

const useStyles = makeStyles({
  universalConvContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 0,
  },
});

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}

export default function TwitchWidget() {
  const [twitchData, setTwitchData] = useState({});
  //https://id.twitch.tv/oauth2/validate
  useEffect(() => {
    getTwitchData();

    async function getTwitchData() {
      try {
        /*const test = await axios.get(
          'https://id.twitch.tv/oauth2/authorize?client_id=i0aiumqtva9pw03zt5t2lw7oill7pz&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read'
        );*/

        const test = await axios.get(
          'https://id.twitch.tv/oauth2/authorize?client_id=i0aiumqtva9pw03zt5t2lw7oill7pz&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read'
        );

        console.log(test);
        fetch(`https://api.twitch.tv/helix/games/top?first=10`, {
          method: 'get',
          headers: new Headers({
            Authorization: 'Bearer 8i0awij2j5ls6n7brnweu3z4dp8qw3',
            'Client-ID': 'i0aiumqtva9pw03zt5t2lw7oill7pz',
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });

        //https://id.twitch.tv/oauth2/authorize?client_id=i0aiumqtva9pw03zt5t2lw7oill7pz&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read
        //da999i0sqvnmo0lnqzx8k3tndydbla
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  // openInNewTab(`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_KEY}&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read`)

  const classes = useStyles();

  return <Card className={classes.universalConvContainer}></Card>;
}
