'use strict';

let money;

let appData = {
    
    budgetMonth: 0,
    budgetDay: 0,
    expensesMonth: 0,
    expensesAmount: 0,
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 200000,
    period: 3,

    asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, театр');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = !!(confirm('Есть ли у вас депозит в банке?', ''));

        for(let i = 0; i < 2; i++)
        {
            let question = prompt('Введите обязательную статью расходов?', '');
            do
            {
                appData.expenses[question] = prompt('Во сколько это обойдется?', '');
            }
            while (!isNumber(appData.expenses[question]))
        }
    },
    
    getExpensesMonth: function () {
        for(let key in appData.expenses)
        {
            appData.expensesMonth += +(appData.expenses[key]);
        }
        appData.expensesAmount =  appData.expensesMonth;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesAmount;
        appData.budgetDay = (appData.budgetMonth) / 30;
        return appData.budgetMonth;
    },

    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
}

    function isNumber (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function start () {
        do
        {
             money = prompt('Введите ваш месячный доход', '');
        }
        while (!isNumber(money))
        appData.budget = money;
    }


    start();
    appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();



console.log('Расходы за месяц: ' + appData.expensesAmount);
console.log(appData.getTargetStatus());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for(let key in appData)
{
    console.log(`свойство ${key} со значением ${appData[key]}`);
}





























// 'use strict';

// let income = 'фриланс',
//     money,
//     mission = 200000,
//     period = 6,
//     addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, театр'),
//     deposit = !!(confirm('Есть ли у вас депозит в банке?', '')),
//     expenses = [],
//     expensesAmount = getExpensesMonth(),
//     accumulatedMonth = getAccumulatedMonth(),
//     budgetDay = accumulatedMonth /30;

    

//     let appData = {
//         income: {},
//         addIncome: [],
//         expenses: {},
//         addExpenses: [],
//         deposit: false,
//         mission: 200000,
//         period: 3,
//         asking: function() {
            
//         }
//     }






//     function isNumber (n) {
//         return !isNaN(parseFloat(n)) && isFinite(n);
//     }

//     function start () {
//         do
//         {
//              money = prompt('Введите ваш месячный доход', '');
//         }
//         while (!isNumber(money))
//     }


//     function showTypeOf (data) {
//         console.log(typeof(data));
//     }

//     function getExpensesMonth () {
//         let sum = 0;
//         let costOfExpenses;
//         for(let i = 0; i < 2; i++)
//         {
//             expenses[i] = prompt('Введите обязательную статью расходов?', '');
//             do
//             {
//                 costOfExpenses = prompt('Во сколько это обойдется?', '');
//             }
//             while (!isNumber(costOfExpenses))
//             sum += +costOfExpenses;
//         }
//         return sum;
//     }

//     function getAccumulatedMonth() {
//         start();
//         return money - expensesAmount;
//     }

//     function getTargetMonth () {
//         return Math.ceil(mission / accumulatedMonth);
//     }

//     function getTargetStatus () {
//         if(getTargetMonth() < 0)
//         {
//             return ('Цель не будет достигнута');
//         }
//         else if (getTargetMonth() > 0)
//         {
//             return (`Цель будет достигнута за ${getTargetMonth()} месяцев`);
//         }
//     }

    
//     function getStatusIncome () {
//         if (budgetDay == '0')
//         {
//          return ('Наверное вы где-то ввели нуль. Повторите попытку и введите числа больше нуля');
//         }
//         else if (budgetDay < 0)
//         {
//             return ('что-то пошло не так');
//         }
//         else if (budgetDay >= 1200) {
//         return ('У вас высокий уровень дохода');
//         }
//         else if ( budgetDay >= 600 && budgetDay < 1200) {
//         return ('У вас средний уровень дохода');
//         }
//         else if (budgetDay < 600)
//         {
//             return ('К сожалению у вас уровень дохода ниже среднего');
//         }
//     }

//     showTypeOf(money);
//     showTypeOf(income);
//     showTypeOf(deposit);

// console.log('Расходы за месяц: ' + expensesAmount);
// console.log(addExpenses.split(', '));
// console.log(getTargetStatus());
// console.log('Бюджет на день: ', Math.floor(budgetDay));
// console.log(getStatusIncome());






