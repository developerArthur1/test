'use strict';

const btnChangeColor = document.querySelector('.main-block__button'),
      title = document.querySelector('.main-block__title');
    
      function changeColor() {
        let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);

        title.textContent = "#" + color;
        document.body.style.backgroundColor = '#' + color;
      }

      btnChangeColor.addEventListener('click', changeColor);