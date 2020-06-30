'use strict';

function getResult(x, y){
    let result = 0;
    const mathPow = String(x ** y);

    for (let i = 0; i < mathPow.length; i++) {
        result += +mathPow.substring(i, i + 1);
    }

    return result;
}
  
  console.log(getResult(4, 8));
