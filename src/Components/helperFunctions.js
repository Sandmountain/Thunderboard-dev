const times = [
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86400],
  ['week', 604800],
  ['month', 2592000],
  ['year', 31536000],
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const openInNewTab = (id, baseURL = '') => {
  const newWindow = window.open(baseURL + id, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const parseDate = (date) => {
  const now = new Date();
  const then = new Date(date);

  if (now.getDay() === then.getDay()) {
    let minutes = then.getMinutes();
    let hours = then.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
  } else {
    return then.getDate() + ' ' + months[then.getMonth()];
  }

  //TODO : Shows wrong date
};

export const timeSince = (date) => {
  const now = new Date();
  var diff = Math.round((now - date) / 1000);
  return getDiff(diff);
};

export const unixTimeSince = (date) => {
  const now = Math.floor(new Date().getTime() / 1000); // milliseconds => seconds.
  const seconds = now - date;
  return getDiff(seconds);
};

const getDiff = (diff) => {
  for (var t = 0; t < times.length; t++) {
    if (diff < times[t][1]) {
      if (t === 0) {
        return 'Just now';
      } else {
        diff = Math.round(diff / times[t - 1][1]);

        return diff + ' ' + times[t - 1][0] + (diff === 1 ? ' ago' : 's ago');
      }
    }
  }
};

/**
 * Grab the src of an iframe, and replace it
 * with a less terrible version.
 *
 * @param {string}  html Raw HTML from reddit
 * @return {string}      Clean <iframe> code.
 */
export function cleanIframe(html) {
  // Grab the src URL.
  const source = html.match(/(src="([^"]+)")/gi);

  return `<iframe
      title="iframe"
      ${source}
      frameborder='0' 
      scrolling='no' 
      width='100%'
      height="512px"
      hd="1"
      allowfullscreen
      loading="lazy"
      allow="autoplay"
      referrerpolicy="no-referrer"
      allowfullscreen
    />`;
}
