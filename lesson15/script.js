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




class AppData {
    constructor(){
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
}

    start() {
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
}
    addExpensesBlock() {
        
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
}
    addIncomeBlock() {
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
}
getExpenses() {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        } 
    });
}
getIncome() {
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
}
showResult() {
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
}
getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
}
getAddIncome() {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
}
getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
}
getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
}
getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
}
getStatusIncome() {
    if (this.budgetDay >= 800) {
        console.log('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
        console.log('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
        console.log('Низкий уровень дохода');
    } else if (this.budgetDay < 0) {
        console.log('Что то пошло не так');
    }
}
getInfoDeposit() {
    if (this.deposit){
        do {
            this.percentDeposit = prompt('Какой ваш годовой процент?', 10);
        } while (isNaN(this.percentDeposit) || this.percentDeposit == '' || this.percentDeposit == null);
        do{    
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit == '' || this.moneyDeposit == null);
    }
}
calcPeriod() {
    return this.budgetMonth * periodSelect.value;
}
blockInput() {
    dataInput.forEach((item) => {
        item.readOnly = true;
    });
}
reset() {
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
}
checkOut() {
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
}

    eventsListeners() {
        periodSelect.addEventListener('input', function(){
                periodAmount.textContent = periodSelect.value;
        });
        calculate.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        plusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
        plusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
    };
}

const appData = new AppData();

appData.checkOut();
appData.eventsListeners();