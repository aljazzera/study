'use strict'

const togglePopUp = () => {
  const popUp = document.querySelector('.popup'),
    popUpContent = document.querySelector('.popup-content'),
    btnPopup = document.querySelectorAll('.popup-btn'),
    btnPopupClose = document.querySelector('.popup-close'),
    width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight;
  
  
  const animatePopUpClose = () => {
    let count = height * 0.1;
    const popupDown = () => {
      count += 20;
      if(count < height * 2)
        popUpContent.style.top = count + 'px';
    };
    
    const interval = () => {
      let idInterval = setInterval(popupDown, 10);
      if (count > height * 2)
        clearInterval(idInterval);
      count = height * 0.1;
      setTimeout(() => {
        popUp.style.display = 'none';
        popUpContent.style.top = height * 0.1 + 'px';
      }, 1000);
    };
    
    popUp.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close'))
        interval();
      else{
        target = target.closest('.popup-content');
        if (!target)
          interval();
      }
    });
    
    if(width <= 768)
      btnPopupClose.addEventListener('click', () => {popUp.style.display = 'none';});
  };
  animatePopUpClose();
  
  btnPopup.forEach((elem) => {
    elem.addEventListener('click', () => {
      popUp.style.display = 'block';
    })
  });
  
};


  // ***********ANIMATE POP-UP**************
const menuList = document.querySelector('menu > ul'),
menuLinks = menuList.querySelectorAll('a[href*="#"]'),
heroLink = document.querySelector('.scroll'),
links = [...menuLinks, heroLink];
  links.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const blockID = anchor.getAttribute('href').substr(1);
          document.getElementById(blockID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

export default togglePopUp;