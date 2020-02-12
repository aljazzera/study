'use strict'

let buttonHeader = document.getElementsByClassName('header-button')[0],
    inputHeader = document.querySelector('.header-input'),
    buttonRemove = document.querySelectorAll('.todo-remove'),
    buttonComplete = document.querySelectorAll('.todo-complete'),
    ul = document.querySelectorAll('.todo'),
    flag = false,
    arrayToDo = [],
    arrayCompleted = [],
    cloneNodeToDo = ul[0].childNodes[1].cloneNode(true),
    cloneNodeComplete = ul[1].childNodes[1].cloneNode(true);

localStorage.arrayToDo ? arrayToDo = localStorage.getItem("arrayToDo").split('; ') : arrayToDo = [];
localStorage.arrayCompleted ? arrayCompleted = localStorage.getItem("arrayCompleted").split('; ') : arrayCompleted = [];


const addLocalStorageToDo = function(elem) {
    arrayToDo.push(elem);
    localStorage.setItem("arrayToDo", arrayToDo.join('; '));
}
const addLocalStorageCompleted = function(elem) {
    arrayCompleted.push(elem);
    localStorage.setItem("arrayCompleted", arrayCompleted.join('; '))
}

const addListenButtonRemove = function() {
    buttonRemove.forEach(item => item.addEventListener('click', eventButtonRemove))
};
const eventButtonRemove = function(e) {
    let text = e.target.parentNode.parentNode.textContent.split("\n")[0];
    if (arrayToDo.includes(text)) {
        arrayToDo.splice(arrayToDo.indexOf(text), 1);
        localStorage.setItem("arrayToDo", arrayToDo.join('; '));
    };
    if (arrayCompleted.includes(text)) {
        arrayCompleted.splice(arrayCompleted.indexOf(text), 1);
        localStorage.setItem("arrayCompleted", arrayCompleted.join('; '));
    };
    e.target.parentNode.parentNode.remove();
};
const addListenButtonComplete = function() {
    buttonComplete.forEach(item => item.addEventListener('click', eventButtonComplete));
};
const eventButtonComplete = function(e) {
    ul = document.querySelectorAll('.todo');
    let innerText = e.target.parentNode.parentNode.textContent.split("\n")[0];
    if (e.target.parentNode.parentNode.parentNode.getAttribute("class") === "todo") {
        ul[1].append(e.target.parentNode.parentNode);
        arrayToDo.splice(arrayToDo.indexOf(innerText), 1);
        localStorage.setItem("arrayToDo", arrayToDo.join('; '));
        addLocalStorageCompleted(innerText);
    } else {
        ul[0].append(e.target.parentNode.parentNode);
        arrayCompleted.splice(arrayCompleted.indexOf(innerText), 1);
        localStorage.setItem("arrayCompleted", arrayCompleted.join('; '));
        addLocalStorageToDo(innerText);
    };
};


ul.forEach(i => i.removeChild(i.children[0]));
buttonHeader.disabled = true;

arrayToDo.forEach(item => {
    let clones = cloneNodeToDo.cloneNode(true);
    clones.innerHTML = item + clones.innerHTML.replace(/^[^<]*/g, "");
    ul[0].insertAdjacentElement('beforeend', clones);
    buttonRemove = document.querySelectorAll('.todo-remove');
    buttonComplete = document.querySelectorAll('.todo-complete');
    addListenButtonRemove();
    addListenButtonComplete();
});
arrayCompleted.forEach(item => {
    let clones = cloneNodeToDo.cloneNode(true);
    clones.innerHTML = item + clones.innerHTML.replace(/^[^<]*/g, "");
    ul[1].insertAdjacentElement('beforeend', clones);
    buttonRemove = document.querySelectorAll('.todo-remove');
    buttonComplete = document.querySelectorAll('.todo-complete')
    addListenButtonRemove();
    addListenButtonComplete();
})


inputHeader.addEventListener("input", (e) => {
    e.preventDefault();
    flag = true;
    buttonHeader.disabled = false;

});

buttonHeader.addEventListener("click", (e) => {
    if (flag) {
        e.preventDefault();
        buttonHeader.disabled = true;
        flag = false;
        let clone = cloneNodeToDo.cloneNode(true);
        clone.innerHTML = inputHeader.value + clone.innerHTML.replace(/^[^<]*/g, "");
        ul[0].insertAdjacentElement('beforeend', clone);
        ul[0].style.display = "block";
        ul[1].style.display = 'block';
        addLocalStorageToDo(inputHeader.value);
        inputHeader = document.querySelector('.header-input');
        buttonRemove = document.querySelectorAll('.todo-remove');
        buttonComplete = document.querySelectorAll('.todo-complete');
        addListenButtonRemove();
        addListenButtonComplete();
        inputHeader.value = '';

    }
});