
import '../styles/main.scss';
import audioFile from '../images/icons/audio.mp3';

// import favicon from '../images/icons/favicon.ico';

import Game from './game';

const infoWrapper = document.createElement('div');
infoWrapper.classList.add('info-wrapper');
infoWrapper.innerHTML = `
  <div  class="timer-wrapper">
    <div>Time spent</div>
    <div id ="timer" class="timer">0:00:00</div>
  </div>
  <div  class="cells-count-wrapper">
    <select name="cells-count" id="cells-count">
      <option value="3">3 x 3</option>
      <option value="4" selected>4 x 4</option>
      <option value="5">5 x 5</option>
      <option value="6">6 x 6</option>
      <option value="7">7 x 7</option>
      <option value="8">8 x 8</option>
    </select>
  </div>
  <div  class="moves-wrapper">
    <div>Moves done</div>
    <div id ="moves" class="moves">0</div>
  </div>
  `
document.body.appendChild(infoWrapper);



const controlsWrapper = document.createElement('div');
controlsWrapper.classList.add('controls-wrapper');
controlsWrapper.innerHTML = `
  <div id ="reset-button" class="btn reset-button" title="Reset/Delete game"></div>
  <div id ="mute-button" class="btn mute-button" title="Mute"></div>
  <div id ="solve-button" class="btn solve-button" title="Solve game"></div>
  <div id ="resume-button" class="btn resume-button" title="Restore game"></div>
  <div id ="pause-button" class="btn pause-button" title="Save game"></div>
  `
document.body.appendChild(controlsWrapper);


const resetButton = document.querySelector('#reset-button');
const pauseButton = document.querySelector('#pause-button');
const resumeButton = document.querySelector('#resume-button');
const solveButton = document.querySelector('#solve-button');
const muteButton = document.querySelector('#mute-button');
const moves = document.querySelector('#moves');
const cellsSelected = document.querySelector('#cells-count');


let cellCount = cellsSelected.options[cellsSelected.selectedIndex].value;
let countCellSize = () => {
  return window.innerWidth > 640 ?
    Math.floor(500 / cellCount) : Math.floor(320 / cellCount);
}
let cellSize = countCellSize();
let canvasSize = cellSize * cellCount;

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
game.mix(Math.floor(Math.random() * cellCount * 30 + Math.pow(cellCount, 3)));
game.draw();

const result = document.createElement('div');
result.classList.add('result-wrapper');
document.body.appendChild(result);

const audio = new Audio(audioFile);
// audio.src = audioFile;

muteButton.addEventListener('click', () => {
  muteButton.classList.toggle('active');
  game.mute = !game.mute;
});

cellsSelected.addEventListener('change', () => {
  cellCount = cellsSelected.options[cellsSelected.selectedIndex].value;
  game.cellCount = cellCount;
  game.totalCellCount = cellCount * cellCount;
  game.cellSize = countCellSize();
  localStorage.removeItem('movesArray');
  localStorage.removeItem('movesCount');
  localStorage.removeItem('time');
  localStorage.removeItem('cells');
  timer.innerHTML = '0:00:00';
  game.moves.splice(0);
  game.clicks = 0;
  game.cells.splice(0);
  game.createCells(game.cellSize, game.cellCount);
  canvasSize = game.cellSize * cellCount;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  game.mix(Math.floor(Math.random() * cellCount * 30 + Math.pow(cellCount, 3)));
  game.draw();
});

canvas.addEventListener('click', gameMove);

