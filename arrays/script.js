'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false){

  const movs = sort ? movements.slice().sort((a,b)=>a-b) : movements;

  containerMovements.innerHTML = '';

  movs.forEach(function(mov, i){
    const type = mov>0 ? 'deposit' : 'withdrawal';
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function(account){
  account.balance = account.movements.reduce((acc, mov)=>acc+=mov, 0);
  labelBalance.textContent = `${account.balance}€`;
}

const calcDisplaySummary = function(account){
  const incomes = account.movements
    .filter(mov=>mov>0)
    .reduce((acc, mov)=>acc+mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov=>mov<0)
    .reduce((acc, mov)=>acc+mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov=>mov>0)
    .map(mov=>mov*account.interestRate/100)
    .filter(int=>int>=1)
    .reduce((acc, int)=> acc+int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = function(accounts){
  accounts.forEach((acc) =>
    acc.username = acc.owner.split(' ')
    .map(v=>v[0])
    .join('')
    .toLowerCase());
};

const updateUI = function(account){
  displayMovements(account.movements);
    calcDisplayBalance(account);
    calcDisplaySummary(account);
}

createUsernames(accounts);
// containerMovements.innerHTML = '';

//Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts
    .find(acc => acc.username === inputLoginUsername.value);
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')[0]}`;
    containerApp.style.opacity = '1';

    updateUI(currentAccount);
  }
  else{
    containerMovements.innerHTML = '';
    containerApp.style.opacity = '0';
    labelWelcome.textContent = 'Log in to get started';
    alert('Sorry. Invalid User or Pin');
  }
  inputLoginUsername.value =  inputLoginPin.value = '';
  inputLoginUsername.blur(); inputLoginPin.blur();
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts
    .find(acc => acc.username === inputTransferTo.value);
  
  if(amount>0 && currentAccount.balance>amount && 
     receiverAcc && receiverAcc!==currentAccount){

    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);

    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';

});

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username &&
  Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});


btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if(loan>0 && currentAccount.movements.some(
    val => val >= loan/10)
  ){
    currentAccount.movements.push(loan);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

});

let sort = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  sort = !sort;
  displayMovements(currentAccount.movements, sort)
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////////////

// console.log(accounts.map(acc => acc.movements).flat().reduce((a, v)=> a+v));
// console.log(accounts.flatMap(acc=> acc.movements).reduce((a,c)=> a+c));
// console.log(accounts.flatMap(acc => acc.movements).filter(a=>a>1000).length);
// console.log(accounts.flatMap(a=>a.movements).reduce((a, c) => c>1000?++a:a ,0));
// console.log(accounts.flatMap(a=>a.movements).reduce((sums, v) => {v>0 ? sums.deposits+=v : sums.withdrawal+=v; return sums}, {deposits: 0, withdrawal: 0}));

// const titleCase = function(title){
//   const notCapital = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
//   const titleConverted = title
//     .toLowerCase()
//     .split(' ')
//     .map(w => notCapital.includes(w) ? w : w[0].toUpperCase()+w.slice(1));

//     // titleConverted.forEach((s, i, arr)=>{
//     //   if(!notCapital.includes(s)){
//     //     arr[i] = [...s];
//     //     arr[i][0] = arr[i][0].toUpperCase();
//     //     arr[i] =  arr[i].join('');
//     //   }
//     // });

//   return titleConverted.join(' ');
// }
// console.log(titleCase('this is a LONG title but not too long'));

// const data = new Array(7);
// console.log(data.fill(1, 3, 5));

// const movUI = document.querySelectorAll('.movements__value');
// console.log(movUI);
// console.log(Array
//   .from(movUI, 
//     c => Number(c.innerText
//       .replace('€', '')
//     )
//   )
// );

// console.log(...document.querySelectorAll('.movements__value'));

// console.log(accounts
//   .map(acc =>acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc+mov, 0)
// );

// console.log(accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov)=> acc+mov, 0)
// );

// console.log(movements.some(val => val > -100));
// console.log(movements.every(val => val > -100));

// const arr = ['a', 'b', 'c', 'd', 'd'];
// console.log(arr.slice(1, -1));
// console.log(arr.splice(-2, 2), arr);
// console.log(arr.reverse(), arr);
// console.log(arr.concat(['y', 'w', 'z']), arr);
// console.log(arr.join(' and '), arr);

// console.log(arr.at(-1));
// console.log('asdf'.at(-2));
// movements.forEach((n, i, a)=>console.log(n, i, a));

// currencies.forEach((n, k, m)=>console.log(n, k, m));
// const aSet = new Set(arr);
// aSet.forEach((n, m, s) => console.log(n, m, s));

// const obj = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// console.log(movements.map(function(e,i){return[this.at(i), e]}, obj));
// console.log(movements.filter((v)=>v>100));
// 'console.log(movements.reduce((p, v)=>p+=v, 0));
// console.log(movements);

// const total = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov*1.1)
//   .reduce((acc, mov)=> acc+mov)
//   .toFixed(2);
// console.log(total);

// console.log(movements.find(mov => mov < 0));

// console.log(accounts.find(acc => acc.owner === 'Jessica Davis'))
// let jd;
// for (const acc of accounts){
//   if(acc.owner === 'Jessica Davis'){
//     jd = acc;
//     break;
//   }
// }
// console.log(jd);

