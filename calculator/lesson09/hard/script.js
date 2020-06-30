'use strict';
let Data = new Date(),
    year =  String(Data.getFullYear()),
    month = String(Data.getMonth()),
    dayOfWeek = String(Data.getDay()),
    dayOfMonth = String(Data.getDate()),
    hour = String(Data.getHours()),
    minutes = String(Data.getMinutes()),
    seconds = String(Data.getSeconds()),

    week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    listOfMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    function changeDate () {
       let newDayOfMonth = dayOfMonth,
       newMonth = month,
       newHour = hour,
       newMinutes = minutes,
       newSeconds = seconds;

      if(dayOfMonth.length == 1)
      {
         newDayOfMonth = '0' + dayOfMonth;
      }

      if(month.length == 1)
      {
         newMonth = '0' + month;
      }

      if(hour.length == 1)
      {
         newHour = '0' + hour;
      }

      if(minutes.length == 1)
      {
         newMinutes = '0' + minutes;
      }

      if(seconds.length == 1)
      {
         newSeconds = '0' + seconds;
      }

      return `${newDayOfMonth}.${newMonth}.${year} - ${newHour}:${newMinutes}:${newSeconds}`;
    }

    function getFormOfWord(number, firstForm, secondForm, thirdForm) {
      let num = Math.abs(number);
      num %= 100;
      if (num >= 5 && num <= 20) {
        return thirdForm;
      }
      else
      {
         num %= 10;
      }

      if (num === 1) {
        return firstForm;
      }
      else if (num >= 2 && num <= 4) {
        return secondForm;
      }
      else
      {
         return thirdForm;
      }
    }
   
   setInterval(() => {console.log(`Сегодня ${week[dayOfWeek - 1]}, ${dayOfMonth} ${listOfMonths[month]} ${year} года, ${hour} ${getFormOfWord(hour, 'час', 'часа', 'часов')} ${minutes} ${getFormOfWord(minutes, 'минута', 'минуты', 'минут')} ${seconds} ${getFormOfWord(seconds, 'секунда', 'секунды', 'секунд')}`)}, 1000);
   setInterval(() => {console.log(changeDate())}, 1000);

