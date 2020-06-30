'use strict';

let arr = ['424121321', '24121321','2321','524121321','624121321','724121321','5332']


for(let i = 0; i < arr.length; i++)
{
   if(arr[i][0] == '4' || arr[i][0] == '2')
   {
      console.log(arr[i]);
   }
}



nextNumber: for (let i = 1; i < 100; i++)
{

   for(let f = 2; f < i; f++)
   {
      if(i % f == 0)
      {
         continue nextNumber;
      }
   }
   console.log(`число ${i}, делители этого числа: 1 и ${i}`);
}