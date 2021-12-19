'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//More Exercises
const flightArray = flights.split('+');

for(const [i, flight] of flightArray.entries()){
  flightArray[i] = flight.replaceAll('_', ' ').trim().split(';');
  let[what, from, to, time] = flightArray[i];
  from = from.replace(/[0-9].*/, '').toUpperCase();
  to = to.replace(/[0-9].*/, '').toUpperCase();
  time = time.replace(':', 'h');
  console.log(`${what.startsWith('Delayed')?'🔴 '+what : what} from ${from} to ${to} (${time})`.padStart(44));
}
// Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

// //15---
// const airLine = new String('TAP Air Portugal');
// const plane = 'A320';
// console.log(plane.replace(/[0-9].*/, '.'));
// const words = flights.split(';');
// console.log(words);
// console.log(words.join(' '));



//14---
//  const questions = new Map([['key1', 'value1'], ['key2', 'value2'], [1, true], [5.3, {name: 'bmw', colour: 'blue' }]]);
//  console.log(questions);
// //object -> map
// const openingHours = new Map(Object.entries(restaurant.openingHours));
// console.log(openingHours);
// for(const key of questions) console.log(key);

//13---
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'First Location');
// rest.set(2, 'Second Location').set(true, 'other key type');
// console.log(rest.values());
// console.log(rest.get('name'));
// console.log(rest.delete(7));
// console.log(rest.size);
// const arr = [1,2];
// rest.set(arr, 'array');
// console.log(rest.get(arr));
// arr.push('lds');
// console.log(rest.get(arr));
// console.log(rest.set(document.querySelector('script'), 'heading'));


//12---
// const arraySet = new Set([1, 2, 3, 'er', 6, 'er', 3]);
// console.log(arraySet);
// const stringSet = new Set('pizza');
// console.log(stringSet, stringSet.size, stringSet.has('p'), stringSet.has('e'));
// stringSet.add('s');
// console.log(stringSet);
// stringSet.delete('z');
// console.log(stringSet);
// const arrayWithRepeated = [1, 2, 3, 'er', 6, 'er', 3];
// const setUniqueValues = new Set(arrayWithRepeated);
// const arrayUnique = [...setUniqueValues];
// console.log(arrayUnique);
// console.log(arrayWithRepeated.sort());

//11---
// for(const key of Object.keys(restaurant)) console.log(key);
// const days = Object.keys(restaurant.openingHours);
// console.log(`Number of days: ${days.length}`);
// const openClose = Object.values(restaurant.openingHours);
// console.log(openClose);
// const entries = Object.entries(restaurant.openingHours);
// console.log(entries);


//10---
// console.log(restaurant.openingHours.mon && restaurant.openingHours.mon.open);
//optional channing
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours.fri?.open);
// console.log(restaurant.openingHours.mon.open); //error tries to access open from undefined
// restaurant.newFunction = function(){
//   console.log('New function called');
// };
// restaurant.newFunction?.();
// restaurant.otherFunction?.();
// const arr = [];
// console.log(arr?.[3] ?? 'empty');

//9---
// const insertedObj = {
//   inserted1: '1',
//   inserted2: '2'
// }
// const newKey = 'newItem'; 
// const newObj = {
//   item1: 'item',
//   item2: 2,
//   location: restaurant.location,
//   insertedObj,
//   someFunction(a){
//     console.log(`printing ${a}`);
//   },
//   [newKey]: 'computed key',
// }
// console.log(newObj);
// newObj.someFunction('Ola');
// console.log(newObj['item'+1]);

//8---
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for(const item of menu) console.log(item);
// for(const [i, el] of menu.entries()){
//   console.log(i, el);
// }


//7---
// let a = 0;
// a ||= 10;
// console.log(a);
// let b = 0;
// b ??= 10;
// console.log(b);

// const obj = {
//   name: 'name',
// }
// console.log(obj);
// obj.number &&= 1;
// console.log(obj);



//6---
// let a = 0;
// a = a || 10; // 0, empty string, undefined, null
// a = a ?? 10; //only null and undefined
// console.log(a);


//5---
// console.log(3 || 'string');
// console.log(3 && 'string' && 1 && true && 'Ok');
// console.log(0 && undefined);
// console.log(0 || undefined);


//4---
// const arr = [1, 2, 4, 5, 6];
// const [a, b, ...rest] =  arr;
// console.log(rest);
// const {name, location: local, ...rest} = restaurant;
// console.log(rest);
// const add = function(...numbers){
//   let s = 0;
//   numbers.forEach(e=>s+=e);
//   return s;
// }
// console.log(add(1, 2, 4), add(1, 2, 2, 3, 3), add(...[3, 4, 2]));
// const add2 = function(){
//   let s = 0;
//   for(let i=0; i<arguments.length; i++){
//     s+=arguments[i];
//   }
//   return s;
// }
// console.log(add2(1, 2));



//3---

// const arr = [3, 4, 5];
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);
// const arrCopy = [...arr];
// arrCopy.push(4);
// console.log(arr);
// const arr2 = [7, 8];
// const mergeArr = [...arr, ...arr2];
// console.log(mergeArr);
// const a = 'Pedro';
// const letters = [...a];
// console.log(...letters);
// const obj = {colour: 'blue', model: 'bmw', plate:'RE454E' };
// const obj2 = {fuel: 'gasoline', ...obj};
// console.log(obj, obj2);


//2---

// const {name, location: local='empty', categories, menu='empty'} = restaurant;
// console.log(name, local, categories, menu);
// let a = 11;
// let b = 22;
// const obj = {a: 3, b: 5, c: 7};
// //{a, b} = obj;
// ({a, b} = obj);
// console.log(a, b);
// const {openingHours: {fri: {open: o, close: c}}} = restaurant;
// console.log(o, c);
// //Passing parameter by name
// const f = function ({plate, colour, model}){
//     console.log(model, plate, colour);
// }
// f({model: 'bmw', plate: 'ERE34D', colour: 'blue'});


//1---
// const[cat1, , ,cat2] = restaurant.categories;
// console.log(cat1, cat2);
// let a = 1;
// let b = 2;
// [a, b] = [b, a];
// console.log(a, b);
// const nested = [2, 3, [4, 5]];
// const[a, b, [ , d]] = nested;
// console.log(a, b, d);
// const defaultValues = [2, 2];
// const [a=1, b=1, c=1] =  defaultValues;
// console.log(a, b, c);
