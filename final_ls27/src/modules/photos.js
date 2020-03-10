'use strict'

const photos = () => {
  const command = document.getElementById('command'),
    img = command.querySelectorAll('img');
  let imgSrc,
    imgData;
  
  for(let i = 0; i < img.length; i++){
    img[i].addEventListener('mouseenter', (event) => {
      imgSrc = img[i].getAttribute('src');
      imgData = img[i].dataset.img;
      event.target.src = imgData;
    });
    img[i].addEventListener('mouseleave', (event) => {
      event.target.src = imgSrc;
    });
  }
};

export default photos;