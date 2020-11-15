import Cell from './cell'

export default class Game {
  constructor(cellSize, cellCount, ctx) {
    this.cells = [];
    this.cellSize = cellSize;
    this.cellCount = cellCount;
    this.totalCellCount = cellCount * cellCount;
    this.ctx = ctx;
    this.clicks = 0;
    this.createCells(this.cellSize, this.cellCount);
    this.clicksCount = 0;
    this.moves = [];
    this.dragging = false;
  }

  createCells(cellSize, cellCount) {
    for (let i = 0; i < this.totalCellCount; i++) {
      const x = i % cellCount;
      const y = Math.trunc(i / cellCount);
      this.cells.push(new Cell(
        i === this.totalCellCount - 1 ? 0 : i + 1,
        x, y, cellSize));
    }

  }

  getClicks() {
    return this.clicks;
  }

  drawCell(x, y, opacity = false) {
    if (opacity) {
      this.ctx.fillStyle = 'rgba(255, 185, 59, 0.8)'
    } else {
      this.ctx.fillStyle = '#FFB93B';
    }

    this.ctx.fillRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2);
  }

  drawNum(value, x, y) {
    this.ctx.font = `bold ${this.cellSize / 2}px Sans`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = '#222';
    this.ctx.fillText(value, x, y);
  }

  getEmptyCell() {
    return this.cells.find(cell => cell.value === 0);
  }

  draw() {
    this.cells.forEach(cell => {
      if (cell.value > 0 && !cell.moving) {
        this.drawCell(cell.x * this.cellSize, cell.y * this.cellSize);
        this.drawNum(
          cell.value,
          cell.x * this.cellSize + this.cellSize / 2,
          cell.y * this.cellSize + this.cellSize / 2
        );
      }
    });
  }

  move(cell) {
    let emptyCell = this.getEmptyCell();
    let emptyMove = '';
    let moveCell = () => {
      emptyCell.value = cell.value;
      cell.value = 0;
      this.clicks++;
      this.moves.push(emptyMove);
    }
    if (cell.x - 1 === emptyCell.x && cell.y === emptyCell.y) {
      emptyMove = 'left';
      moveCell();
    }
    if (cell.x + 1 === emptyCell.x && cell.y === emptyCell.y) {
      emptyMove = 'right';
      moveCell();
    }
    if (cell.y - 1 === emptyCell.y && cell.x === emptyCell.x) {
      emptyMove = 'up';
      moveCell();
    }
    if (cell.y + 1 === emptyCell.y && cell.x === emptyCell.x) {
      emptyMove = 'down';
      moveCell();
    }
  }

  isWon() {
    return this.cells.every((cell, ind, arr) => {
      return (cell.value === this.totalCellCount - 1 && ind === this.totalCellCount - 2)
      || (cell.value === 0 && ind === this.totalCellCount - 1)
      || (cell.value + 1 === arr[ind + 1].value)
    });
  }

  getCell(x, y) {
    return this.cells.find(cell => cell.x === x && cell.y === y);
  }

  mix(mixCount) {
    let getRandomBool = () => Math.floor(Math.random() * 2) === 0;
    let x = null,
      y = null;

    for (let i = 0; i < mixCount; i++) {
      let emptyCell = this.getEmptyCell();
      const downNotLeft = getRandomBool();
      const upRight = getRandomBool();
      if (!downNotLeft && !upRight) {
        x = emptyCell.x - 1;
        y = emptyCell.y;
      }
      if (downNotLeft && !upRight) {
        x = emptyCell.x;
        y = emptyCell.y + 1;
      }
      if (!downNotLeft && upRight) {
        x = emptyCell.x + 1;
        y = emptyCell.y;
      }
      if (downNotLeft && upRight) {
        x = emptyCell.x;
        y = emptyCell.y - 1;
      }

      if (0 <= x && x <= this.cellCount - 1 && 0 <= y && y <= this.cellCount - 1) {
        this.move(this.getCell(x, y));
      }
    }

    this.clicks = 0;
  }

}

