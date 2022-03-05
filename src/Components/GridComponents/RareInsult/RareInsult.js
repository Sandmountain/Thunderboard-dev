// import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function RareInsult() {
  const [insult, setInsult] = useState(undefined);

  useEffect(() => {
    const fetchInsult = async () => {
      // Doesn't work :(
      // try {
      //   const res = await axios.get(
      //     'https://evilinsult.com/generate_insult.php?lang=en&type=json',
      //     {
      //       headers: { 'Access-Control-Allow-Origin': '*' },
      //     }
      //   );
      //   setInsult(res.data.insult);
      // } catch (error) {

      // }
      const insults = require('./insults.json');
      setInsult(insults[Math.floor(Math.random() * insults.length)]);
    };

    if (!insult) {
      fetchInsult();
    }
    return;
  });

  return <p className="insultText">{insult}</p>;
}
