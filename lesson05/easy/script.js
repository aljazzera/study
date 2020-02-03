'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
income = 'Фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 100000,

start = function() {

    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};

start();

const showTypeOf = function (data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.split(', '));

const getExpensesMonth = function(){
    let sum = 0;
    let res = 0;
    for (let i = 0; i < 2; i++) {
  
      expenses[i] = prompt('Введите обязательную статью расходов?');
      sum = prompt('Во сколько это обойдется?');
      while (!isNumber(sum)) {
        sum = prompt('Во сколько это обойдется?');
      }
      res += +sum;
    }
    
    console.log(expenses);
    return (sum);
};

let expensesAmount = getExpensesMonth();

const accumulatedMonth = function getAccumulatedMonth() {
    return money - expensesAmount;
};
const targetMonth = function getTargetMonth() {
    return mission / accumulatedMonth();
};

const period = Math.ceil(mission / accumulatedMonth());

    if (period > 0) {
        console.log('Цель будет достигнута за: ' + period + ' месяцев.');
    } else if (period < 0){
        console.log('Цель не будет достигнута');
    }

let budgetDay = Math.floor(accumulatedMonth() / 30);
console.log('Бюджет на день: ' + budgetDay);

const getStatusIncome = function(){
    if (budgetDay >= 1200){
        return ('У вас высокий уровень доходов!');
    } else if(budgetDay >= 600 && budgetDay < 1200){
        return ('У вас средний уровень доходов!');
    } else if(budgetDay < 600 && budgetDay > 0){
        return ('У вас уровень доходов ниже среднего!');
    } else if(budgetDay <= 0){
        return ('Что то пошло не так...');
    }
};
console.log(getStatusIncome());
