'use strict';
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function gameOfNumber(){
    function randomNumber(){
        return Math.ceil(Math.random() * 100);
    };
    const n = randomNumber();
    function guess(){
        const userNum = prompt('Угадай число от 1 до 100!'); 

        if (userNum === null){
            alert('Game Over');
        }else if(!isNumber(userNum)){
            alert('Введите число!');
            guess();
        } else if  (userNum < n){
            alert('Загаданное число больше!');
            guess();
        }  else if (userNum > n) {
            alert('Загаданное число меньше!');
            guess();
        }  else if(userNum == n){
            alert('Угадали!');
            guess();
        }
        
    };
    guess();
    randomNumber();
};
console.log(gameOfNumber());