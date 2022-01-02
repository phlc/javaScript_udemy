'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-12-26T17:01:17.194Z',
    '2021-12-30T17:01:17.194Z',
    '2022-01-01T13:36:17.929Z',
    '2022-01-02T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const calcDaysPast = (a,b) => Math.trunc(Math.abs(b-a) / (1000*60*60*24));

const formatMovementsDate = function(date, locale){
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }
    let displayDate = new Intl
      .DateTimeFormat(locale, options)
      .format(date);

    const daysPassed = calcDaysPast(new Date(), date);
    
    switch(daysPassed){
      case 0:
        displayDate = 'Today';
        break;
      case 1:
        displayDate = 'Yesterday';
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        displayDate = `${daysPassed} days ago`;
    }

    return displayDate;
};

const displayValue = function(value, locale, currency){
  const options = {
    style: 'currency',
    currency,
  }
  return new Intl.NumberFormat(locale, options).format(value);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${displayValue(mov, acc.locale, acc.currency)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${displayValue(acc.balance, acc.locale, acc.currency)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${displayValue(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${displayValue(Math.abs(out), acc.locale, acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${displayValue(interest, acc.locale, acc.currency)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer= function(){
  let time = 5;
  const tick = function(){
    const m = String(Math.trunc(time/60)).padStart(2, '0');
    const s = String(time%60).padStart(2, '0');
    labelTimer.textContent = `${m}:${s}`;

    if(!time){
      clearInterval(timer);
      containerApp.style.opacity = 0;
      currentAccount = undefined;
      labelWelcome.textContent = 'Log in to get stated';
    }

    time--;

  }
  timer = setInterval(tick, 1000);
  tick();
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Current Date
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2,'0');
    // const month = `${now.getMonth()+1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    const now = new Date();
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if(timer)  clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    clearInterval(timer);
    timer = startLogOutTimer();
    
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add date
    currentAccount.movementsDates.push(new Date().toISOString());

    clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    setTimeout(updateUI, 2500, currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(+'23');
// console.log(Number.parseInt('30pzedasdf'));
// console.log(Number.parseInt('e10'));
// console.log(Number.parseInt('16G', 16));
// console.log(Number.parseFloat(' 1.4kfd'));
// console.log(Number.isNaN('34'));
// console.log(Number.isNaN(34));
// console.log(Number.isNaN(+'34f'));
// console.log(Number.isNaN(23/0));
// console.log(23/0);
// console.log(Number.isNaN(undefined));
// console.log(Number.isFinite(undefined));
// console.log(Number.isFinite('34'));
// console.log(Number.isFinite(34));
// console.log(Number.isFinite(10/3));
// console.log(10/3);

// console.log(27** (1/3));
// console.log(Math.max(1, 4, '5', 2));
// console.log(Math.min('1', 4, '5', 2));
// console.log(Math.random());
// const randomInt = (min, max) => Math.round(Math.random() * (max-min)+min);
// console.log(randomInt(-3, -4));
// console.log(Math.floor(-2.3));
// console.log(Math.trunc(-2.3));
// console.log(2.748439.toFixed(2));
// console.log(+2.744439.toFixed(2));
// console.log(432_123_9211_221.00);
// console.log(Number('3_2'));
// console.log(parseInt('432_23'));
// const big = BigInt(452983470598274309857023984n);
// const big2 = BigInt(452983470598274309857023984)
// console.log(big, big2);
// console.log(20n == 20, 20n === 20);
// console.log(Number(16n));
// console.log(11/3);
// console.log(11n/3n);

// const now = new Date();
// console.log(now);
// const str = new Date('December, 24, 1998');
// console.log(str);
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2035, 10, 1, 14, 43, 1));
// console.log(new Date(0).toUTCString());
// console.log(new Date(3 * 24*60 *60 *1000));
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future.getFullYear());
// console.log(future.getTime());
// console.log(Date.now());
// console.log(new Date(1596388896930));

// const num = 4234.23545534;
// const options = {
//   style: 'currency',
//   currency: 'EUR',
// }
// console.log(new Intl.NumberFormat('pt-PT', options).format(num),
//             new Intl.NumberFormat('en-US', options).format(num),
//             new Intl.NumberFormat('de-De', options).format(num),
// );

// console.log(setInterval(()=> console.log('Time is up'), 2000));
// console.log(setInterval(()=> console.log('Time1'), 5000));
// console.log(setInterval(()=> console.log('Time2'), 4000));
// setTimeout(()=> clearInterval(1), 7000);

// const sec = {s: BigInt(5*60)};
// setInterval(function(sec){
//   const m = this.s/60n;
//   const s = this.s%60n;
//   this.s=this.s-1n;
//   console.log(`${m}:${s}`);
// }.bind(sec), 1000, sec);