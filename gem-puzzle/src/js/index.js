import Game from './game'

const canvas = document.createElement('canvas');
canvas.width = 320;
canvas.height = 320;
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
ctx.fillRect(0, 0, canvas.width, canvas.height);

const game = new Game(80, 4, ctx);
game.draw();
console.log(game.cells);
console.log(game.getEmptyCell());
console.log('start');