let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items').querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositPercent = document.querySelector('.deposit-percent');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let sumExpenses,
cashIncome,
itemIncome,
questionExpenses,
separateWords,
addExpenses;

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: {},
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,  
    period: 0,
    start: function() {

        if(salaryAmount.value === ''){
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        }

        appData.budget = salaryAmount.value;

        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue = appData.addExpenses.join(', ');
    },
    addExpensesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    asking: function(){

        if(confirm('Есть ли у вас дополнительный источник заработка?')){
            do{
                itemIncome = prompt('Какой у вас дополнительный заработок?');  
            }
            while(isNumber(itemIncome) || itemIncome <= null || itemIncome.trim() === '');
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            } 
            while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }        
        do{
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
        }
        while(isNumber(addExpenses) || addExpenses <= null || addExpenses.trim() === '');
        
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
            
    }, 
    getInfoDeposit: function(){
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            } 
            while (!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while(!isNumber(appData.moneyDeposit));
        }
    },
    
    getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
            } 
    },
    getBudget: function() {
        appData.budgetDay = Number(Math.floor((appData.budget - appData.expensesMonth) / 30));
        appData.budgetMonth = appData.budgetDay * 30;  
    },
    getTargetMonth: function () {
            appData.period = Math.floor(appData.mission / appData.budgetMonth);
            if (appData.period >= 0) {
                console.log ('Цель будет достигнута за: ' + appData.period + ' месяцев.');
            } else {
                console.log ('Цель не будет достигнута');
            }
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

    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

let expenses = [];
    

// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// appData.calcSavedMoney();

for (let key in appData) {
    console.log('Наша программа включает в себя данные:' + key + ': ' + appData[key]);
    }

const getExpenses = function () {
    const arr = appData.addExpenses.map(function (item) {
        return item.charAt().toUpperCase() + item.slice([1]);
    });
    console.log('Возможные расходы: ', arr.join(', '));
}
appData.addExpenses = getExpenses();





