'use strict';

function startGame() {
    let attempts = 10,
    hiddenNumber = Math.floor(Math.random() * 100) + 1;
    console.log('hiddenNumber: ', hiddenNumber);

    let result = prompt('Угадай число от 1 до 100, у тебя 10 попыток!', '');


    function youWin () {
        result = confirm('Поздравляю, вы угадали! Хотели бы вы сыграть еще?');
        if(result == true)
        {
            startGame();
        }
        else if (result == false)
        {
            alert('Пока! Приходи еще!');
            return;
        }
    }

    function numberLess () {
        attempts -= 1;
        result = prompt(`Загаданное число меньше, осталось ${attempts} попыток`, '');
        check();
    }
    
    function numberGreater () {
        attempts -= 1;
        result = prompt(`Загаданное число больше, осталось ${attempts} попыток`, '');
        check();
    }
    
    function checkNan () {
        result = prompt('Введи число!', '');
        check();
    }

    function isNumber (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }



    function check() {

        if(result === null)
        {
            alert('Пока! Приходи еще!');
            return;
        }
        else if(attempts == 1 && isNumber(result) && hiddenNumber != result)
        {
            result = confirm('Попытки закончились, хотите сыграть еще?');
            if(result == true)
            {
                startGame();
            }
            else if (result == false)
            {
                alert('Пока! Приходи еще, надеюсь в следующий раз у тебя все получится!');
                return;
            }
        }
        else if (!isNumber(result))
        {
            checkNan();
        }
        else if(hiddenNumber == result)
        {
            youWin();
        }
        else if (hiddenNumber < result)
        {
            numberLess();
        }
        else if(hiddenNumber > result)
        {
            numberGreater();
        }
    }
    check();
}
startGame();