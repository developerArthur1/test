'use strict';
// 1 задание пункт a
let lang = prompt('Выберите язык: ru(русский) или en(английский)', ''),
    ruDays = 'пн ' + 'вт ' + 'ср ' + 'чт ' + 'пт ' + 'сб ' + 'вс ',
    enDays = 'monday ' + 'tuesday ' + 'wednesday ' + 'thursday ' + 'friday ' + 'saturday ';

if(lang == 'ru')
{
   console.log(ruDays);
}
else if(lang == 'en')
{
   console.log(enDays);
}

//пункт b

lang = prompt('Выберите язык: ru(русский) или en(английский)', '');
switch (lang) {
   case 'ru':
   console.log(ruDays);
   break;

   case 'en':
   console.log(enDays);
   break;

   default:
      console.log('вы неверно ввели обозначение языка: введите ru или lang');
}


//пункт с

lang = prompt('Выберите язык: ru(русский) или en(английский)', '');

let langArray = [];
langArray['ru'] = [ruDays];
langArray['en'] = [enDays];

console.log(langArray[lang]);



// 2 задание
let namePerson = prompt('Введите имя персоны', '');

console.log( namePerson == 'Артем' ? console.log('диктор') : 
namePerson == 'Максим' ? console.log('преподаватель') : console.log('студент'));