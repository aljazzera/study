'use strict';

let start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    salaryAmount = document.querySelector('.salary-amount'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    expensesItems = document.querySelectorAll('.expenses-items'),
    plusBtns = document.getElementsByTagName('button'),
    incomePlus = plusBtns[0],
    expensesPlus = plusBtns[1],
    btnPlus = document.querySelectorAll('.btn_plus'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    incomeItem = document.querySelectorAll('.income-items'),
    dataInputs = document.querySelectorAll('.data input[type="text"]'),
    incomeTitle = document.querySelectorAll('input.income-title'),
    expensesTitle = document.querySelectorAll('input.expenses-title'),
    incomeAmount = document.querySelectorAll('input.income-amount'),
    expensesAmount = document.querySelectorAll('input.expenses-amount');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income:{},
    incomeMonth: 0,
    addIncome:[],
    expenses:{},
    addExpenses:[],
    deposit:false,
    start: function(){
        
        if (salaryAmount.value !== "") {
            this.budget = +salaryAmount.value;

            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();

            this.showResult();
        } else {
            return false;
        }

    },
    showResult: function() {
        
        budgetDayValue.value = this.budgetDay;
        budgetMonthValue.value = this.budgetMonth;
        expensesMonthValue.value  = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcPeriod();
        });

        dataInputs = document.querySelectorAll('.data input[type="text"]');
        for (let d = 0; d < dataInputs.length; d++) {
            dataInputs[d].setAttribute('disabled', true);
        }
        for (let b = 0; b < btnPlus.length; b++) {
            btnPlus[b].setAttribute('disabled', true);
        }
        
        start.style.display = 'none';
        cancel.style.display = 'block';

        console.log(this.getStatusIncome());

    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true),
            cloneExpensesInputs = cloneExpensesItem.querySelectorAll('input');

        for (let c = 0; c < cloneExpensesInputs.length; c++) {
            cloneExpensesInputs[c].value = '';
        }

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
        expensesTitle = document.querySelectorAll('input.expenses-title');
        expensesAmount = document.querySelectorAll('input.expenses-amount');
        appData.addInputsCtrl();
        
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true),
            cloneIncomeInputs = cloneIncomeItem.querySelectorAll('input');
        
        for (let c = 0; c < cloneIncomeInputs.length; c++) {
            cloneIncomeInputs[c].value = '';
        }
        
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
        incomeTitle = document.querySelectorAll('input.income-title');
        incomeAmount = document.querySelectorAll('input.income-amount');
        appData.addInputsCtrl();
    },
    getExpenses: function() {
        expensesItems = document.querySelectorAll('.expenses-items');
        
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
        
    },
    getIncome: function() { 
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = +cashIncome;
                }
        });

        for (let key in appData.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay   = (Math.floor( (this.budgetMonth / 31) * 100 )) / 100;
    },
    getTargetMonth: function () {
        if ( (Math.ceil(Number(targetAmount.value) / this.budgetMonth)) < 0 ) {
            return "Цель не будет достигнута";
        } else {
            return Math.ceil(Number(targetAmount.value) / this.budgetMonth);
        }
    },
    getStatusIncome: function() {
        switch (true) {
            case this.budgetDay >= 800: 
                return('Высокий уровень дохода.');
            case this.budgetDay < 800 && this.budgetDay > 300: 
                return('Средний уровень дохода.');
            case this.budgetDay <= 300 && this.budgetDay > 0: 
                return('Низкий уровень дохода.');
            case this.budgetDay == 0: 
                return('Это фиаско, братан...');
            case this.budgetDay < 0: 
                return('Что-то пошло не так.');
            default: return('Что-то очень сильно пошло не так.');
        }
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },
    changePeriod: function() {
        periodAmount.textContent = periodSelect.value;
    },
    inputsCtrlRu: function() {
        let val = event.target.value;
        val = val.replace(/[^а-яА-ЯёЁ.,!?"":;-\s]/g, '');
        event.target.value = val;
    },
    inputsCtrlNum: function() {
        let val = event.target.value;
        val = val.replace(/[^0-9]/g, '');
        event.target.value = val;
    },
    addInputsCtrl: function() {
        
        for (let i = 0; i < incomeTitle.length; i++) {
            incomeTitle[i].addEventListener('input', this.inputsCtrlRu);
        } 
        
        for (let i = 0; i < incomeAmount.length; i++) {
            incomeAmount[i].addEventListener('input', this.inputsCtrlNum);
        }

        for (let a = 0; a < additionalIncomeItem.length; a++) {
            additionalIncomeItem[a].addEventListener('input', this.inputsCtrlRu);
        }

        for (let e = 0; e < expensesTitle.length; e++) {
            expensesTitle[e].addEventListener('input', this.inputsCtrlRu);
        }
        
        for (let e = 0; e < expensesAmount.length; e++) {
            expensesAmount[e].addEventListener('input', this.inputsCtrlNum);
        }

        additionalExpensesItem.addEventListener('input', this.inputsCtrlRu);
        salaryAmount.addEventListener('input', this.inputsCtrlNum);
        targetAmount.addEventListener('input', this.inputsCtrlNum);
    },
    reset: function() {
        let allInputs = document.querySelectorAll('input');
        for (let i = 0; i < allInputs.length; i++) {
            allInputs[i].value = "";
            allInputs[i].removeAttribute('disabled');
            
            if (allInputs[i].getAttribute('type') === 'checkbox') {
                allInputs[i].checked = false;
            }
            if (allInputs[i].getAttribute('type') === 'range') {
                allInputs[i].value = 1;
                periodAmount.textContent = allInputs[i].value = 1;
            }
        }
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;

        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length !== 1) {
            for (let i = 1; i < incomeItem.length; i++) {
                incomeItem[i].parentNode.removeChild(incomeItem[i]);
            }
        }

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length !== 1) {
            for (let e = 1; e < expensesItems.length; e++) {
                expensesItems[e].parentNode.removeChild(expensesItems[e]);
            }
        }

        for (let b = 0; b < btnPlus.length; b++) {
            btnPlus[b].removeAttribute('disabled');
            
            if (btnPlus[b].hasAttribute('style')) {
                btnPlus[b].removeAttribute('style');
            }
        }

        start.style.display = 'block';
        cancel.style.display = 'none';
    },
};

appData.addInputsCtrl();
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.changePeriod);