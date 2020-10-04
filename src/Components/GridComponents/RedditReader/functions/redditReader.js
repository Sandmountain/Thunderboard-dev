export const shuffleArray = (shuffleArray) => {
  let a = shuffleArray;

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
};

export const scoreParser = (score) => {
  //console.log(score);
  if (score > 100000) {
    return Math.round(score / 1000) + 'k';
  } else if (score > 1000) {
    return Math.round((score / 1000) * 10) / 10 + 'k';
  }
  return score;
};
