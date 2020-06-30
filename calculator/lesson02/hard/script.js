// 1 способ
let num = '266219';
let multip = num[0] * num[1] * num[2] * num[3] * num[4] * num[5]; //перемножаем все числа переменной num
console.log('multip: ', multip); //вывели получившееся произведение в консоль
let mathPow = String(multip ** 3); //конвертируем в строку так как свойство substring работает только со строками
console.log(mathPow.substring(0, 2)); //выводим первые две цифры



// 2 способ
 let num1 = '266219';
 let multip1 = 1;

 for(let i = 0; i < num1.length; i++) //перебираем строку (можно ли это назвать строковым массивом?)
 {
    multip1 *= num1[i]; //на каждой итерации цикла мы будем умножать нашу переменую на конкретный элемент строки
 }
 console.log('multip1: ', multip1);

let mathPow1 = String(multip1 ** 3);
console.log(mathPow1.slice(0, 2));

