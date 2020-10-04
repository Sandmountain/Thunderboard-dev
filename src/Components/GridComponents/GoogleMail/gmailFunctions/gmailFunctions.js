const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
    return then.getDay() + ' ' + months[then.getMonth()];
  }

  //console.log(date);
};
