'use strict';

let money = +prompt('Ваш месячный доход?', 10000),
income = 'Фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mainExpenses = prompt('Введите обязательную статью расходов?', 'Магазин'),
mainAmount = +prompt('Во сколько это обойдется?', 1000),
additionalExpenses = prompt('Введите обязательную статью расходов?', 'Коммуналка'),
additionalAmount = +prompt('Во сколько это обойдется?', 2000),
mission = 100000,


showTypeOf = function (data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

const expensesMonth = function getExpensesMonth() {
    return mainAmount + additionalAmount;
};
const accumulatedMonth = function getAccumulatedMonth() {
    return money - expensesMonth();
};
const targetMonth = function getTargetMonth() {
    return mission / accumulatedMonth();
};

const period = Math.ceil(mission / accumulatedMonth());
console.log('Цель будет достигнута за: ' + period + ' месяцев.');

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










