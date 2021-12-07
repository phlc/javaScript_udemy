'use strict';
// let country = 'Brazil';
// let population = 270;
// let capitalCity = 'Brasilia';
// let language = 'portuguese';
// function describeCountry(country, population, capitalCity) {
//     return `${country} has ${population} millions people and it's capital City is ${capitalCity}`;
// }
// console.log(describeCountry(country, population, capitalCity));
// function percentageOfWorld1(population) {
//     return population * 100 / 7900;
// }
// const percentageOfWorld2 = function (population) {
//     return population * 100 / 7900;
// }
// console.log(percentageOfWorld1(population), percentageOfWorld2(population));
// let percentageOfWorld3 = (population) => population * 100 / 7900;
// // console.log(percentageOfWorld3(population));
// let describePopulation = function (country, population) {
//     return `${country} has ${population} million people, which is about ${percentageOfWorld3(population)} of the world`;
// }
// console.log(describePopulation(country, population));
// const populations = [27, 33, 44, 23];
// console.log(populations.length === 4 ? 4 : 'Not 4');
// const percentage = [];
// for (let i = 0; i < populations.length; i++) {
//     percentage[i] = percentageOfWorld1(populations[i])
// }
// console.log(percentage);
//const neighbours = ['Peru', 'Argentina', 'Bolivia', 'Venezuela', 'Colombia'];
// console.log(neighbours);
// neighbours.push('Utopia');
// console.log(neighbours);
// neighbours.pop();
// console.log(neighbours);
// if (!neighbours.includes('Germany')) {
//     console.log(`Probably not in Europe`);
// }
// neighbours[neighbours.indexOf('Argentina')] = 'Germany';
// if (!neighbours.includes('Germany')) {
//     console.log(`Probably not in Europe`);
// }
// else {
//     console.log(neighbours);
// }
// const myCountry = {
//     country: country,
//     capital: capitalCity,
//     language: language,
//     population: population,
//     neighbours: neighbours,
//     numberNeighbours: () => neighbours.length,
//     describe: function () {
//         return `${this.country} has ${this["population"]} million ${this["language"]}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
//     },
//     checkIsland: function () {
//         this.isIsland = this.neighbours.length ? "Not an island" : 'Is an island';
//         return this.isIsland;
//     },
// }
// myCountry.teste = 3;
// console.log(myCountry.numberNeighbours());
// console.log(`${myCountry.country} has ${myCountry["population"] - 2} million ${myCountry["language"]}-speaking people,\
// ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`);
// console.log(myCountry.describe(), myCountry.checkIsland());
// for (let i = 1; i <= 50; i++) {
//     console.log(`Voter number ${i} is currently voting`);
// }
// const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
// for (let i = 0; i < listOfNeighbours.length; i++) {
//     for (let j = 0; j < listOfNeighbours[i].length; j++) {
//         console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
//     }
// }
