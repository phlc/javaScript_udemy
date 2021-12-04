// const markHeight = 1.69;
// const markMass = 78;
// const johnHeight = 1.88;
// const johnMass = 95;

// function bmi(mass, height) {
//     return mass / height ** 2;
// }

// const markBMI = bmi(markMass, markHeight);
// const johnBMI = bmi(johnMass, johnHeight);
// const markHigherBMI = markBMI > johnBMI;

// if (markHigherBMI) {
//     console.log(`Mark's BMI(${markBMI}) is higher than John's(${johnBMI})!`);
// }
// else {
//     console.log(`John's BMI(${johnBMI}) is higher than Mark's(${johnBMI}!`);
// }
// const dolphinsScores = [99, 100, 99];
// const koalasScores = [80, 100, 80];
// let dolphinAverage = 0;
// let koalasAverage = 0;
// let dolphin100 = false;
// let koalas100 = false;
// dolphinsScores.forEach(element => {
//     dolphinAverage += element;
//     if (element >= 100) {
//         dolphin100 = true;
//     }
// });
// koalasScores.forEach(element => {
//     koalasAverage += element;
//     if (element >= 100) {
//         koalas100 = true;
//     }
// });

// if (dolphinAverage > koalasAverage && dolphin100) {
//     console.log(`Dolphins wins! 🏆`);
// }
// else if (koalasAverage > dolphinAverage && koalas100) {
//     console.log('Koalas wins! 🏆');
// }
// else if (koalasAverage === dolphinAverage && dolphin100 && koalas100) {
//     console.log("It's a draw");
// }
// else {
//     console.log("No Trophy");
// }
// let bill = 200;
// let tip;
// console.log(`the bill was ${bill}, the tip was ${bill >= 50 && bill <= 300 ? tip = bill * 0.15 : tip = bill * 0.2} and the total value ${bill + tip}`);
