'use strict';

let income = 'фриланс',
    money,
    mission = 200000,
    period = 6,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, театр'),
    deposit = !!(confirm('Есть ли у вас депозит в банке?', '')),
    expenses = [],
    expensesAmount = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = accumulatedMonth /30;

    
    function isNumber (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function start () {
        do
        {
             money = prompt('Введите ваш месячный доход', '');
        }
        while (!isNumber(money))
    }


    function showTypeOf (data) {
        console.log(typeof(data));
    }

    function getExpensesMonth () {
        let sum = 0;
        let costOfExpenses;
        for(let i = 0; i < 2; i++)
        {
            expenses[i] = prompt('Введите обязательную статью расходов?', '');
            do
            {
                costOfExpenses = prompt('Во сколько это обойдется?', '');
            }
            while (!isNumber(costOfExpenses))
            sum += +costOfExpenses;
        }
        return sum;
    }

    function getAccumulatedMonth() {
        start();
        return money - expensesAmount;
    }

    function getTargetMonth () {
        return Math.ceil(mission / accumulatedMonth);
    }

    function getTargetStatus () {
        if(getTargetMonth() < 0)
        {
            return ('Цель не будет достигнута');
        }
        else if (getTargetMonth() > 0)
        {
            return (`Цель будет достигнута за ${getTargetMonth()} месяцев`);
        }
    }

    
    function getStatusIncome () {
        if (budgetDay == '0')
        {
         return ('Наверное вы где-то ввели нуль. Повторите попытку и введите числа больше нуля');
        }
        else if (budgetDay < 0)
        {
            return ('что-то пошло не так');
        }
        else if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
        }
        else if ( budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
        }
        else if (budgetDay < 600)
        {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
    }

    showTypeOf(money);
    showTypeOf(income);
    showTypeOf(deposit);

console.log('Расходы за месяц: ' + expensesAmount);
console.log(addExpenses.split(', '));
console.log(getTargetStatus());
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log(getStatusIncome());






