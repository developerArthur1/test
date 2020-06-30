'use strict';

const asideBooks = document.querySelector('.books'),
      books = document.querySelectorAll('.book'),
      adv = document.querySelector('.adv'),
      secondBookLi = books[0].querySelectorAll('li'),
      fifthBookLi = books[5].querySelectorAll('li');
      

asideBooks.prepend(books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';
adv.style.display = 'none';
secondBookLi[3].after(secondBookLi[6]);
secondBookLi[6].after(secondBookLi[8]);
secondBookLi[8].after(secondBookLi[4]);
secondBookLi[9].after(secondBookLi[2]);

fifthBookLi[2].before(fifthBookLi[9]);
fifthBookLi[9].after(fifthBookLi[3]);
fifthBookLi[4].after(fifthBookLi[2]);
fifthBookLi[2].after(fifthBookLi[6]);
fifthBookLi[6].after(fifthBookLi[7]);

books[2].querySelector('ul').querySelectorAll('li')[8].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');