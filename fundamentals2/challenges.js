'use strict';

// const dolphinScore = [44, 23, 71];
// const koalaScore = [85, 54, 49];
// let calcAverage = function (a) {
//     let average = 0;
//     a.forEach(element => {
//         average += element;
//     });
//     return average / a.length;
// }
// function checkWinner(a, b) {
//     const averageA = calcAverage(a);
//     const averageB = calcAverage(b);
//     if (averageA > 2 * averageB) {
//         return `Dolphin wins (${averageA} vs. ${averageB})`;
//     }
//     else if (averageB > 2 * averageA) {
//         return `Koala wins (${averageB} vs. ${averageA})`;
//     }
//     else {
//         return `No winner. Dolphins: ${averageA}. Koalas: ${averageB}`;
//     }
// }
// console.log(checkWinner(dolphinScore, koalaScore));
// const calcTip = bill => (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.2;
// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];
// for (let i = 0; i < bills.length; i++) {
//     tips.push(calcTip(bills[i]));
//     totals.push(tips[i] + bills[i]);
// }
// console.log(tips, totals);
// const calcAverage = function (arr) {
//     let average = 0;
//     for (let i = 0; i < arr.length; i++) {
//         average += arr[i];
//     }
//     return (average / arr.length);
// }
// console.log(calcAverage(totals));
// const mark = {
//     fullName: 'Mark Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function () {
//         this.bmi = this.mass / this.height ** 2;
//         return this.bmi;
//     }
// }
// const john = {
//     fullName: 'John Smith',
//     mass: 92,
//     height: 1.95,
//     calcBMI: function () {
//         this.bmi = this.mass / this.height ** 2;
//         return this.bmi;
//     }
// }
// console.log(mark['calcBMI']() > john.calcBMI() ? `${mark.fullName}'s BMI (${mark.bmi} is higher than ${john.fullName}'s (${john.bmi})` :
//     `${john.fullName}'s BMI (${john.bmi} is higher than ${mark.fullName}'s (${mark.bmi})`);