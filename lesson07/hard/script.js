'use strict'

let week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  toDay = new Date().getDay() - 1;

for (let i = 0; i < week.length; i++) {

  if (i == toDay) {

    if (week[i] == 'Saturday' || week[i] == 'Sunday') {

      document.write(`<p><b><i>${week[i]}</i></b></p>`);
    } else {

      document.write(`<p><b>${week[i]}</b></p>`);
    }
  } else if (week[i] == 'Saturday' || week[i] == 'Sunday') {

    document.write(`<p><i>${week[i]}</i></p>`);
  } else {
      
    document.write(`<p>${week[i]}</p>`);
  }
}


console.log(week);
