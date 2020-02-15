'use strict';
let startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
    plusButtons = document.getElementsByTagName('button'),
    plusButtonsOne = plusButtons[0],
    plusButtonsTwo = plusButtons[1],
    depositCheck = document.getElementById('deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    // inputElements = document.querySelectorAll('[class$="-value"]');
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    inputTypeText = document.querySelectorAll('[type = "text"]'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositPercentCurrent;


class AppData{
  constructor(){
    this.income = {};
    this.addIncome = [];
    this.incomeMont = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  start(){
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getDeposit();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAdd('addExpenses', additionalExpensesItem.value.split(','));
    this.getAdd('addIncome', additionalIncomeItem);
    this.changePeriod();
    this.showResult();
  }
  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil( this.budgetDay );
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
      incomePeriodValue.value = this.calcPeriod();
    }.bind(this));
  }

  addBlocks(e){
    if( e.target.classList.contains( 'btn_plus' ) ){
      let button = e.target;
      let parentNode = button.parentNode;
      let neededClass = parentNode.className;
      let clonedEl = parentNode.querySelector( "." + neededClass + "-items" ).cloneNode(true);
      clonedEl.querySelectorAll('input').forEach(function(input){
        input.value = '';
      });
      parentNode.insertBefore( clonedEl, button );

      let items = parentNode.querySelectorAll('.' + neededClass + '-items');

      if(items.length === 3){
        button.style.display = 'none';
      }
    }
  }
  
  getExpInc(){
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = +itemAmount;
      }
    };
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    this.incomeMonth = 0;
    for( let key in this.income ){
      this.incomeMonth += this.income[key];
    }
  }

  getAdd(field, items){
    this[field] = [];
    items.forEach(it => {
      let itemValue = (it.value !== undefined) ? it.value.trim() : it.trim();
      if(itemValue !== ''){
        this[field].push(itemValue);
      }
    });
  }

  getDeposit(){
    this.deposit = depositCheck.checked;
  }
  getExpensesMonth(){
    this.expensesMonth = 0;
    for (let expItem in this.expenses) {
      this.expensesMonth += +this.expenses[expItem];
    }  
  }
  getBudget(){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth(){
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome(){
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  }
  changePeriod(){
    periodAmount.innerHTML = periodSelect.value;
  }
  calcPeriod(){
    return this.budgetMonth * periodSelect.value;
  }
  reset(){
    periodSelect.value = 1;
    this.changePeriod();
    inputTypeText.forEach( function(item) {
      item.value = ''; 
      item.disabled = false;
    });
    if(incomeItems.length > 1){
      incomeItems.forEach( function(item, index) {
        if(index > 0){
          item.remove();
        }
      });
    }
    if(expensesItems.length > 1){
      expensesItems.forEach( function(item, index) {
        if(index > 0){
          item.remove();
        }
      });
    }
    plusButtonsTwo.style.display = 'block';
    plusButtonsOne.style.display = 'block';
    depositCheck.checked = false;
    this.depositHandler();

    this.income = {};
    this.addIncome = [];
    this.incomeMont = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  getInfoDeposit(){
    if(this.deposit){
      this.percentDeposit = +depositPercentCurrent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent(){
    if (this.value === 'other'){
      depositPercent.style.display = 'inline-block';
      depositPercentCurrent = depositPercent;
    }else{
      depositPercentCurrent = this;
      depositPercent.style.display = 'none';
    }
  }

  depositHandler(){
    if(depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    }else{
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListener(){
    periodSelect.addEventListener('input', this.changePeriod);
  
    startButton.addEventListener('click', function(event){
      event.preventDefault();
      if (salaryAmount.value.trim() !== ''){
        this.start();
        startButton.hidden = true;
        cancelButton.style.display = 'block';
        inputTypeText = document.querySelectorAll('[type = "text"]');
        inputTypeText.forEach( function(item) {
          item.disabled = true;
        });
      }else {
        alert('Заполните поле дохода!');
      }
    }.bind(this));
  
    cancelButton.addEventListener('click', function(event){
      this.reset();
      startButton.hidden = false;
      cancelButton.style.display = 'none';
    }.bind(this));
  
    document.addEventListener("input", function(e){
      
      if( e.target.placeholder === 'Наименование' ){
        let regexp = /[^а-яА-Я\s\,\.]{0,}/g;
        e.target.value = e.target.value.replace( regexp, "" );
      }
  
      if( e.target.placeholder === 'Сумма'){
        let regexp = /[^\d]{0,}/g;
        e.target.value = e.target.value.replace( regexp, "" );
      }

      if( e.target === depositPercent){
        if( isNumber( e.target.value ) && ( e.target.value > 0 && e.target.value < 100 ) ){
          startButton.disabled = false;
        } else {
          alert( "Введите корректное значение в поле проценты" );
          startButton.disabled = true;
        }
      }
    });

    document.addEventListener("click", this.addBlocks );
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    
  
  }
}
  
const appData = new AppData();

appData.eventListener();

function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}  