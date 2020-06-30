'use strict';

let data = prompt('Введите данные', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя');
stringSpecifications(data);

function stringSpecifications (data) {
   let string = data.trim();
   if (typeof string != 'string')
   {
      console.log('Введенное значение не является строкой!');
   }

   if (string.length > 30)
   {
      console.log(string.slice(0, 30) + '...');
   }
   else {
      console.log(string);
   }
}

