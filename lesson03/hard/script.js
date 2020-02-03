'use strict';



const lang = 'ru';

let days = {
    'ru':['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье.'],
    'en':['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday.'],
};
console.log(days[lang]);

if (lang == 'ru') {
    console.log(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье.']);  
} 
if(lang == 'en'){
    console.log(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье.']); 
}

switch (lang) {
    case 'ru':
        console.log(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье.']); 
        break;
    case 'en':
        console.log(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье.']); 
        break;
}


const namePerson = 'Максим';

const position = (namePerson == 'Артём') ? 'директор' : 
               (namePerson == 'Максим') ? 'преподаватель' : 'студент';
             

console.log(position);