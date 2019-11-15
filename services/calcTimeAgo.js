'use strict';

let calcTimeAgo = (postTimeStamp) => {
  
  let elapsedTime = 0;
  let currentTimeSec = new Date;
  currentTimeSec = Math.floor(currentTimeSec.getTime()/1000);

  elapsedTime = Math.floor((currentTimeSec - postTimeStamp))

  return elapsedTime;
}

export { calcTimeAgo };