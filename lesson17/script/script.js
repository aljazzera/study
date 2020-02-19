window.addEventListener('DOMContentLoaded', function(){
    'use strict'

    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timerBlock = document.querySelector('#timer');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                if(hours < 10 && hours >= 0 ) {
                    hours = '0' + hours;                
                }
                if(minutes < 10 && minutes >= 0) {
                    minutes = '0' + minutes;
                }
                if(seconds < 10 && seconds >= 0) {
                    seconds = '0' + seconds;
                }
                return{timeRemaining, hours, minutes, seconds};
        }

        function updateClock () {
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds; 
           

            if (timer.hours < 0) { 
                timerBlock.style.color = "red";
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';  
            }
        }
        updateClock();       
    }

    setInterval(countTimer, 1000, '20 february 2020');
});

