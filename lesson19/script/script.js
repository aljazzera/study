window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // Timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timerBlock = document.querySelector('#timer');

        const getTimeRemaining = () => {
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
        };

        const updateClock = () => {
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
        };
        updateClock();       
    };

    setInterval(countTimer, 1000, '20 february 2020');

    // MENU
    const toggleMenu = () => {

		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.body.addEventListener('click', (event) => {
            let target = event.target;
            
            if (target.classList.contains('close-btn')) {
                handlerMenu();
            }

            target = target.closest('.menu');

            if (target){
                handlerMenu();
            } else if (!target) {
                menu.classList.remove('active-menu');
            }
		});
	};
	toggleMenu();

    // POP-UP

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popUpContent = document.querySelector('.popup-content');

        let clientWidth = document.documentElement.clientWidth;
        let begin = 1;
        let animation;

        const popupAnimate = () => {
            let clientWidth = document.documentElement.clientWidth;
            animation = requestAnimationFrame(popupAnimate);
                begin += 15;
                popUpContent.style.top= begin + 'px';
                if ( begin > ( clientWidth / 8 ) ) {
                    begin = 0;
                    cancelAnimationFrame(animation);
                }
        };
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                let clientWidth = document.documentElement.clientWidth;
                if ( clientWidth > 768 ) {
                    popUp.style.display = 'block';
                    popupAnimate();
                } else {
                    popUp.style.display = 'block';
                }
            });
        });
        
        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if(!target){
                    popUp.style.display = 'none';
                }
            }   
        });
    };
    togglePopUp();
// ***********ANIMATE POP-UP**************
    const softScroll = document.querySelectorAll('a[href*="#"]');
    softScroll.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
// *********** / ANIMATE POP-UP**************

// Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for( let i = 0; i < tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;

            target = target.closest('.service-header-tab');

            if (target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }  
                });
            }
        });
    };

    tabs();
});

