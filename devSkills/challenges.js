'use strict';
const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];

const printForecast = function(arr){
    let forecast = '...';
    for(let i = 0; i<arr.length; i++){
        forecast += ` ${arr[i]}Cº in ${i+1} days...`;
    }
    console.log(forecast);
}

printForecast(temp2);