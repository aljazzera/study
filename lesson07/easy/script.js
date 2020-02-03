'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
sumExpenses,


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
    addExpenses: {},
    deposit: false,
    mission: 100000,
    period: 0,
    getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
          } 
    },
    getBudget: function() {
        appData.budgetDay = Math.floor((appData.budget - appData.expensesMonth) / 30);
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
    asking: function(){
        do{
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
        }
        while(isNumber(this.addExpenses));
       
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for (let i = 0; i < 2; i++) {
            let questionExpenses = prompt('Введите обязательную статью расходов?');
            
            do{
                sumExpenses = prompt('Во сколько это обойдется?');
            }    
            while (!isNumber(sumExpenses));
             appData.expenses[questionExpenses] = sumExpenses;
             console.log(appData.expenses);
            };
            
    }
};

let expenses = [];
    
appData.asking(),
appData.getExpensesMonth(),
appData.getBudget(),
appData.getTargetMonth(),
appData.getStatusIncome();

console.log("Бюджет на день:", appData.budgetDay);
console.log("Расходы за месяц: " + appData.expensesMonth);

for (let key in appData) {
    console.log('Наша программа включает в себя данные:' + key + ': ' + appData[key]);
  }
