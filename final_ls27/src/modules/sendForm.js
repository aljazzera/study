'use strict'

const sendForm = () => {
  
  const errorMessage = "Ошибка отправки формы",
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо, мы скоро с Вами свяжемся!';
  
  const form1 = document.getElementById('form1'),
    form2 = document.getElementById('form2'),
    form3 = document.getElementById('form3'),
    input = document.querySelectorAll('input'),
    name1 = document.getElementById('form1-name'),
    phone1 = document.getElementById('form1-phone'),
    name2 = document.getElementById('form2-name'),
    phone2 = document.getElementById('form2-phone'),
    message = document.getElementById('form2-message'),
    name3 = document.getElementById('form3-name'),
    phone3 = document.getElementById('form3-phone');
  
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem; color: #19b5fe;`;
  
  const post = (selectForm) => {
    
    selectForm.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    
    const formData = new FormData(selectForm);
    let body = {};
    for(let val of formData.entries()){
      body[val[0]] = val[1];
    }
    postData(body)
    .then ((response) => {
      if (response.status !== 200){
        input.forEach((item) => {item.value = '';});
        throw new Error ('status network not 200');
        
      }
      input.forEach((item) => {item.value = '';});
      statusMessage.textContent = successMessage;
    })
    .catch ((error) => {
      statusMessage.textContent = errorMessage;
      console.error(error);
    });
  };
  
  //*подключение к форме в header*/
  form1.addEventListener('submit', (event) => {
    event.preventDefault();
    if (name1.classList.contains('error') || phone1.classList.contains('error')){
      return false;
    } else
      post(form1);
  });
  
  /*подключение к форме в footer*/
  form2.addEventListener('submit', (event) => {
    event.preventDefault();
    if (name2.classList.contains('error') || phone2.classList.contains('error') || message.classList.contains('error')){
      return false;
    } else
      post(form2);
  });
  
  /*подключение к модальному окну*/
  form3.addEventListener('submit', (event) => {
    event.preventDefault();
    if (name3.classList.contains('error') || phone3.classList.contains('error')){
      return false;
    } else
      post(form3);
  });
  
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };
};

export default sendForm;