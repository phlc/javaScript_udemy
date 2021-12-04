const markHeight = 1.69;
const markMass = 78;
const johnHeight = 1.88;
const johnMass = 95;

function bmi(mass, height) {
    return mass / height ** 2;
}

const markBMI = bmi(markMass, markHeight);
const johnBMI = bmi(johnMass, johnHeight);
const markHigherBMI = markBMI > johnBMI;

if (markHigherBMI) {
    console.log(`Mark's BMI(${markBMI}) is higher than John's(${johnBMI})!`);
}
else {
    console.log(`John's BMI(${johnBMI}) is higher than Mark's(${johnBMI}!`);
}