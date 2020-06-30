let money = 50000;
let income = 'фриланс';
let addExpenses = 'еда, одежда, учеба';
let deposit = true;
let mission = 200000;
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(`Период равен ${period} месяцев`);
console.log('Цель зарабоать ' + mission + ' рублей');

let addExpensesLowerCase = addExpenses.toLowerCase();
console.log(addExpensesLowerCase.split(', '));

let budgetDay = money/30;
console.log(budgetDay);