'use strict';
// //урок 2
let money = 50000,
 income = 'фриланс',
 addExpenses = 'еда, одежда, учеба',
 deposit = true,
 mission = 200000,
 period = 6,
 addExpensesLowerCase = addExpenses.toLowerCase(),
 budgetDay = money/30;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpensesLowerCase.split(', '));



// урок 3
money = prompt('Введите ваш месячный доход', ''); //второй параметр также нужен для того чтобы в IE в поле ввода не было надписи undefined
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
deposit = !!(confirm('Есть ли у вас депозит в банке?', ''));

let expenses1 = +prompt('Введите обязательную статью расходов?', ''),
    amount1= +prompt('Во сколько это обойдется?', ''),
    expenses2 = +prompt('Введите обязательную статью расходов?', ''), //пытался сделать через цикл, но чет не вышло
    amount2 = +prompt('Во сколько это обойдется?', '');



let budgetMonth = money - (amount1 + amount2);
period = mission / (money - budgetMonth);
budgetDay = budgetMonth /30;


console.log(`Бюджет на месяц: ${budgetMonth}`);
console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев`);
console.log('Бюджет на день: ', Math.floor(budgetDay));


if (budgetDay == '0')
{
 console.log('Наверное вы где-то ввели нуль. Повторите попытку и введите числа больше нуля');
}
else if (budgetDay < 0)
{
    console.log('что-то пошло не так');
}
else if (budgetDay >= 1200) {
console.log('У вас высокий уровень дохода');
}
else if ( budgetDay >= 600 && budgetDay < 1200) {
console.log('У вас средний уровень дохода');
}
else if (budgetDay < 600)
{
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
