'use strict';
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const scoreElms = [document.querySelector('#score--0'),
                   document.getElementById('score--1')];
const currElms = [document.getElementById('current--0'),
                  document.getElementById('current--1')];
const playerElms = [document.querySelector('.player--0'),
                    document.querySelector('.player--1')];
let turn = 0;
let playing = false;
let currScore = 0;
const scores = [0, 0];

const newGame = function(){
    playerElms[turn].classList.remove('player--winner');
    playing = true;
    currScore = 0;
    scores.fill(0);
    turn = 0;
    scoreElms[0].textContent = 0;
    scoreElms[1].textContent = 0;
    currElms[0].textContent = 0;
    currElms[1].textContent = 0
    dice.classList.add('hidden');
    playerElms[1].classList.remove('player--active');
    playerElms[0].classList.add('player--active');
}

const switchTurn = function(){
    currScore = 0;
    currElms[turn].textContent = 0;
    playerElms[turn].classList.remove('player--active');
    turn = turn===0 ? 1 : 0;
    playerElms[turn].classList.add('player--active');
}

const rollDice = function(){
    if(!playing) return;
    const number = Math.trunc(Math.random()*6+1);
    dice.setAttribute('src', `dice-${number}.png`);
    if(dice.classList.contains('hidden')){
        dice.classList.remove('hidden');
    }
    if(number!==1){
        currScore+=number;
        currElms[turn].textContent = currScore;
    }else{
        switchTurn();
    }
}
const winner = function(){
    playing = false;
    dice.classList.add('hidden');
    playerElms[turn].classList.add('player--winner');
    playerElms[turn].classList.remove('player--active');
}

const hold = function(){
    if(!playing) return;
    scores[turn] += currScore;
    scoreElms[turn].textContent = scores[turn];
    if(scores[turn]>=10){
        winner();
    }
    else{
        switchTurn();
    }
}
newGame();
btnNewGame.addEventListener('click', newGame);
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);

