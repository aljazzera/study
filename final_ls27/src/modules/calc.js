'use strict'

const calc = (price = 100) => {
  
  /* calc valid */
  const calcValid = () => {
    const inputNumber = document.querySelectorAll('input[type=number]');
    
    const isNumber = (num) => {
      if(/[0-9]/.test(num) || num === 'Backspace' || num === 'Delete' || num === 'ArrowLeft' || num === 'ArrowRight'){
        return true
      } else return false
    };
    
    for(let i = 0; i < inputNumber.length; i++){
      inputNumber[i].addEventListener('keydown', function () {
        if(isNumber(event.key) === false){
          event.preventDefault(false);
        }
      });
    }
  };
  calcValid();
  /* //calc valid */
  
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcCount = document.querySelector('.calc-count'),
    calcDay = document.querySelector('.calc-day'),
    totalValue = document.getElementById('total');
  
  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;
    
    //количество помещений
    if (calcCount.value > 1)
      countValue += (calcCount.value - 1) / 10;
    
    //срок исполнения в днях
    if (calcDay.value && calcDay.value < 5)
      dayValue = dayValue * 2;
    else if (calcDay.value && calcDay.value < 10)
      dayValue *= 1.5;
    
    //общая площадь
    if (typeValue && squareValue)
      total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
    
    totalValue.textContent = total;
  };
  
  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('select') || target.matches('input')){
      countSum();
    }
  })
  
};

export default calc;