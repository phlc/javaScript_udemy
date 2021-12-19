'use strick';
// const game = {
//     team1: 'Bayern Munich', 
//     team2: 'Borrussia Dortmund', 
//     players: [
//         [
//             'Neuer',
//             'Pavard',
//             'Martinez',
//             'Alaba',
//             'Davies',
//             'Kimmich',
//             'Goretzka',
//             'Coman',
//             'Muller',
//             'Gnarby',
//             'Lewandowski',
//         ], [
//             'Burki',
//             'Schulz',
//             'Hummels',
//             'Akanji',
//             'Hakimi',
//             'Weigl',
//             'Witsel',
//             'Hazard',
//             'Brandt',
//             'Sancho',
//             'Gotze',
//         ], 
//     ],
//     score: '4:0',
//     scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//     date: 'Nov 9th, 2037',
//     odds: {
//         team1: 1.33,
//         x: 3.25,
//         team2: 6.5,
//     }, 
// };

// const [players1, players2] = game.players;
// const [gk, ...fieldPlayers] = players1;
// const allPlayers = [...players1, ...players2];
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// const {team1, x: draw, team2} = game.odds;
// const printGoals = function(...goals){
//     console.log(`${goals.length} goals were scored`);
// }
// printGoals(...game.scored);
// console.log(`${(game.odds.team1<game.odds.team2 &&  game.team1) || game.team2} is more likely to win`);

// for(const [n, pl] of game.scored.entries()) console.log(`Goal ${n+1}: ${pl}.`);
// let avg = 0;
// for(const n of Object.values(game.odds)) avg+=n;
// console.log(avg/Object.keys(game.odds).length);
// for(const [key, value] of Object.entries(game.odds)){
//     console.log(`Odds of ${(key==='x' && 'draw') || 'victory '}${game[key] || ''}: ${value}`)
// }
// const scorers = {};
// for(const pl of game.scored){
//     (scorers?.[pl] && (scorers[pl]++)) || (scorers[pl] = 1);
// }
// console.log(scorers);

// const gameEvents = new Map([
//     [17, '⚽ GOAL'],
//     [36, '🔁 Substitution'],
//     [47, '⚽ GOAL'],
//     [61, '🔁 Substitution'],
//     [64, '🔶 Yellow card'],
//     [69, '🔴 Red card'],
//     [70, '🔁 Substitution'],
//     [72, '🔁 Substitution'],
//     [76, '⚽ GOAL'],
//     [80, '⚽ GOAL'],
//     [92, '🔶 Yellow card']
// ]);
// const events = [...(new Set(gameEvents.values()))];
// console.log(events);
// gameEvents.delete(64);
// console.log(gameEvents);
// console.log(`An event happened, on average, every ${90/gameEvents.size} minutes`);
// for(const [time, event] of gameEvents){
//     console.log(`${time<=45 ? '[FIRST ' : '[SECOND '}HALF]${time}: ${event}`);
// }
// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));
// const textArea = document.querySelector('textarea');
// const button = document.querySelector('button');
// button.textContent ='Press';
// const convert = function(){
//     const text = textArea.value.trim();
//     let answer = '';
//     const words = text.split('\n');
//     for(const [n, word] of words.entries()){
//         let variable = word.trim().toLowerCase().split('_');
//         variable = variable[0]+ variable[1][0].toUpperCase() + variable[1].substring(1);
//         answer+=variable.padEnd(20, ' ')+'✅'.repeat(n+1)+'\n';
//     }
//     textArea.value = answer;
// }
// button.addEventListener('click', convert);