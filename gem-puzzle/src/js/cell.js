export default class Cell {
  constructor(value, x, y, size) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.draggable = false;
    this.moving = false;
    this.startX = null;
    this.startY = null;
    this.xPosition = null;
    this.yPosition = null;
    this.xPositionAnimated = null;
    this.yPositionAnimated = null;
  }
}