'use strict';
// const bookings = [];
// const createBooking = function(flightNumber, 
//                         numPassegers=3, price=0){
//     const booking = {
//         flightNumber,
//         numPassegers,
//         price,
//     }
//     console.log(booking);
//     bookings.push(booking);
// }
// createBooking(3243, undefined , 7);
// const flight = 'LH234';
// const jonas = {
//     name: 'Jonas Schemdtmann',
//     passport: 348834883,
// }
// const checkIn = function(flightNum, passenger){
//     flightNum = "LH999";
//     passenger.name = 'Mr. ' +passenger.name;

//     if(passenger.passport === 348834883)
//         alert('Checked In');
//     else
//         alert('Wrong Passaport');
// }
// checkIn(flight, jonas);
// console.log(flight, jonas);
// const oneWord = function (srt){
//     return srt.replace(/ /g, '').toLowerCase();
// }
// const upperFirstWord = function (srt){
//     const [first, ...others] = srt.split(' ');
//     return [first.toUpperCase(), ...others].join(' ');
// }
// const transformer = function(srt, fn){
//     console.log(fn(srt));
//     console.log(fn.transformer);
// }
// transformer('Hello World', upperFirstWord);
// const greet = (greetings)=>{
//     return (name)=>{
//         console.log(`${greetings} ${name}`)
//     };
// }
// const hello = greet('Hello');
// hello('Jonas');
// greet('Ola')('Jose');

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name){
        console.log(`${name} booked a seat on ${this.
            airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight:`${this.iataCode}${flightNum}`,
            name})
    },
};
const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],

}
// const book = lufthansa.book;
// book.call(eurowings, 23, 'Mike Black');
// console.log(eurowings);
// book.apply(eurowings, [443, 'Sarah Jones']);
// console.log(eurowings);
// const bookEW = lufthansa.book.bind(eurowings);
// bookEW(342, 'James Stellears');
// console.log(eurowings);
// const bookEW23 = bookEW.bind(eurowings, 'John');
// bookEW23(43);
// console.log(eurowings);
// lufthansa.planes = 300;
// lufthansa.buyPlane = function(){
//     this.planes++;
//     console.log(this.planes);
// }
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// const addTax = (rate, value) => value + value*rate;
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));
// const createTaxFn = (rate) => (value) => value + value*rate;
// const addVAT2 = createTaxFn(0.23);
// console.log(addVAT2(100));