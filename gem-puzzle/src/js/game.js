import Cell from './cell'

export default class Game {
  constructor(cellSize, cellCount, ctx) {
    this.cells = [];
    this.cellSize = cellSize;
    this.cellCount = cellCount;
    this.ctx = ctx;
    this.clicks = 0;
    this.createCells(this.cellSize, this.cellCount);
    this.clicksCount = 0;
  }

  createCells(cellSize, cellCount) {
    for (let i = 0; i < cellCount * cellCount; i++) {
      const x = i % cellCount;
      const y = Math.trunc(i / cellCount);
      this.cells.push(new Cell(
        i === cellCount * cellCount - 1 ? 0 : i + 1,
        x, y, cellSize));
    }

  }

  getClicks() {
    return this.clicks;
  }

  drawCell(x, y) {
    this.ctx.fillStyle = '#FFB93B';
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
      if (cell.value > 0) {
        this.drawCell(cell.x * this.cellSize, cell.y * this.cellSize);
        this.drawNum(
          cell.value,
          cell.x * this.cellSize + this.cellSize / 2,
          cell.y * this.cellSize + this.cellSize / 2
        );
      }
    });
  }
}

