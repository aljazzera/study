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
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.blockInput();
    appData.showResult();

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
  // 2) Создать метод addIncomeBlock аналогичный addExpensesBlock 
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
  // 1) Переписать метод getIncome аналогично getExpenses
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
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = appData.calcPeriod();
    });
    // 5) Добавить обработчик события внутри метода showResult, который будет отслеживать период 
    // и сразу менять значение в поле “Накопления за период” (После нажатия кнопки рассчитать, 
    // если меняем ползунок в range, “Накопления за период” меняются динамически аналогично 4-ому пункту)

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
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  // 3) Округлить вывод дневного бюджета
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function () {
      if (appData.budgetDay >= 1200){
        return ('У вас высокий уровень доходов!');
    } else if(appData.budgetDay >= 600 && appData.budgetDay < 1200){
        return ('У вас средний уровень доходов!');
    } else if(appData.budgetDay < 600 && appData.budgetDay > 0){
        return ('У вас уровень доходов ниже среднего!');
    } else if(appData.budgetDay <= 0){
        return ('Что то пошло не так...');
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 7);
      } while (isNaN(appData.percentDeposit) || appData.percentDeposit == '' || appData.percentDeposit == null);
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (isNaN(appData.moneyDeposit) || appData.moneyDeposit == '' || appData.moneyDeposit == null);
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  // 6) Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, проверку поля Месячный доход в методе Start убрать. 
  blockInput: function () {
    dataInput.forEach(function (item) {
      item.readOnly = true;
    });
  }
};
// (hard)2) Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
placeHolderName.forEach(function (item) {
  item.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ .?!,]/i, '');
  });
});

// (hard)3) Поля с placeholder="Сумма" разрешить ввод только цифр
placeHolderSum.forEach(function (item) {
  item.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[\D]/i, '');
  });
});

// 4) Отслеживаем изменения ползунка и передаем значение в periodAmount
periodSelect.addEventListener('input', function () { 
  periodAmount.textContent = periodSelect.value;
});

start.addEventListener('click', appData.start);
plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);