let start = document.getElementById('start'),
  cancel = document.querySelector('#cancel'),
  plusIncome = document.getElementsByTagName('button')[0],
  plusExpenses = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  incomeItems = document.querySelectorAll('.income-items'),
  data = document.querySelector('.data'),
  dataInput = data.querySelectorAll('input[type=text]'),
  placeHolderName = data.querySelectorAll('input[placeholder=Наименование]'),
  placeHolderSum = data.querySelectorAll('input[placeholder=Сумма]');
  allInputs = document.querySelectorAll('input');

let appData = {
  income: {},
  incomeMonth: 0,
  
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  expenses: {},
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  addExpenses: [],
  addIncome: [],
  possibleExpenses: [],
  mission: 100000,
  period: 0,
  
  start: function () {
    if (salaryAmount.value === '' || isNaN(salaryAmount.value)) {
      start.readOnly = true;
      return;
    }
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.blockInput();
    this.showResult();

    start.style.display = 'none';
    cancel.style.display = 'block';
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';
    cloneIncomeItem.children[1].value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusIncome.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
      if (this.budgetDay >= 1200){
        return ('У вас высокий уровень доходов!');
    } else if(this.budgetDay >= 600 && this.budgetDay < 1200){
        return ('У вас средний уровень доходов!');
    } else if(this.budgetDay < 600 && this.budgetDay > 0){
        return ('У вас уровень доходов ниже среднего!');
    } else if(this.budgetDay <= 0){
        return ('Что то пошло не так...');
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 7);
      } while (isNaN(this.percentDeposit) || this.percentDeposit == '' || this.percentDeposit == null);
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (isNaN(this.moneyDeposit) || this.moneyDeposit == '' || this.moneyDeposit == null);
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  blockInput: function () {
    dataInput.forEach(function (item) {
        item.readOnly = true;
    });
  },
  cancel: function() {
    this.reset();
  },
  reset: function() {
    allInputs.forEach(function (item) {
        item.value = '';
    }); 
    for (let key in this) {
      if (typeof this[key] !== 'function'){
        if (isNaN(this[key])){
          this[key] = '';
        } 
        else if (!isNaN(this[key])){
          this[key] = 0;
        }
      }
    }   
    this.addExpenses = [];
    this.addIncome = [];
    this.income = {};
    this.expenses = {};
    this.possibleExpenses = [];
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    start.style.display = 'block';
    cancel.style.display = 'none';
    periodSelect.addEventListener('input', function()  {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = 0;
    });
    dataInput.forEach(function (item) {
      item.readOnly = false;
    });

  }

};
placeHolderName.forEach(function (item) {
  item.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ .?!,]/i, '');
  });
});

placeHolderSum.forEach(function (item) {
  item.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[\D]/i, '');
  });
});

periodSelect.addEventListener('input', function () { 
  periodAmount.textContent = periodSelect.value;
});


start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));
plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);