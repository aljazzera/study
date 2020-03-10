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

    setInterval(countTimer, 1000, '10 march 2020');

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

    // SLIDER

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        portfolioDots = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,  // номер слайда
        interval,
        li;

        // Add Dots
        const addSliderDots = () => {
            for (let i = 0; i < slide.length; i++) {
              let newDot = document.createElement('li');
              newDot.className = 'dot';
              portfolioDots.append(newDot);
              if (i === 0) {
                newDot.classList.add('dot-active');
              }
            }
        };
        addSliderDots();

        const dot = document.querySelectorAll('.dot');
        //  / Add Dots

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
       


        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) =>{
            if(event.target.matches('.portfolio-btn')|| event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) =>{
            if(event.target.matches('.portfolio-btn')|| event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    //  /SLIDER
    //  OUR TEAM
    const photos = () => {
        let commandPhoto = document.querySelectorAll('.command__photo');

        commandPhoto.forEach((item) => {
            const srcImg = item.getAttribute('src');

            item.addEventListener('mouseenter', (event) => {
                let target = event.target;
                target.src = target.dataset.img;
            });

            item.addEventListener('mouseleave', (event) => {
                let target = event.target;
                target.src = srcImg;
            });

        });
    };
    photos();
    //  / OUR TEAM

    // CALCULATE
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            calcItem = document.querySelectorAll('.calc-item'),
            totalValue = document.getElementById('total');

        // validate
        calcBlock.addEventListener('input', () => {
            calcItem.forEach((item) => {
                if (!item[0]) {
                    item.value = item.value.replace(/[^0-9]/g, "");
                }
            });
        });

        // Calc
        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {countValue += (calcCount.value - 1) / 10;}

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.round(price * typeValue * squareValue * countValue * dayValue);
            }

            totalValue.textContent = total;

        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            // if (target.matches('.calc-type') || target.matches('.calc-square') ||
            //     target.matches('.calc-count') || target.matches('.calc-day')) {
            //     console.log("1");
            // }

            // if ( target === calcType || target === calcSquare || target === calcCount || target === calcDay ) {
            //     console.log("1");
            // }

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

    // / CALCULATE

    //  send-ajax-form


    const sendForm = () => {
        const errorMessage = "Error send......",
            loadMessage = "Uploading.......",
            successMessage = "Thanks! We will contact you!";

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: red';
        let progress = document.createElement('progress');
        progress.style.cssText = 'wight: 15%';

        const form1 = document.getElementById('form1');
        const form2 = document.getElementById('form2');
        const form3 = document.getElementById('form3');

        let arrForms = [form1, form2, form3];

        arrForms.forEach((item) => {

            item.addEventListener("submit", (event) => {
                event.preventDefault();
                item.appendChild(statusMessage);
                item.appendChild(progress);

                const formData = new FormData(item);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                statusMessage.textContent = loadMessage;


                postData(body)
                    .then((response) => {
                        if (response.status !== 200) throw new Error('status network not 200');
                        statusMessage.textContent = successMessage;
                    })
                    .then(() => {
                        item.reset();
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(errorMessage);
                    });
            });


        });

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            });

        };
    };
    sendForm();
    // / send-ajax-form

});

