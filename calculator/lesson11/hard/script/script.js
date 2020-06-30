'use strict';
  let buttonCalculate = document.getElementById('start'),
      buttonAddIncomePlus = document.getElementsByTagName('button')[0],
      buttonExpensesPlus = document.getElementsByTagName('button')[1],
      checkBoxDeposit = document.querySelector('#deposit-check'),
      inputAdditionalIncomeLeftSide = document.querySelectorAll('.additional_income-item'),
      inputBudgetMonth = document.querySelector('.budget_month-value'),
      inputBudgetDay = document.querySelector('.budget_day-value'),
      inputExpensesMonth = document.querySelector('.expenses_month-value'),
      inputAdditionalIncomeRightSide = document.querySelector('.additional_income-value'),
      inputAdditionalExpenses = document.querySelector('.additional_expenses-value'),
      inputIncomePeriod = document.querySelector('.income_period-value'),
      inputPeriodTargetMonth = document.querySelector('.target_month-value'),
      inputSalaryAmount = document.querySelector('.salary-amount'),
      incomeItems = document.querySelectorAll('.income-items'),
      inputAdditionalIncomeItemFirst = document.querySelectorAll('.additional_income-item')[0],
      inputAdditionalIncomeItemSecond = document.querySelectorAll('.additional_income-item')[1],
      inputExpensesTitle = document.querySelector('.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
      inputTargetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      imcomeItem = document.querySelectorAll('.income-items'),
      inputs = document.querySelectorAll('input');
    




let appData = {
    
    budgetMonth: 0,
    budgetDay: 0,
    expensesMonth: 0,
    expensesAmount: 0,
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesAmount;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },

    getTargetMonth: function () {
        return Math.ceil(inputTargetAmount.value / appData.budgetMonth);
    },

    getStatusIncome: function () {
        if (appData.budgetDay == '0')
        {
            return ('Наверное вы где-то ввели нуль. Повторите попытку и введите числа больше нуля');
        }
        else if (appData.budgetDay < 0)
        {
            return ('что-то пошло не так');
        }
        else if (appData.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
        }
        else if ( appData.budgetDay >= 600 && appData.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
        }
        else if (appData.budgetDay < 600)
        {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
    },

    getTargetStatus: function () {
        if(appData.getTargetMonth() < 0 || appData.getTargetMonth() == 0)
        {
            return'Цель не будет достигнута';
        }
        else if (appData.getTargetMonth() > 0)
        {
            return `Цель будет достигнута за ${appData.getTargetMonth()} месяцев`;
        }
    },

    getInfoDeposit: function() {
        if (appData.deposit)
        {
            do
            {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while(!isNumber(appData.percentDeposit))

            do
            {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(appData.moneyDeposit))
        }
    },

    calcPeriod: function() {
        inputIncomePeriod.value = appData.budgetMonth * periodSelect.value;
    },
    start: function () {
        appData.budget = +inputSalaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        // appData.getInfoDeposit();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },

    showResult: function() {
        periodSelect.addEventListener('input', appData.calcPeriod);
        inputBudgetMonth.value = appData.budgetMonth;
        inputBudgetDay.value  = appData.budgetDay;
        inputExpensesMonth.value = appData.expensesMonth;
        inputAdditionalExpenses.value = appData.addExpenses.join(', ');
        inputAdditionalIncomeRightSide.value = appData.addIncome.join(', ');
        inputPeriodTargetMonth.value = appData.getTargetMonth();
        appData.calcPeriod();        
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3)
        {
            buttonExpensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonAddIncomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3)
        {
            buttonAddIncomePlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(isNaN(itemExpenses.trim()) && isNumber(cashExpenses))
            {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        })
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;

            if(isNaN(incomeTitle.trim()) && isNumber(incomeAmount.trim()))
            {
                appData.income[incomeTitle] = incomeAmount;
            }
        })

        for (let key in appData.income)
        {
            appData.incomeMonth += +appData.income[key];
        }
    },
    
    getExpensesMonth: function () {
        for(let key in appData.expenses)
        {
            appData.expensesMonth += +(appData.expenses[key]);
        }
        appData.expensesAmount =  appData.expensesMonth;

    },
    getAddExpenses: function () {
        let addExpenses = inputAdditionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '')
            {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        inputAdditionalIncomeLeftSide.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '')
            {
                appData.addIncome.push(itemValue);
            }
        })
    },

    changePeriodAmount: function() {
        if(+periodSelect.value > +periodAmount.textContent)
        {
            periodAmount.textContent++;
        }
        
        if (+periodSelect.value < +periodAmount.textContent)
        {
            periodAmount.textContent--;
        }
    },

    checkSalaryAmount: function() {
        if(inputSalaryAmount.value.trim())
        {
            buttonCalculate.disabled = false;
        }
        else
        {
            buttonCalculate.disabled = true;
        }
    }
}


    function isNumber (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    function firstLetterToUpperCase (data) {
        let splitString = data.split(', '),
            word = '',
            firstLetter = '',
            partOfWord = '',
            output = '';

        for(let i = 0; i < splitString.length; i++)
        {
            if (i == splitString.length - 1)
            {
            word = splitString[i];
            firstLetter = word.substring(0, 1).toUpperCase();
            partOfWord = word.substring(1, word.length);
            output += (firstLetter + partOfWord);
            }
            else
            {
                word = splitString[i];
                firstLetter = word.substring(0, 1).toUpperCase();
                partOfWord = word.substring(1, word.length);
                output += (firstLetter + partOfWord + ', ');    
            }
        }
        return output;
    }

    buttonCalculate.addEventListener('click', appData.start);
    buttonExpensesPlus.addEventListener('click', appData.addExpensesBlock);
    buttonAddIncomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', appData.changePeriodAmount);
    inputSalaryAmount.addEventListener('input', appData.checkSalaryAmount);

    inputs.forEach(function(input) {
        if(input.placeholder == 'Наименование')
        {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^?!,.а-яА-ЯёЁ\s]+$/, '');
            });
        }

        if (input.placeholder == 'Сумма')
        {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^\d]/g, '');
            })
        }
    })

// console.log('Расходы за месяц: ' + appData.expensesAmount);
// console.log(appData.getTargetStatus());
// console.log(appData.getStatusIncome());
// console.log('Возможные расходы: ' + firstLetterToUpperCase(appData.addExpenses));





