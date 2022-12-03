// gets how long ago game wa
export const getMatchTimeAgo = gameEndTime => {
  const gameDateStamp = new Date(gameEndTime);
  const todaysDateStamp = Date.now();

  const diff = todaysDateStamp - gameDateStamp;
  if (diff >= 3600000 && diff < 86400000) {
    if (Math.round(diff/3600000) === 1) return ('1 hour ago');
    return (`${Math.round(diff/3600000)} hours ago`);
  }
  if (diff >= 60000 && diff < 3600000) {
    if (Math.round(diff/60000) === 1) return ('1 minute ago');
    return (`${Math.round(diff/60000)} minutes ago`);
  }
  if (diff >= 86400000 && diff < 2592000000) {
    if (Math.round(diff/86400000) === 1) return ('1 day ago');
    return (`${Math.round(diff/86400000)} days ago`);
  }
  if (diff < 60000) {
    return (`${Math.round(diff/1000)} seconds ago`);
  }
  if (diff >= 2592000000 && diff < 31540000000) {
    if (Math.round(diff/2592000000) === 1) return ('1 month ago');
    return (`${Math.round(diff/2592000000)} months ago`);
  }
  else {
    return ('over 1 year ago');
  }
};

export const getUpdatedTimeAgo = lastUpdated => {
  const todaysDateStamp = Date.now();
  
  const diff = todaysDateStamp - lastUpdated;
  if (diff < 180000) return (3 - (Math.round(diff/60000)));
  if (diff >= 3600000 && diff < 86400000) {
    if (Math.round(diff/3600000) === 1) return ('1 hour ago');
    return (`${Math.round(diff/3600000)} hours ago`);
  }
  if (diff >= 60000 && diff < 3600000) {
    if (Math.round(diff/60000) === 1) return ('1 minute ago');
    return (`${Math.round(diff/60000)} minutes ago`);
  }
  if (diff >= 86400000 && diff < 2592000000) {
    if (Math.round(diff/86400000) === 1) return ('1 day ago');
    return (`${Math.round(diff/86400000)} days ago`);
  }
  if (diff >= 2592000000 && diff < 31540000000) {
    if (Math.round(diff/2592000000) === 1) return ('1 month ago');
    return (`${Math.round(diff/2592000000)} months ago`);
  }
  else {
    return ('over 1 year ago');
  }
};

// number format to get commas in large numbers
export const numFormat = new Intl.NumberFormat('en-US');