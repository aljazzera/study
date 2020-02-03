let money = 200,
income = 'Фриланс',
addExpenses = 'Интернет, Магазин, Комуналка',
deposit = 100 == 100,
mission = 1000,
period = 6;

//Вывести в консоль тип данных значений переменных money, income, deposit;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

//Вывести в консоль длину строки addExpenses
console.log(addExpenses.length);

//Вывести в консоль “Период равен (period) месяцев” и “Цель заработать (mission) рублей/долларов/гривен/юани”
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' юани');

//Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

//Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
let budgetDay = money / 30;


//Вывести в консоль budgetDay
console.log(budgetDay);