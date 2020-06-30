'use strict';

const btnReg = document.getElementById('registerUser'),
    btnLogin = document.getElementById('login'),
    list = document.getElementById('list'),
    title = document.querySelector('.title'),
    parsedArray = JSON.parse(localStorage.getItem('usersData'));

let usersData = [];



function render () {
    list.textContent = '';
    usersData.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<li>Имя: ${item.name}, Фамилия: ${item.surname}, зарегистрирован: ${item.regDate}</li><button>Удалить</button>`;
        list.append(li);

        const btnDelete = li.querySelector('button');

        btnDelete.addEventListener('click', function() {
            usersData.splice(index, 1);
            localStorage.setItem('usersData', JSON.stringify(usersData));
            render();
        })
    });

}

function regDate () {
    let date = new Date(),
        year = String(date.getFullYear()),
        month = String(date.getMonth()),
        dayOfMonth = String(date.getDate()),
        hour = String(date.getHours()),
        minutes = String(date.getMinutes()),
        seconds = String(date.getSeconds()),
        

listOfMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
 

   if(dayOfMonth.length == 1)
   {
    dayOfMonth = '0' + dayOfMonth;
   }


   if(hour.length == 1)
   {
    hour = '0' + hour;
   }

   if(minutes.length == 1)
   {
    minutes = '0' + minutes;
   }

   if(seconds.length == 1)
   {
    seconds = '0' + seconds;
   }

    return `${dayOfMonth} ${listOfMonths[month]} ${year} г., ${hour}:${minutes}:${seconds}`;
}


function registration () {
    
    let nameAndSurname,
        name,
        surname,
        login,
        password,
        date = regDate(),
        whitespace = 0;

    do
    {
        whitespace = 0;
        nameAndSurname = prompt('Введите через пробел имя и фамилию', '');
        nameAndSurname = nameAndSurname.trim();

        for (let i = 0; i < nameAndSurname.length; i++) {
            if (nameAndSurname[i] == ' ') {
                name = nameAndSurname.substring(0, i);
                surname = nameAndSurname.substring(i + 1, nameAndSurname.length);
                whitespace++;
            }
        }
    }
    while (whitespace == 0 || whitespace > 1) 

    do
    {
        login = prompt('Введите логин', '');
    }
    while (!login.trim()) 

    do
    {
        password = prompt('Введите пароль', '');
    }
    while (!password.trim()) 
    

    let obj = {
        name: name,
        surname: surname,
        login: login,
        password: password,
        regDate: date,
    }
    usersData.push(obj);
    localStorage.setItem('usersData', JSON.stringify(usersData));

    render();
}


if (parsedArray)
{
    for(let i = 0; i < parsedArray.length; i++)
    {
        usersData.push(parsedArray[i]);
    }
    render();
}


function login () {
    let userLogin,
        password,
        loginPassed = false;
    do
    {
        userLogin = prompt('Введите логин', '');
    }
    while(!userLogin.trim())

    do
    {
        password = prompt('Введите пароль', '');
    }
    while(!password.trim())

    usersData.forEach(function (item) {
        if(item.password == password && item.login == userLogin)
        {
            loginPassed = true;
            title.textContent = `Привет, ${item.name}`;
        }
    })

    if (loginPassed == false)
    {
        let loginAgain = confirm('Совпадения не найдено, повторить попытку?');
        if (loginAgain == true)
        {
            login();
        }
    }
}


btnReg.addEventListener('click', registration);
btnLogin.addEventListener('click', login);