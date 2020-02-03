'use strict';

let money = prompt('Ваш месячный доход?'),
income = 'Фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = +prompt('Во сколько это обойдется?'),
mission = 100000,
period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Цель заработать ' + mission + ' юани');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));


let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth);
period = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за: ' + period + ' месяцев.');
let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ' + budgetDay);


if (budgetDay >= 1200){
    console.log('У вас высокий уровень доходов!');
} else if(budgetDay >= 600 && budgetDay < 1200){
    console.log('У вас средний уровень доходов!');
} else if(budgetDay < 600 && budgetDay > 0){
    console.log('У вас уровень доходов ниже среднего!');
} else if(budgetDay <= 0){
    console.log('Что то пошло не так...');
}