'use strict';
// const data1 = {
//     Julia: [3, 5, 2, 12, 7],
//     Kate: [4, 1, 15, 8, 3],
// };
// const data2 = {
//     Julia: [9, 16, 6, 8, 3], 
//     Kate: [10, 5, 6, 1, 4],
// };

// const checkDogs = function({Julia: dogsJulia, Kate: dogsKate}){
//     const newDogsJulia = dogsJulia.slice(1, -2);
//     const bothDogs = newDogsJulia.concat(dogsKate);
//     bothDogs.forEach((age, i) => {
//         console.log(`Dog number ${i+1} is ${age<=3  ? `still a puppy` :
//         `an adult, and is ${age} years old`}`)
//     });
// };

// checkDogs(data1);
// console.log('Data 2');
// checkDogs(data2);

// const data1 = [5,2,4,1,15,8,3];
// const data2 = [16,6,10,5,6,1,4];

// const calcAverageHumans = function(arr){
//     const humanAge = arr.map(v =>v<=2 ? 2*v : 16+4*v);
// console.log(humanAge);
//     const dogs18plus = [];
//     const humans18plus = humanAge.filter(function(v, i){
//         const r = v>=18;
//         if(r){
//             dogs18plus.push(arr[i]);
//         }
//         return r;
//     });
// console.log(dogs18plus);
// console.log(humans18plus);
//     let n = 0;
//     const averageHumans = humanAge.reduce((acc, v, i)=>{
//         if(arr[i]>=3){
//             n++;
//             return acc+v;
//         }
//         return acc;
//     },0)/n;
//     return averageHumans;
// };
// console.log(data1);
// console.log(calcAverageHumans(data1));

// const calcAverageHumans = function(data){
//     return data
//         .map(age => age<=2 ? age*2 : 16+age*4)
//         .filter(age => age >=18)
//         .reduce((avg, age, _, arr) => avg + age/arr.length, 0);
// };
// console.log(calcAverageHumans(data1));
// console.log(calcAverageHumans(data2));


const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] }, 
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] }, 
    { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(dog => dog.recommendedFood = dog.weight ** 0.75 * 28);

const foodAmount = function(dog){
    if(dog.curFood > dog.recommendedFood*1.1)
        return 'EatTooMuch';
    else if(dog.curFood < dog.recommendedFood*0.9)
        return 'EatTooLittle';
    else 
        return 'EatEnough'
};

// console.log(foodAmount(dogs.find(dog=>dog.owners.includes('Sarah'))));

const eaters = dogs.reduce((ac, dog) =>{
    ac[`owners${foodAmount(dog)}`].push(...dog.owners);
    return ac;
}, {ownersEatTooMuch: [], ownersEatTooLittle: [], ownersEatEnough: []});

// console.log(`${eaters.ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// console.log(`${eaters.ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// console.log(dogs.some(dog => dog.curFood < dog.recommendedFood*1.1 &&
//             dog.curFood > dog.recommendedFood*0.9));

const dogsSorted = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);

console.log(dogs);