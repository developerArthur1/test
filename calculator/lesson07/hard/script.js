'use strict';
let Data = new Date(),
    currentDay = Data.getDay(),
    i = 0,

    week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

for (let item of week)
{
   if((currentDay == 0 && i == 6) || (currentDay == 6 && i == 5))
   {
      document.write(`<i><b>${item}</b></i><br>`);
      i++;
   }
   else if(currentDay == i + 1)
   {
      document.write(item.bold() + `<br>`);
      i++;
   }
   else if (i == 5 || i == 6)
   {
      document.write(item.italics() + `<br>`);
      i++;
   }
   else
   {
      document.write(`${item}<br>`);  
      i++;
   }
}