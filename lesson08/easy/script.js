'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
sumExpenses,
cashIncome,
itemIncome,
questionExpenses,
separateWords,
addExpenses,


start = function() {
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};

start();

let appData = {
    budget: money,
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
        }
        while(isNumber(addExpenses) || addExpenses <= null || addExpenses.trim() === '');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
        
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for (let i = 0; i < 2; i++) {
            do{
                questionExpenses = prompt('Введите обязательную статью расходов?');
            }
            while(isNumber(questionExpenses) || questionExpenses <= null || questionExpenses.trim() === '');
            
            do{
                sumExpenses = prompt('Во сколько это обойдется?');
            }    
            while (!isNumber(sumExpenses));
             appData.expenses[questionExpenses] = Number(sumExpenses);
             console.log(appData.expenses);
            };
            
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
            appData.expensesMonth += appData.expenses[key];
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

let expenses = [];
    
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();


console.log("Бюджет на день:", appData.budgetDay);
console.log("Расходы за месяц: ", appData.expensesMonth);

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


