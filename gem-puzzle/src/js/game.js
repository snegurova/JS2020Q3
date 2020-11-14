import Cell from './cell'

export default class Game {
  constructor(cellSize, cellCount, ctx) {
    this.cells = [];
    this.cellSize = cellSize;
    this.cellCount = cellCount;
    this.ctx = ctx;
    this.clicks = 0;
    this.createCells(this.cellSize, this.cellCount);
  }

  createCells(cellSize, cellCount) {
    for (let i = 0; i < cellCount; i++) {
      let row = [];
      for (let j = 0; j < cellCount; j++) {
        const value = i * cellCount + j;
        row.push(new Cell(value, i, j, cellSize));
      }
      this.cells.push(row);
    }

  }
}

