export const secondsToTime = (sec: number) => {
  if (!sec) {
    return '00:00';
  }
  const hours = Math.floor(sec / 3600); // get hours
  const minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60); //  get seconds
  let time: string[] = [];
  if (hours > 0) {
    if (hours < 10) {
      time = [...time, `0${hours}`];
    } else {
      time = [...time, String(hours)];
    }
  }

  if (minutes < 10) {
    time = [...time, `0${minutes}`];
  } else {
    time = [...time, String(minutes)];
  }
  if (seconds < 10) {
    time = [...time, `0${seconds}`];
  } else {
    time = [...time, String(seconds)];
  }
  return time.join(':'); // Return is HH : MM : SS
};
