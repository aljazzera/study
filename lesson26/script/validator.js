'use strict'

const valid = () => {
  class Validator {
    constructor({selector, pattern = {}, method}){
      this.form = document.querySelector(selector);
      this.pattern = pattern;
      this.method = method;
      this.elementsForm = [...this.form.elements].filter(item => {
        return item.tagName.toLowerCase() !== 'button' &&
          item.type !== 'button';
      });
      this.error = new Set();
    }
  
    init(){
      this.applyStyle();
      this.setPattern();
      this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
      this.form.addEventListener('submit', (e) => {
        this.elementsForm.forEach( elem => this.checkIt({target: elem}));
        if(this.error.size){
          e.preventDefault();
        }
      });
    }
  
    isValid(elem){
      const validatorMethod = {
        notEmpty(elem) {
          if (elem.value.trim() === '')
            return false;
          return true;
        },
        pattern(elem, pattern) {
          return pattern.test(elem.value);
        }
      };
    
      if(this.method){
        const method = this.method[elem.id];
        if(method){
          return method.every(item => {
            return validatorMethod[item[0]](elem, this.pattern[item[1]]);
          });
        }
      }
      return true;
    }
  
    checkIt(event) {
      const target = event.target;
      if (this.isValid(target)){
        this.showSuccess(target);
        this.error.delete(target);
      }
      else{
        this.showError(target);
        this.error.add(target);
      }
      //console.log(this.error);
    }
  
    showError(elem) {
      elem.classList.remove('success');
      elem.classList.add('error');
    
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error'))
        return;
    
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Ошибка в этом поле';
      errorDiv.classList.add('validator-error');
      elem.insertAdjacentElement('afterend', errorDiv);
    }
  
    showSuccess(elem) {
      elem.classList.remove('error');
      elem.classList.add('success');
      if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
        elem.nextElementSibling.remove();
      }
    }
  
    applyStyle(){
      const style = document.createElement('style');
      style.textContent = `
    input.success {
      border: 2px solid green !important
    }
    input.error {
       border: 2px solid red !important
    }
    .validator-error {
      font-size: 12px;
      font-family: sans-serif;
      color: red;
    }
  `;
      document.head.appendChild(style);
    }
  
    setPattern() {
      if (!this.pattern.phone)
        this.pattern.phone = /^\+?[78]([-()]*\d){10}$/; ///^\+?[78]([-()]*\d){10}$/;
      if (!this.pattern.email)
        this.pattern.email = /^\w+@w+\.\w{2,}$/;
      if (!this.pattern.name)
        this.pattern.name = /^[А-ЯЁа-яё\s]*$/;
    }
  }

  const form1 = new Validator({
    selector: '#form1',
    pattern: {
      phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      name: /^[А-ЯЁа-яё\s]*$/
    },
    method: {
      'form1-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form1-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ]
    }
  });
  const form2 = new Validator({
    selector: '#form2',
    pattern: {
      phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      name: /^[А-ЯЁа-яё\s]*$/
    },
    method: {
      'form2-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form2-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ],
      'form2-message': [
        ['notEmpty'],
        ['pattern', 'name']
      ]
    }
  });
  const form3 = new Validator({
    selector: '#form3',
    pattern: {
      phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      name: /^[А-ЯЁа-яё\s]*$/
    },
    method: {
      'form3-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form3-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ]
    }
  });

  form1.init();
  form2.init();
  form3.init();
};