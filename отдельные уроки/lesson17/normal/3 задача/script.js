'use strict';
    const selectCountry = document.getElementById('country'),
          selectCity = document.getElementById('city'),
          cityArr = {
            rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
            uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
            bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
            jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
         };

        function FuncSelectCountry () {
            selectCity.textContent = '';
            for (let key in cityArr[this.value])
            {
                const option = document.createElement('option');
                option.textContent = cityArr[this.value][key];
                selectCity.insertAdjacentElement('beforeend', option); 
            }
            selectCity.style.display = 'inline-block';
        }
        selectCountry.addEventListener('click', FuncSelectCountry);        