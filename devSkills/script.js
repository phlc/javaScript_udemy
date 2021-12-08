// Remember, we're gonna use strict mode in all scripts now!
'use strict';
// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
// const temp2 = [-20, 3, 4, 7, 8, 2];

// const amplitude = function(temperatures){
//     let min = Number.POSITIVE_INFINITY;
//     let max = Number.NEGATIVE_INFINITY;

//     for(let i=0; i<temperatures.length; i++){
//         const curTemp = temperatures[i];
//         if(typeof curTemp === 'number'){
//             if(curTemp<min) min = curTemp;
//             if(curTemp>max) max = curTemp;
//         }
//     }
//     return(max-min);
// }
// const amplitudeNew = (arr1, arr2) => amplitude(arr1.concat(arr2));

// const a = amplitude(temperatures);
// const b = amplitudeNew(temp2, temperatures);

// console.log(a, b);

// const measureKelvin = function(){
//     const measurement = {
//         type: 'temp',
//         unit: 'celsius',
//         value: prompt('Degrees celsius:'),
//     }
//     console.table(measurement);
//     const kelvin = measurement.value + 273;
//     return kelvin;
// }
// console.log(measureKelvin());
