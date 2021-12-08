'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number! 🎉';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 12;
// document.querySelector('.guess').value = 2;
// console.log(document.querySelector('.guess').value );

let secret = Math.trunc(Math.random()*20)+1;
let score = Number(document.querySelector('.score').textContent);
let highscore = Number(document.querySelector('.highscore').textContent);

const changeMessage = function(message){
    document.querySelector('.message').textContent = message;
}
const changeNumber = function(number){
    document.querySelector('.number').textContent = number;
}

document.querySelector('.again').addEventListener('click', function(){
    secret = Math.trunc(Math.random()*20)+1;
    score = 20;
    changeMessage("Start guessing...");
    document.querySelector('.score').textContent = score;
    changeNumber('?');
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';
})

document.querySelector('.check').addEventListener('click', function(){
    if(score <= 0){
        document.querySelector('.message').textContent = "You Lost";
        return;
    }
    const guess = Number(document.querySelector('.guess').value);
    if(!guess){
        changeMessage("No Number!");
    }
    else if(guess !== secret){
        changeMessage(guess>secret ? "Too high!": "Too low!");
        score--;
        document.querySelector('.score').textContent = score;
    }
    else{
        changeNumber(secret);
        changeMessage("Correct!");
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem'
        if(highscore < score){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }
})