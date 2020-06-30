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
      btnReset = document.getElementById('cancel'),
      inputs = document.querySelectorAll('input');
      regExpInputs();




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
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesAmount;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return this.budgetMonth;
    },

    getTargetMonth: function () {
        return Math.ceil(inputTargetAmount.value / this.budgetMonth);
    },

    getStatusIncome: function () {
        if (this.budgetDay == '0')
        {
            return ('Наверное вы где-то ввели нуль. Повторите попытку и введите числа больше нуля');
        }
        else if (this.budgetDay < 0)
        {
            return ('что-то пошло не так');
        }
        else if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
        }
        else if ( this.budgetDay >= 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
        }
        else if (this.budgetDay < 600)
        {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
    },

    getTargetStatus: function () {
        if(this.getTargetMonth() < 0 || this.getTargetMonth() == 0)
        {
            return'Цель не будет достигнута';
        }
        else if (this.getTargetMonth() > 0)
        {
            return `Цель будет достигнута за ${this.getTargetMonth()} месяцев`;
        }
    },

    getInfoDeposit: function() {
        if (this.deposit)
        {
            do
            {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while(!isNumber(this.percentDeposit))

            do
            {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(this.moneyDeposit))
        }
    },

    calcPeriod: function() {
        inputIncomePeriod.value = this.budgetMonth * periodSelect.value;
    },
    start: function () {
        this.budget = +inputSalaryAmount.value;
        this.getExpenses.call(appData);
        this.getIncome.call(appData);
        this.getExpensesMonth.call(appData);
        // this.getInfoDeposit();
        this.getAddExpenses.call(appData);
        this.getAddIncome.call(appData);
        this.getBudget();
        this.showResult();
    },

    showResult: function() {
        periodSelect.addEventListener('input', this.calcPeriod.bind(appData));
        inputBudgetMonth.value = this.budgetMonth;
        inputBudgetDay.value  = this.budgetDay;
        inputExpensesMonth.value = this.expensesMonth;
        inputAdditionalExpenses.value = this.addExpenses.join(', ');
        inputAdditionalIncomeRightSide.value = this.addIncome.join(', ');
        inputPeriodTargetMonth.value = this.getTargetMonth.apply(appData);
        this.calcPeriod();        
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesPlus);
        regExpInputs();
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
        regExpInputs();
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3)
        {
            buttonAddIncomePlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if(isNaN(itemExpenses.trim()) && isNumber(cashExpenses))
            {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    },

    getIncome: function() {
        incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value,
                incomeAmount = item.querySelector('.income-amount').value;
                
                if (isNaN(incomeTitle.trim()) && isNumber(incomeAmount.trim()))
                {
                    this.income[incomeTitle] = incomeAmount;
                }
        }, this);

        for (let key in this.income)
        {
            this.incomeMonth += +this.income[key];
        }
    },
    
    getExpensesMonth: function () {
        for(let key in this.expenses)
        {
            this.expensesMonth += +(this.expenses[key]);
        }
        this.expensesAmount =  this.expensesMonth;

    },
    getAddExpenses: function () {
        let addExpenses = inputAdditionalExpensesItem.value.split(', ');

         addExpenses.forEach(function(item) {
            if (item.trim())
            {
                this.addExpenses.push(item.trim());
            }
        }, this);
    },
    getAddIncome: function() {
        inputAdditionalIncomeLeftSide.forEach(function(item) {
 
            if(item.value.trim())
            {
                this.addIncome.push(item.value.trim());
            }
        }, this);
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
    },

    reset: function () {
        let allInputs = document.querySelectorAll('input');
        allInputs.forEach(item => {
            if(item.classList.contains('period-select'))
            {
                item.value = '1';
            }
            else
            {
                item.value = '';
            }
        })
        
        let inputsLeftSide = document.querySelector('.data').querySelectorAll('input');
        inputsLeftSide.forEach(function(item) {
            item.disabled = false;
        })

        btnReset.style.display = 'none';
        btnReset.disabled = true;

        buttonCalculate.style.display = 'block';
        buttonCalculate.disabled = false;

        buttonAddIncomePlus.disabled = false;
        buttonExpensesPlus.disabled = false;

        periodAmount.textContent = '1';

        if (incomeItems.length > 1)
        {
            for (let i = 0; incomeItems.length > 1; i++)
            {
                incomeItems[0].remove();
                incomeItems = document.querySelectorAll('.income-items');
            }
            buttonAddIncomePlus.style.display = 'block';
        }

        if (expensesItems.length > 1)
        {
            for (let i = 0; expensesItems.length > 1; i++)
            {
                expensesItems[0].remove();
                expensesItems = document.querySelectorAll('.expenses-items');
            }
            buttonExpensesPlus.style.display = 'block';
        }

        this.checkSalaryAmount();
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


    function regExpInputs() {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            if(input.placeholder == 'Наименование')
            {
                input.oninput = function () {
                    this.value = this.value.replace(/[^?!,.а-яА-ЯёЁ\s]+$/, '');
                };
            }
    
            if (input.placeholder == 'Сумма')
            {
                input.oninput = function () {
                    this.value = this.value.replace(/[^\d]/g, '');
                }
            }
        })    
    }

    function changeButtons () {
        buttonCalculate.style.display = 'none';
        buttonCalculate.disabled = true;

        btnReset.style.display = 'block';
        btnReset.disabled = false;

        buttonAddIncomePlus.disabled = true;
        buttonExpensesPlus.disabled = true;


    let inputsLeftSide = document.querySelector('.data').querySelectorAll('input');
        inputsLeftSide.forEach(function(item) {
            if(item.classList.contains('period-select'))
            {
                item.disabled = false;
            }
            else
            {
                item.disabled = true;
            }
        })
    }


    buttonCalculate.addEventListener('click', appData.start.bind(appData));
    buttonCalculate.addEventListener('click', changeButtons);
    btnReset.addEventListener('click', appData.reset.bind(appData));
    buttonExpensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
    buttonAddIncomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
    periodSelect.addEventListener('input', appData.changePeriodAmount.bind(appData));
    inputSalaryAmount.addEventListener('input', appData.checkSalaryAmount.bind(appData));

    

// console.log('Расходы за месяц: ' + appData.expensesAmount);
// console.log(appData.getTargetStatus());
// console.log(appData.getStatusIncome());
// console.log('Возможные расходы: ' + firstLetterToUpperCase(appData.addExpenses));





