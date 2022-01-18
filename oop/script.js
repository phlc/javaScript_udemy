'use strict';
// const h = document.querySelector('h1');
// console.log(h);
// console.dir(h);

// const Person = function(firstName, birthYear){
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//     // this.calcAge = function(){
//     //     console.log(2037 - this.birthYear);
//     // }

// };

// const jonas = new Person('Jonas', 1991);
// const mathilda = new Person('Mathilda', 1995);
// console.log(jonas, mathilda);
// Person.prototype.calcAge = function(){
//     console.log(2037 - this.birthYear)
// }
// Person.prototype.name = 'Person';
// console.log(Person.prototype);
// jonas.calcAge();
// console.log(jonas);
// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('name'));
// const add = function(a, b){
//     this.name = 'p';
// }
// console.dir(add);
// console.dir(Person);
// const arr = [1];
// console.dir(arr);

// class Person{
//     constructor (firstName, birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }

//     calcAge(){
//         console.log(2037 - this.birthYear);
//     }

//     set firstName(n){
//         this._firstName = n + ' set'
//     }

//     static hey(){
//         console.log('Hey there!');
//     }
// };
// const jessica = new Perso  n('Jessica', 1984);
// console.log(jessica);
// jessica.calcAge();
// Person.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// };
// jessica.greet();

// const account = {
//     owner: 'jonas',
//     movements: [200, 530, 120, 300],
//     get latest(){
//         return this.movements[this.movements.length-1];
//     },

//     set latest(x){
//         this.movements.push(x)
//     },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// const jessica = new Person('Jessica', 1984);

// console.log(jessica);
// jessica.firstName = 'jj';
// console.log(jessica);

// const nameArr = Array.from('pedro');
// console.dir(Person);
// console.dir(Number);

// Person.hey();

// const PersonProto = {
//     calcAge(){
//         console.log(2037 - this.birthYear);
//     },
//     init(firstName, birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// }
// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.firstName = 'Steven';
// steven.birthYear = 1984;
// steven.calcAge();

// const sarah = Object.create(PersonProto);
// sarah.init('sarah', 1988);
// console.log(sarah);
// sarah.calcAge();

// const personConst = function(firstName, birthYear){
//     const person = Object.create(PersonProto);
//     person.birthYear = birthYear;
//     person.firstName = firstName;
//     return person;
// }

// const andrea = personConst('andrea', 1873);
// console.log(andrea);
// andrea.calcAge();

// const Person = function(firstName, birthYear){
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// };
// Person.prototype.calcAge = function(){
//     console.log (2037 - this.birthYear);
// };

// const Student = function(firstName, birthYear, course){
//     Person.call(this, firstName, birthYear);
//     this.course = course;
// };

// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;

// Student.prototype.introduce = function(){
//     console.log(this.firstName, this.course);
// };

// const mike = new Student('mike', 1983, 'CS');
// console.dir(mike instanceof Person);
// mike.calcAge();
// console.dir(Student.prototype.constructor);

// class PersonCl{
//     constructor(fullName, birthYear){
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     };

//     calcAge(){
//         console.log(2037 - this.birthYear);
//     };

//     greet(){
//         console.log(`Hey ${this.fullName}!`);
//     };

//     get age(){
//         return 2037 - this.birthYear;
//     };

//     set fullName(name){
//         if(name.includes(' ')) this._fullName = name;
//         else alert(`${nema} is not full name`);
//     }

//     get fullName(){
//         return this._fullName;
//     };
// };

// const mike  = new PersonCL('Mike Smith', 1983);
// console.log(mike);
// mike.greet();
// console.log(mike.fullName);

// class StudentCl extends PersonCl{
//     constructor(fullName, birthYear, course){
//         super(fullName, birthYear);
//         this.course = course;
//     };
//     introduce(){
//         console.log(`Hey, ${this.fullName}, ${this.course}`);
//     };
// }
// const mike = new StudentCl('Mike Smith', 1982, 'CS');
// console.log(mike);
// mike.calcAge();

// const PersonProto = {
//     calcAge(){
//         console.log(2037 - this.birthYear);
//     },

//     init(firstName, birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };
// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function(firstName, birthYear, course){
//     PersonProto.init.call(this, firstName, birthYear);
//     this.course = course;
// };
// const jay = Object.create(StudentProto);
// jay.init('Jay', 1982, 'CS');
// console.log(jay);

// class account {
//     #secret = 'shh...';
//     constructor(owner, currency, pin){
//         this.owner = owner;
//         this.currency = currency;
//         this.pin = pin;
//         this._movements = [];
//         this.locale = navigator.language;

//         console.log(`Thanks for openning the account ${this.owner}`);
//     };

//     deposit(value){
//         this._movements.push(value);
//         return this;
//     };

//     withdraw(value){
//         this.deposit(-value);
//         return this;
//     };

//     #approveLoan(){
//         return true;
//     }

//     requestLoan(value){
//         if(this.#approveLoan()){
//             this.deposit(value);
//             console.log('Loan approved');
//         }
//     }

//     get balance(){
//         return this._movements.reduce((ac, v)=>ac+v, 0);
//     };

//     getSecret(){
//         console.log(this.#approveLoan(1));
//         return this.#secret;
//     }
// };

// const acc1 = new account('Jonas', 'EUR', 1111);
// acc1.deposit(100);
// acc1.withdraw(200);
// acc1.deposit(350);
// console.log(acc1._movements);
// console.log(acc1.getSecret());
// acc1.requestLoan(100);
// // console.log(acc1.#secret);
// // console.log(acc1.#approveLoan(1))
// console.log(acc1.deposit(10).withdraw(5)._movements);

