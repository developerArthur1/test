'use strict';

let income = 'фриланс',
    mission = 200000,
    period = 6,
    money = +prompt('Введите ваш месячный доход', ''),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
    deposit = !!(confirm('Есть ли у вас депозит в банке?', '')),

    expenses1 = prompt('Введите обязательную статью расходов?', ''),
    amount1 = +prompt('Во сколько это обойдется?', ''),
    expenses2 = prompt('Введите обязательную статью расходов?', ''),
    amount2 = +prompt('Во сколько это обойдется?', ''),
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = accumulatedMonth /30;

    showTypeOf(money);
    showTypeOf(income);
    showTypeOf(deposit);

    function showTypeOf (data) {
        console.log(typeof(data));
    }

    function getExpensesMonth () {
        return amount1 + amount2;
    }

    function getAccumulatedMonth() {
        return money - (amount1 + amount2);
    }

    function getTargetMonth (accumulatedMonth) {
        return Math.ceil(mission / accumulatedMonth);
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

    

console.log(getExpensesMonth());
console.log(addExpenses.split(', '));
console.log('Цель будет достигнута за ' + getTargetMonth(accumulatedMonth) + ' месяцев');
console.log('Бюджет на день: ', Math.floor(budgetDay));
console.log(getStatusIncome());





