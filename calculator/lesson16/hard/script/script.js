'use strict';

const buttonCalculate = document.getElementById('start'),
      buttonAddincomePlus = document.getElementsByTagName('button')[0],
      buttonAddexpensesPlus = document.getElementsByTagName('button')[1],
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
      periodAmount = document.querySelector('.period-amount'),
      depositCheck = document.getElementById('deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercentError = document.querySelector('.deposit-percent__error'),
      firstOption = document.getElementById('first-option');



  let expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items'),
      depositPercent = document.querySelector('.deposit-percent');

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
        this.validDepositPercent = true;    
    }

    getBudget () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesAmount + monthDeposit;
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
    
    calcPeriod () {
        inputIncomePeriod.value = this.budgetMonth * periodSelect.value;
    }
    
    start () {
        this.budget = +inputSalaryAmount.value;
        this.getExpInc.call(this);
        this.getExpensesMonth.call(this);
        this.getAddExpInc.call(this);
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
        this.saveData.call(this);
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
        if(inputSalaryAmount.value.trim() && this.validDepositPercent == true)
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
        
        if (depositCheck.checked)
        {
            depositCheck.checked = !depositCheck.checked;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            firstOption.selected = 'selected';
            depositPercentError.style.display = 'none';
        }

        localStorage.removeItem('rightSideData');
        document.cookie = 'rightSideData=jsonObject; expires=Wed, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'isLoad=true; expires=Wed, 01 Jan 1970 00:00:00 GMT';


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

    saveData() {
        const LSinputsRightSide = {
            inputBudgetMonth: inputBudgetMonth.value,
            inputBudgetDay: inputBudgetDay.value,
            inputExpensesMonth: inputExpensesMonth.value,
            inputAdditionalIncomeRightSide: inputAdditionalIncomeRightSide.value,
            inputAdditionalExpenses: inputAdditionalExpenses.value,
            inputIncomePeriod: inputIncomePeriod.value,
            inputPeriodTargetMonth: inputPeriodTargetMonth.value,
        },
        jsonObject = JSON.stringify(LSinputsRightSide);
        
        localStorage.setItem('rightSideData', jsonObject);
        document.cookie = 'rightSideData=jsonObject; expires=Wed, 29 July 2020 00:00:00 GMT';
        document.cookie = 'isLoad=true; expires=Wed, 29 July 2020 00:00:00 GMT';
    }

    getLocalStorageData () {
        const LSinputsRightSide = JSON.parse(localStorage.getItem('rightSideData')),
              cookie = document.cookie.split('; ');
        if (LSinputsRightSide && cookie[0] == 'rightSideData=jsonObject' && cookie[1] == 'isLoad=true')
        {
            const inputsRightSide = document.querySelectorAll('[class$="-value"]');
            let i = 0;


            for (let key in LSinputsRightSide)
            {
                inputsRightSide[i].value = LSinputsRightSide[key];
                i++;
            }

            this.changeButtons();
        }
        else
        {
            document.cookie = 'rightSideData=jsonObject; expires=Wed, 01 Jan 1970 00:00:00 GMT';
            document.cookie = 'isLoad=true; expires=Wed, 01 Jan 1970 00:00:00 GMT';
            localStorage.removeItem('rightSideData');
            this.reset();
        }
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

            if (input.placeholder == 'Процент')
            {
                input.oninput = () => {
                    if (isNaN(input.value))
                    {
                        depositPercentError.textContent = 'Ошибка, вы ввели не число в поле "Процент"! Повторите попытку';
                        depositPercentError.style.display = 'flex';
                        buttonCalculate.disabled = true;
                    }
                    else if (depositPercent.value > 100)
                    {
                        depositPercentError.textContent = 'Ошибка, вы ввели некорректное значение в поле "Процент"! Введите значение от 1 до 100';
                        depositPercentError.style.display = 'flex';
                        buttonCalculate.disabled = true;
                        this.validDepositPercent = false;
                    }   
                    else
                    {
                        depositPercentError.style.display = 'none';
                        this.validDepositPercent = true;
                        this.checkSalaryAmount();
                    }
                    input.value = input.value.replace(/[^\d]/g, '');
                }
            }
        }, this);    
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
    
    getInfoDeposit () {
        if (this.deposit)
        {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if(valueSelect === 'other')
        {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
        }
        else
        {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked)
        {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        }
        else
        {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositPercentError.style.display = 'none';
            this.validDepositPercent = true;
            this.checkSalaryAmount();
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {
        buttonCalculate.addEventListener('click', this.start.bind(this));
        buttonCalculate.addEventListener('click', this.changeButtons.bind(this));
        btnReset.addEventListener('click', this.reset.bind(this));
        buttonAddexpensesPlus.addEventListener('click', this.addExpIncBlock.bind(this));
        buttonAddincomePlus.addEventListener('click', this.addExpIncBlock.bind(this));
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
        inputSalaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        document.addEventListener('DOMContentLoaded', this.getLocalStorageData.bind(this));
    }
    
}

const appData = new AppData();

appData.eventListeners();
appData.regExpInputs.call(appData);



// console.log('Расходы за месяц: ' + appData.expensesAmount);
// console.log(appData.getTargetStatus());
// console.log(appData.getStatusIncome());
// console.log('Возможные расходы: ' + firstLetterToUpperCase(appData.addExpenses));