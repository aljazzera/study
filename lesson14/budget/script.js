'use strict'

let calculate = document.getElementById('start'),
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
    placeHolderSum = data.querySelectorAll('input[placeholder=Сумма]'),
    allInputs = document.querySelectorAll('input');    




const AppData = function(){
    this.income = {};
    this.incomeMonth = 0;
    this.mission = 500000;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.expenses = {};
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
    this.addIncome = [];
    this.possibleExpenses = [];
};

AppData.prototype.start = function() {
    if(salaryAmount.value === '' || isNaN(salaryAmount.value)){
        calculate.readOnly = true;
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

    calculate.style.display = 'none';
    cancel.style.display = 'block';
};
AppData.prototype.addExpensesBlock = function() {
        
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[1].value = '';
    
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if (expensesItems.length === 3) {
        plusExpenses.style.display = 'none';
    }
    cancel.addEventListener('click', () => {
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        cloneExpensesItem.remove();
        plusExpenses.style.display = 'block';
    });
    placeHolderName = data.querySelectorAll('input[placeholder=Наименование]');
    placeHolderSum = data.querySelectorAll('input[placeholder=Сумма]');
    this.checkOut();
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';
    cloneIncomeItem.children[1].value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    
    if (incomeItems.length === 3) {
        plusIncome.style.display = 'none';
    }
    cancel.addEventListener('click', () => {
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        cloneIncomeItem.remove();
        plusIncome.style.display = 'block';
    });
    placeHolderName = data.querySelectorAll('input[placeholder=Наименование]');
    placeHolderSum = data.querySelectorAll('input[placeholder=Сумма]');
    this.checkOut();
};
AppData.prototype.getExpenses = function() {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        } 
    });
};
AppData.prototype.getIncome = function() {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }    
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();
    });
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 800) {
        console.log('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
        console.log('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
        console.log('Низкий уровень дохода');
    } else if (this.budgetDay < 0) {
        console.log('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit){
        do {
            this.percentDeposit = prompt('Какой ваш годовой процент?', 10);
        } while (isNaN(this.percentDeposit) || this.percentDeposit == '' || this.percentDeposit == null);
        do{    
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit == '' || this.moneyDeposit == null);
    }
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockInput = function() {
    dataInput.forEach((item) => {
        item.readOnly = true;
    });
};
AppData.prototype.reset = function() {
    allInputs.forEach((item) => {
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
    periodSelect.addEventListener('input', () => {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = 0;
    });
    dataInput.forEach((item) => {
        item.readOnly = false;
    });
    periodSelect.value = 0;
    periodAmount.textContent = 1;
    calculate.style.display = 'block';
    cancel.style.display = 'none';
};
AppData.prototype.checkOut = function () {
    placeHolderName.forEach((item) => {
        item.addEventListener('input', function(event) {
            event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ .?!,]/i,'');
        });
    });
    placeHolderSum.forEach((item) => {
        item.addEventListener('blur', function(event){
            if (isNaN(event.target.value)) {
                alert('Это не число!');
                event.target.value = '';
                return;
            }
        });
    });
};
AppData.prototype.eventsListeners = function() {
    periodSelect.addEventListener('input', function(){
            periodAmount.textContent = periodSelect.value;
    });
    calculate.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    plusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
    plusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
};
const appData = new AppData();

appData.checkOut();
appData.eventsListeners();