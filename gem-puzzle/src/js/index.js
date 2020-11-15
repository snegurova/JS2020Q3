import Game from './game'

const canvas = document.createElement('canvas');
canvas.width = 320;
canvas.height = 320;
let cellCount = 3;
let cellSize = canvas.width / cellCount;
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
ctx.fillRect(0, 0, canvas.width, canvas.height);

const game = new Game(cellSize, cellCount, ctx);
game.mix(80);
game.draw();
console.log(game.cells);
console.log(game.getEmptyCell());
console.log(game.moves);

canvas.addEventListener('click', (e) => {
  let x = Math.trunc((e.pageX - canvas.offsetLeft) / cellSize);
  let y = Math.trunc((e.pageY - canvas.offsetTop) / cellSize);
  console.log(game.isWon());
  gameMove(game.getCell(x, y));
});

function gameMove(cell) {
  game.move(cell);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.draw();
  if (game.isWon()) {
    console.log(`Solved in ${game.getClicks()} moves`);
  }
}