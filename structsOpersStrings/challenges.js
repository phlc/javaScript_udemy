'use strick';
const game = {
    team1: 'Bayern Munich', 
    team2: 'Borrussia Dortmund', 
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ], [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ], 
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    }, 
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const {team1, x: draw, team2} = game.odds;
const printGoals = function(...goals){
    console.log(`${goals.length} goals were scored`);
}
// printGoals(...game.scored);
// console.log(`${(game.odds.team1<game.odds.team2 &&  game.team1) || game.team2} is more likely to win`);

// for(const [n, pl] of game.scored.entries()) console.log(`Goal ${n+1}: ${pl}.`);
// let avg = 0;
// for(const n of Object.values(game.odds)) avg+=n;
// console.log(avg/Object.keys(game.odds).length);
// for(const [key, value] of Object.entries(game.odds)){
//     console.log(`Odds of ${(key==='x' && 'draw') || 'victory '}${game[key] || ''}: ${value}`)
// }
const scorers = {};
for(const pl of game.scored){
    (scorers?.[pl] && (scorers[pl]++)) || (scorers[pl] = 1);
}
console.log(scorers);
