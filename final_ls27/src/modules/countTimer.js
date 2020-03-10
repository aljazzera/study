'use strict'

const countTimer = (deadline) => {
  const timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');
  
  const getTimeRemainin = () => {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      days = Math.floor(timeRemaining / 60 / 60 / 24);
    let   seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60) % 24;
    
    if (hours.toString().length === 1)
      hours = '0' + hours;
    if (minutes.toString().length === 1)
      minutes = '0' + minutes;
    if (seconds.toString().length === 1)
      seconds = '0' + seconds;
    
    return { timeRemaining, days, hours, minutes, seconds };
  };
  
  const updateClock = () => {
    let timer = getTimeRemainin();
    
    timerHours.textContent = timer.hours;
    timerMinutes.textContent = timer.minutes;
    timerSeconds.textContent = timer.seconds;
    
    if(timer.timeRemaining < 0){
      clearInterval(idInterval);
      timerDays.textContent = '0';
      timerHours.textContent = '0';
      timerMinutes.textContent = '0';
      timerSeconds.textContent = '0';
    }
  };
  
  let idInterval = setInterval(updateClock, 1000);
};

export default countTimer;