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


const AppData = function() {
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.expensesAmount = 0;
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
}




AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesAmount;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return this.budgetMonth;
};

AppData.prototype.getTargetMonth = function () {
    return Math.ceil(inputTargetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getTargetStatus = function () {
    if(this.getTargetMonth() < 0 || this.getTargetMonth() == 0)
    {
        return'Цель не будет достигнута';
    }
    else if (this.getTargetMonth() > 0)
    {
        return `Цель будет достигнута за ${this.getTargetMonth()} месяцев`;
    }
};

AppData.prototype.getInfoDeposit = function() {
    if (this.deposit)
    {
        do
        {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while(!this.isNumber(this.percentDeposit))

        do
        {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while(!this.isNumber(this.moneyDeposit))
    }
};

AppData.prototype.calcPeriod = function() {
    inputIncomePeriod.value = this.budgetMonth * periodSelect.value;
};

AppData.prototype.start = function () {
    this.budget = +inputSalaryAmount.value;
    this.getExpenses.call(this);
    this.getIncome.call(this);
    this.getExpensesMonth.call(this);
    // this.getInfoDeposit();
    this.getAddExpenses.call(this);
    this.getAddIncome.call(this);
    this.getBudget();
    this.showResult();
};

AppData.prototype.showResult = function() {
    periodSelect.addEventListener('input', this.calcPeriod.bind(this));
    inputBudgetMonth.value = this.budgetMonth;
    inputBudgetDay.value  = this.budgetDay;
    inputExpensesMonth.value = this.expensesMonth;
    inputAdditionalExpenses.value = this.addExpenses.join(', ');
    inputAdditionalIncomeRightSide.value = this.addIncome.join(', ');
    inputPeriodTargetMonth.value = this.getTargetMonth.apply(this);
    this.calcPeriod();        
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesPlus);
    this.regExpInputs();
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3)
    {
        buttonExpensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonAddIncomePlus);
    this.regExpInputs();
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3)
    {
        buttonAddIncomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;

        if(isNaN(itemExpenses.trim()) && this.isNumber(cashExpenses))
        {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};

AppData.prototype.getIncome = function() {
    incomeItems.forEach(function (item) {
        let incomeTitle = item.querySelector('.income-title').value,
            incomeAmount = item.querySelector('.income-amount').value;
            
            if (isNaN(incomeTitle.trim()) && this.isNumber(incomeAmount.trim()))
            {
                this.income[incomeTitle] = incomeAmount;
            }
    }, this);

    for (let key in this.income)
    {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getExpensesMonth = function () {
    for(let key in this.expenses)
    {
        this.expensesMonth += +(this.expenses[key]);
    }
    this.expensesAmount =  this.expensesMonth;
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = inputAdditionalExpensesItem.value.split(', ');

     addExpenses.forEach(function(item) {
        if (item.trim())
        {
            this.addExpenses.push(item.trim());
        }
    }, this);
};

AppData.prototype.getAddIncome = function() {
    inputAdditionalIncomeLeftSide.forEach(function(item) {

        if(item.value.trim())
        {
            this.addIncome.push(item.value.trim());
        }
    }, this);
};

AppData.prototype.changePeriodAmount = function() {
    if(+periodSelect.value > +periodAmount.textContent)
    {
        periodAmount.textContent++;
    }
    
    if (+periodSelect.value < +periodAmount.textContent)
    {
        periodAmount.textContent--;
    }
};

AppData.prototype.checkSalaryAmount = function() {
    if(inputSalaryAmount.value.trim())
    {
        buttonCalculate.disabled = false;
    }
    else
    {
        buttonCalculate.disabled = true;
    }
};

AppData.prototype.reset = function () {
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

    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.expensesAmount = 0;
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    this.checkSalaryAmount();
};


AppData.prototype.isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


AppData.prototype.firstLetterToUpperCase = function (data) {
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


AppData.prototype.regExpInputs = function () {
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

AppData.prototype.changeButtons = function () {
    buttonCalculate.style.display = 'none';
    buttonCalculate.disabled = true;

    btnReset.style.display = 'block';
    btnReset.disabled = false;

    buttonAddIncomePlus.disabled = true;
    buttonExpensesPlus.disabled = true;

    this.turnOffInputs();
}

AppData.prototype.turnOffInputs = function () {
    let inputsLeftSide = document.querySelector('.data').querySelectorAll('input');
    inputsLeftSide.forEach(function (item) {
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

AppData.prototype.eventListeners = function() {
    buttonCalculate.addEventListener('click', this.start.bind(this));
    buttonCalculate.addEventListener('click', this.changeButtons.bind(this));
    btnReset.addEventListener('click', this.reset.bind(this));
    buttonExpensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    buttonAddIncomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
    inputSalaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
}


const appData = new AppData();

appData.eventListeners();
appData.regExpInputs();




// console.log('Расходы за месяц: ' + appData.expensesAmount);
// console.log(appData.getTargetStatus());
// console.log(appData.getStatusIncome());
// console.log('Возможные расходы: ' + firstLetterToUpperCase(appData.addExpenses));





