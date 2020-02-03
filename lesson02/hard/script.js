//1) Создать переменную num со значением 266219 (тип данных число)
const num = 266219,

//2) Вывести в консоль произведение (умножение) цифр этого числа
//Например: число 123, при помощи javaScript получить каждое цифру ( 1, 2, 3 ) и перемножить их.
//Правильно использовать цикл или методы перебора.
numbersStr = num.toString(),
numbersArray = numbersStr.split('');
let arrayResult = numbersArray.reduce(function(a, b){
    return a * b
});
console.log(arrayResult);



//3) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
let arrayResultDegree = arrayResult ** 3;
console.log(arrayResultDegree);

//4) Вывести на экран первые 2 цифры полученного числа
let finalValue = arrayResultDegree.toString();
console.log(finalValue.substring(0, 2));

//5) В отдельном репозитории для усложненных уроков, добавить папку или ветку со вторым уроком в свой репозиторий на GitHub