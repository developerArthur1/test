'use strict';

const inputFirstNum = document.getElementById('a'),
      inputSecondNum = document.getElementById('b'),
      inputResult = document.getElementById('res'),
      btnSum = document.getElementById('sum'),
      btnMult = document.getElementById('mult');

const calculator = {
    res: 0,
  sum () {
      this.res = +inputFirstNum.value + (+inputSecondNum.value);
      this.show.call(this);
  },
  mult () {
      this.res = inputFirstNum.value * inputSecondNum.value;
      this.show.call(this);
  },
  show () {
    inputResult.value = this.res;
  },
  
  eventListeners() {
    btnSum.addEventListener('click', this.sum.bind(this));
    btnMult.addEventListener('click', this.mult.bind(this));
  }
}

calculator.eventListeners();