// canvas.addEventListener('touchend', (e) => {
//   let x = Math.trunc((e.touches[0].pageX - canvas.offsetLeft) / game.cellSize);
//   let y = Math.trunc((e.touches[0].pageY - canvas.offsetTop) / game.cellSize);
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
  let emptyCell = game.getEmptyCell();
  if (emptyCell.x === x && emptyCell.y === y) {
    game.move(cell);
    moves.innerText = game.getClicks();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
    if (game.isWon()) {
      result.innerHTML = `Solved in ${game.getClicks()} moves!`;
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

// solveButton.addEventListener('click', () => {
//   let empty = game.getEmptyCell();
//   for (let i = game.moves.length - 1; i >= 0; i--) {

//     let cell = null;
//     if (game.moves[i] === 'left') {
//       cell = game.getCell(empty.x - 1, empty.y)
//     }
//     if (game.moves[i] === 'right') {
//       cell = game.getCell(empty.x + 1, empty.y)
//     }
//     if (game.moves[i] === 'up') {
//       cell = game.getCell(empty.x, empty.y - 1)
//     }
//     if (game.moves[i] === 'down') {
//       cell = game.getCell(empty.x, empty.y + 1)
//     }
//     empty = cell;
//     // let solve = gameMove.bind(null, cell);
//     setTimeout(gameMove, 1000, null, cell);
//   }
// });

function gameMove(e, cellSolve) {

  let x = e ? Math.trunc((e.pageX - canvas.offsetLeft) / game.cellSize) : cellSolve.x;
  let y = e ? Math.trunc((e.pageY - canvas.offsetTop) / game.cellSize) : cellSolve.y;

  let cell = e ? game.getCell(x, y) : cellSolve;
  if (!cell.draggable) {
    return;
  }
  if (!game.mute) {
    audio.play();
  }

  cell.moving = true;
  let emptyCell = game.getEmptyCell();
  if (!cell.xPositionAnimated) {
    cell.xPositionAnimated = cell.x * game.cellSize + 1;
  }
  if (!cell.yPositionAnimated) {
    cell.yPositionAnimated = cell.y * game.cellSize + 1;
  }
  let animateCellForInterval = animateCell.bind(null, cell, emptyCell);
  let animateId = setInterval(animateCellForInterval, 1);
  function animateCell(cell, emptyCell) {
    // canvas.removeEventListener('click', gameMove);
    let targetX = emptyCell.x * game.cellSize;
    let targetY = emptyCell.y * game.cellSize;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
    game.drawCell(cell.xPositionAnimated, cell.yPositionAnimated, true);
    game.drawNum(
      cell.value,
      cell.xPositionAnimated + game.cellSize / 2,
      cell.yPositionAnimated + game.cellSize / 2
    );

    if (!(Math.trunc(cell.xPositionAnimated / 2) === Math.trunc(targetX / 2))) {
      // Start Repeated code - incr/decr func
      if (Math.trunc(cell.xPositionAnimated / 2) > Math.trunc(targetX / 2)) {
        cell.xPositionAnimated -= 2;
      } else {
        cell.xPositionAnimated += 2;
      }
    }

    if (!(Math.trunc(cell.yPositionAnimated / 2) === Math.trunc(targetY / 2))) {
      if (Math.trunc(cell.yPositionAnimated / 2) > Math.trunc(targetY / 2)) {
        cell.yPositionAnimated -= 2;
      } else {
        cell.yPositionAnimated += 2;
      }
      // End Repeated code - incr/decr func
    }

    if ((Math.trunc(cell.xPositionAnimated / 2) === Math.trunc(targetX / 2))
    && (Math.trunc(cell.yPositionAnimated / 2) === Math.trunc(targetY / 2))) {
      clearInterval(animateId);
      // canvas.addEventListener('click', gameMove);
      cell.xPositionAnimated = null;
      cell.yPositionAnimated = null;
      // game.cellIsMoving = false;
      cell.moving = false;
      game.move(cell);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      game.draw();
      if (game.isWon()) {
        result.innerHTML = `Solved in ${game.getClicks()} moves!`;
      }
      moves.innerText = game.getClicks();
    }
  }
}

resetButton.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('movesArray');
  localStorage.removeItem('movesCount');
  localStorage.removeItem('time');
  localStorage.removeItem('cells');
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.mix(Math.floor(Math.random() * cellCount * 30 + Math.pow(cellCount, 3)));
  game.draw();
  timer.innerHTML = '0:00:00';
  game.moves.splice(0);
  game.clicks = 0;
  moves.innerText = game.getClicks();
  result.innerHTML = '';
});

window.addEventListener("resize", () => {
  game.cellSize = countCellSize();
  canvasSize = game.cellSize * cellCount;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  game.draw();
});

// Timer

let timerId = null;
const timer = document.querySelector('#timer');

// if (timerId) {
//   clearInterval(timerId);
// }

function startTimer() {
  let timeArr = timer.innerHTML.split(':');
  let h = timeArr[0],
    m = timeArr[1],
    s = timeArr[2];
  if (parseInt(s) === 59) {
    s = '00';
    if (parseInt(m) === 59) {
      m = '00';
      h++;
    } else {
      m++;
      m = m < 10 ? `0${m}` : m;
    }
  } else {
    s++;
    s = s < 10 ? `0${s}` : s;
  }
  timer.innerHTML = `${h}:${m}:${s}`
}

timerId = setInterval(startTimer, 1000);

pauseButton.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  localStorage.setItem('movesArray', game.moves);
  localStorage.setItem('movesCount', game.clicks);
  localStorage.setItem('time', timer.innerHTML);
  localStorage.setItem('cells', JSON.stringify(game.cells));
});

resumeButton.addEventListener('click', () => {
  if (!timerId) {
    timerId = setInterval(startTimer, 1000);
  }
  game.moves = localStorage.getItem('movesArray').split(',');
  timer.innerHTML = localStorage.getItem('time');
  moves.innerHTML = localStorage.getItem('movesCount');
  game.cells = JSON.parse(localStorage.getItem('cells'));
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.draw();
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('time')) {
    game.moves = localStorage.getItem('movesArray').split(',');
    timer.innerHTML = localStorage.getItem('time');
    game.clicks = localStorage.getItem('movesCount');
    moves.innerHTML = localStorage.getItem('movesCount');
    game.cells = JSON.parse(localStorage.getItem('cells'));
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
  }
});