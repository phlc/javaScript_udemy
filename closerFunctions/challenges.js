'use strict';
const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),
};
poll.registerNewAnswer = function (fn, type){
    let op = prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`);
    op = Number(op);
    op>=0 && op<4 && op%1===0? this.answers[op]++ : console.log('Invalid Number');
    fn(type)
}   
const displayResults = function (type) {
    console.log(type === 'string' ? `Poll results are ${(this).join(', ')}` : this);
}
poll.displayResults = displayResults.bind(poll.answers);
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll, poll.displayResults, 'string'));
const obj = {
    data1:[5,2,3],
    data2:[1,5,3,9,6,1],
};
const display1 = displayResults.bind(obj.data1);
const display2 = displayResults.bind(obj.data2);
display1('string');
display2();
