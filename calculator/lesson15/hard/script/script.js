'use strict';

const buttonCalculate = document.getElementById('start'),
      buttonAddincomePlus = document.getElementsByTagName('button')[0],
      buttonAddexpensesPlus = document.getElementsByTagName('button')[1],
      checkBoxDeposit = document.querySelector('#deposit-check'),
      btnReset = document.getElementById('cancel'),
      incomeItem = document.querySelectorAll('.income-items'),
      inputTargetAmount = document.querySelector('.target-amount'),
      inputBudgetMonth = document.querySelector('.budget_month-value'),
      inputBudgetDay = document.querySelector('.budget_day-value'),
      inputExpensesMonth = document.querySelector('.expenses_month-value'),
      inputAdditionalIncomeRightSide = document.querySelector('.additional_income-value'),
      inputAdditionalExpenses = document.querySelector('.additional_expenses-value'),
      inputIncomePeriod = document.querySelector('.income_period-value'),
      inputPeriodTargetMonth = document.querySelector('.target_month-value'),
      inputSalaryAmount = document.querySelector('.salary-amount'),
      inputAdditionalIncomeLeftSide = document.querySelectorAll('.additional_income-item'),
      inputAdditionalIncomeItemFirst = document.querySelectorAll('.additional_income-item')[0],
      inputAdditionalIncomeItemSecond = document.querySelectorAll('.additional_income-item')[1],
      inputExpensesTitle = document.querySelector('.expenses-title'),
      inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
      inputs = document.querySelectorAll('input'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');

      
  let expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items');


class AppData {
    constructor () {
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

    getBudget () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesAmount;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return this.budgetMonth;
    }
    
    getTargetMonth () {
        return Math.ceil(inputTargetAmount.value / this.budgetMonth);
    }
    
    getStatusIncome () {
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
    }
    
    getTargetStatus () {
        if(this.getTargetMonth() < 0 || this.getTargetMonth() == 0)
        {
            return'Цель не будет достигнута';
        }
        else if (this.getTargetMonth() > 0)
        {
            return `Цель будет достигнута за ${this.getTargetMonth()} месяцев`;
        }
    }
    
    getInfoDeposit () {
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
    }
    
    calcPeriod () {
        inputIncomePeriod.value = this.budgetMonth * periodSelect.value;
    }
    
    start () {
        this.budget = +inputSalaryAmount.value;
        this.getExpInc.call(this);
        this.getExpensesMonth.call(this);
        // this.getInfoDeposit();
        this.getAddExpInc.call(this);
        this.getBudget();
        this.showResult();
    }
    
    showResult () {
        periodSelect.addEventListener('input', this.calcPeriod.bind(this));
        inputBudgetMonth.value = this.budgetMonth;
        inputBudgetDay.value  = this.budgetDay;
        inputExpensesMonth.value = this.expensesMonth;
        inputAdditionalExpenses.value = this.addExpenses.join(', ');
        inputAdditionalIncomeRightSide.value = this.addIncome.join(', ');
        inputPeriodTargetMonth.value = this.getTargetMonth.apply(this);
        this.calcPeriod();        
    }
    

    addExpIncBlock (event) {
      const className = event.path[1].className;
        let allItems = document.querySelectorAll(`.${className}-items`),
            buttonPlus;
      const cloneItem = allItems[0].cloneNode(true);
            
            
            if (className == 'income')
            {
                buttonPlus = document.getElementsByTagName('button')[0];
            }
            else
            {
                buttonPlus = document.getElementsByTagName('button')[1];
            }

        cloneItem.querySelector(`.${className}-title`).value = '';
        cloneItem.querySelector(`.${className}-amount`).value = '';

        allItems[0].parentNode.insertBefore(cloneItem, buttonPlus);
        this.regExpInputs();
        allItems = document.querySelectorAll(`.${className}-items`);

        if (allItems.length === 3)
        {
            buttonPlus.style.display = 'none';
        }

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
    }
    

    getExpInc () {
        const count = item => {
            const startStr = item.className.split('-')[0], 
                  itemTitle = item.querySelector(`.${startStr}-title`).value,
                  itemAmount= item.querySelector(`.${startStr}-amount`).value;

            if (isNaN(itemTitle.trim()) && this.isNumber(itemAmount.trim()))
            {
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income)
        {
            this.incomeMonth += +this.income[key];
        }
    }



    getExpensesMonth () {
        for(let key in this.expenses)
        {
            this.expensesMonth += +(this.expenses[key]);
        }
        this.expensesAmount =  this.expensesMonth;
    }
    


    getAddExpInc () {
        inputAdditionalIncomeLeftSide.forEach(item => {
    
            if(item.value.trim())
            {
                this.addIncome.push(item.value.trim());
            }
        });
    
        inputAdditionalExpensesItem.value.split(', ').forEach(item => {
            if (item.trim())
            {
                this.addExpenses.push(item.trim());
            }
        });
    }
    
    changePeriodAmount () {
        if(+periodSelect.value > +periodAmount.textContent)
        {
            periodAmount.textContent++;
        }
        
        if (+periodSelect.value < +periodAmount.textContent)
        {
            periodAmount.textContent--;
        }
    }
    
    checkSalaryAmount () {
        if(inputSalaryAmount.value.trim())
        {
            buttonCalculate.disabled = false;
        }
        else
        {
            buttonCalculate.disabled = true;
        }
    }
    
    reset () {
        const allInputs = document.querySelectorAll('input');
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
        
        const inputsLeftSide = document.querySelector('.data').querySelectorAll('input');
        inputsLeftSide.forEach(item => {
            item.disabled = false;
        })
    
        btnReset.style.display = 'none';
        btnReset.disabled = true;
    
        buttonCalculate.style.display = 'block';
        buttonCalculate.disabled = false;
    
        buttonAddincomePlus.disabled = false;
        buttonAddexpensesPlus.disabled = false;
    
        periodAmount.textContent = '1';
    
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

        if (incomeItems.length > 1)
        {
            for (let i = 0; incomeItems.length > 1; i++)
            {
                incomeItems[0].remove();
                incomeItems = document.querySelectorAll('.income-items');
            }
            buttonAddincomePlus.style.display = 'block';
        }
    
        if (expensesItems.length > 1)
        {
            for (let i = 0; expensesItems.length > 1; i++)
            {
                expensesItems[0].remove();
                expensesItems = document.querySelectorAll('.expenses-items');
            }
            buttonAddexpensesPlus.style.display = 'block';
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
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    
    firstLetterToUpperCase(data) {
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
    
    
    regExpInputs() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
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

    turnOffInputs () {
        const inputsLeftSide = document.querySelector('.data').querySelectorAll('input');
        inputsLeftSide.forEach(item => {
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
    
    changeButtons() {
        buttonCalculate.style.display = 'none';
        buttonCalculate.disabled = true;
    
        btnReset.style.display = 'block';
        btnReset.disabled = false;
    
        buttonAddincomePlus.disabled = true;
        buttonAddexpensesPlus.disabled = true;

        this.turnOffInputs();
    }
    

    eventListeners() {
        buttonCalculate.addEventListener('click', this.start.bind(this));
        buttonCalculate.addEventListener('click', this.changeButtons.bind(this));
        btnReset.addEventListener('click', this.reset.bind(this));
        buttonAddexpensesPlus.addEventListener('click', this.addExpIncBlock.bind(this));
        buttonAddincomePlus.addEventListener('click', this.addExpIncBlock.bind(this));
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
        inputSalaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
    }
    
}

const appData = new AppData();

appData.eventListeners();
appData.regExpInputs();



// console.log('Расходы за месяц: ' + appData.expensesAmount);
// console.log(appData.getTargetStatus());
// console.log(appData.getStatusIncome());
// console.log('Возможные расходы: ' + firstLetterToUpperCase(appData.addExpenses));





