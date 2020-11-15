
import '../styles/main.scss'

import Game from './game'
let cellCount = 3;
let countCellSize = () => {
  return window.innerWidth > 640 ?
    Math.floor(window.innerWidth * 0.5) / cellCount : Math.floor(320 / cellCount);
}
let cellSize = countCellSize();
let canvasSize = cellSize * cellCount;

let canvasTop = (window.innerHeight - canvasSize) / 2;
let canvasLeft = (window.innerWidth - canvasSize) / 2;

const canvasWrapper = document.createElement('div');
document.body.appendChild(canvasWrapper);
canvasWrapper.classList.add('canvas-wrapper')

let canvas = document.createElement('canvas');
canvas.width = canvasSize;
canvas.height = canvasSize;

let ctx = canvas.getContext("2d");
canvasWrapper.appendChild(canvas);
ctx.fillRect(0, 0, canvas.width, canvas.height);

const game = new Game(cellSize, cellCount, ctx);
game.mix(80);
game.draw();
console.log(game.cells);
console.log(game.getEmptyCell());
console.log(game.moves);

canvas.addEventListener('click', gameMove);

// canvas.addEventListener('touchend', (e) => {
//   let x = Math.trunc((e.touches[0].pageX - canvas.offsetLeft) / game.cellSize);
//   let y = Math.trunc((e.touches[0].pageY - canvas.offsetTop) / game.cellSize);
//   // console.log(e.touchecs);
//   gameMove(game.getCell(x, y));
// });

canvas.addEventListener('mousedown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  canvas.addEventListener('click', gameMove);
  let x = Math.trunc((e.pageX - canvas.offsetLeft) / game.cellSize);
  let y = Math.trunc((e.pageY - canvas.offsetTop) / game.cellSize);
  let movingX = Math.trunc(e.pageX - canvas.offsetLeft);
  let movingY = Math.trunc(e.pageY - canvas.offsetTop);

  let cell = game.getCell(x, y);
  if (cell.draggable) {
    game.dragging = true;
    cell.moving = true;
    cell.startX = movingX;
    cell.startY = movingY;
    cell.xPosition = cell.x * game.cellSize;
    cell.yPosition = cell.y * game.cellSize;
  }
});

canvas.addEventListener('mouseup', (e) => {
  e.preventDefault();
  e.stopPropagation();
  let cell = game.cells.find(cell => cell.moving);
  game.dragging = false;
  game.cells.forEach(cell => {
    cell.moving = false;
    cell.xPosition = null;
    cell.yPosition = null;
  });
  let x = Math.trunc((e.pageX - canvas.offsetLeft) / game.cellSize);
  let y = Math.trunc((e.pageY - canvas.offsetTop) / game.cellSize);
  console.log(x, y);
  let emptyCell = game.getEmptyCell();
  if (emptyCell.x === x && emptyCell.y === y) {
    console.log(cell);
    game.move(cell);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
    if (game.isWon()) {
      console.log(`Solved in ${game.getClicks()} moves`);
    }
  } else {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (game.dragging) {
    e.preventDefault();
    e.stopPropagation();
    canvas.removeEventListener('click', gameMove);
    // get the current mouse position
    let movingX = Math.trunc(e.pageX - canvas.offsetLeft);
    let movingY = Math.trunc(e.pageY - canvas.offsetTop);

    // get moving cell
    let cell = game.cells.find(cell => cell.moving);

    // calculate the distance the mouse has moved
    // since the last mousemove
    var distanceX = movingX - cell.startX;
    var distanceY = movingY - cell.startY;
    cell.xPosition += distanceX;
    cell.yPosition += distanceY;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
    game.drawCell(cell.xPosition, cell.yPosition, true);
    game.drawNum(
      cell.value,
      cell.xPosition + game.cellSize / 2,
      cell.yPosition + game.cellSize / 2
    );

    cell.startX = movingX;
    cell.startY = movingY;
  }
});

function gameMove(e) {
  let x = Math.trunc((e.pageX - canvas.offsetLeft) / game.cellSize);
  let y = Math.trunc((e.pageY - canvas.offsetTop) / game.cellSize);
  game.move(game.getCell(x, y));
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.draw();
  if (game.isWon()) {
    console.log(`Solved in ${game.getClicks()} moves`);
  }
}

window.addEventListener("resize", () => {
  console.log('resize');
  game.cellSize = countCellSize();
  canvasSize = game.cellSize * cellCount;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  game.draw();
});