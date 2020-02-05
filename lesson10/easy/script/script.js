'use strict'

let book = document.querySelectorAll('.book');
let asideBooks = document.querySelector('.books');
asideBooks.insertBefore(book[1],book[0]);
asideBooks.insertBefore(book[5],book[3]);
asideBooks.insertBefore(book[4],book[2]);
asideBooks.insertBefore(book[3],book[2]);
asideBooks.insertBefore(book[5],book[2]);

let changeBackground = document.querySelector ('body').setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');
book[4].querySelector('a').innerText = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

let book2Sections = book[0].querySelector('ul'),
sections2 = book[0].querySelectorAll('li');
book2Sections.insertBefore(sections2[2], sections2[10]);
book2Sections.insertBefore(sections2[6], sections2[4]);
book2Sections.insertBefore(sections2[8], sections2[4]);

let book5Sections = book[5].querySelector('ul'),
section5 = book[5].querySelectorAll('li');
book5Sections.insertBefore(section5[9], section5[2]);
book5Sections.insertBefore(section5[5], section5[8]);
book5Sections.insertBefore(section5[2], section5[6]);

let book6Sections = book[2].querySelector('ul');
let section6 = book[2].querySelectorAll('li');
let newSection = document.createElement('li');
newSection.innerText = 'Глава 8: За пределами ES6';
book6Sections.insertBefore(newSection,section6[9]);